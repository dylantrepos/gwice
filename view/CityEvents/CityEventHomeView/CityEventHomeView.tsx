import { isBefore } from 'date-fns';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Keyboard, View, VirtualizedList } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { WarningScreenItem } from '../../../components/base/WarningScreenItem/WarningScreenItem';
import {
  CityEventCardEmptyItem,
  CityEventCardLargeItem
} from '../../../components/cityEvents/CityEventCardItem/CityEventCardItem';
import { CityEventListFooterItem } from '../../../components/cityEvents/CityEventListFooterItem/CityEventListFooterItem';
import { CityEventListPromoteItem } from '../../../components/cityEvents/CityEventListPromoteItem/CityEventListPromoteItem';
import { CityEventListStickyHeaderItem } from '../../../components/cityEvents/CityEventListStickyHeaderItem/CityEventListStickyHeaderItem';
import { useGetCityEvents } from '../../../hooks/useGetCityEvents';
import { Layout } from '../../../layouts/Layout';
import { setRefetchCityEventHome } from '../../../reducers/generalReducer';
import { type RootState } from '../../../store/store';
import { type CityEventCard } from '../../../types/Events';
import { filterDate } from '../../../utils/date';
import styles from './CityEventHomeView.style';

interface HeaderListProps {
  setHeaderHeight: React.Dispatch<React.SetStateAction<number>>;
}

const HeaderList = ({ setHeaderHeight }: HeaderListProps): ReactNode => (
  <View
    onLayout={(event) => {
      const { height } = event.nativeEvent.layout;
      setHeaderHeight(height);
    }}
    style={styles.heroContainer}
  >
    <CityEventListPromoteItem />
  </View>
);

interface Props {
  navigation: any;
  route: any;
}

interface CityEventCardLargeItemProps {
  item: any;
  index: number;
}

export const CityEventHomeView = ({ navigation, route }: Props): ReactNode => {
  const [refreshing, setRefreshing] = useState(false);
  const [eventList, setEventList] = useState<CityEventCard[] | number[]>([]);
  const [filteredCategoryIdList, setFilteredCategoryIdList] = useState<number[]>([]);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [selectedItemDate, setSelectedItemDate] = useState(filterDate[0]);
  const { top } = useSafeAreaInsets();
  const { isSearchInputFocused, currentPeriod, customPeriod, startDate, endDate, searchValue } =
    useSelector((state: RootState) => state.eventReducer);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const flatListRef = useRef<VirtualizedList<CityEventCard> | null>(null);
  const fakeWaitingData = Array(5)
    .fill(0)
    .map((_, index) => index);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(setRefetchCityEventHome(true));
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const CityHomeEventRender = useCallback(
    ({ item, index }: CityEventCardLargeItemProps) => {
      // check if the item is the sticky header
      if (index === 0) return item;

      if (index > 0 && item.nextTiming) {
        const nextTimingStart = new Date((item as CityEventCard).nextTiming.begin);
        const nextTimingEnd = new Date((item as CityEventCard).nextTiming.end);
        const now = new Date();

        if (isBefore(nextTimingStart, now) && isBefore(nextTimingEnd, now)) {
          return null;
        }
      }

      return eventList?.length > 0 ? (
        <CityEventCardLargeItem
          event={item}
          selectedItemDate={selectedItemDate}
          period={currentPeriod}
        />
      ) : (
        <CityEventCardEmptyItem large />
      );
    },
    [eventList]
  );

  const {
    isLoading,
    events,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    isRefetching
  } = useGetCityEvents({
    refetchCityEventHome: refreshing,
    categoryIdList: filteredCategoryIdList,
    startDate,
    endDate,
    key: 'cityEventHome'
  });

  const fetchMoreData = (): void => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      if (flatListRef.current && scrollPosition < headerHeight) {
        flatListRef.current.scrollToOffset({ animated: false, offset: headerHeight });
      }
    });

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    setEventList([]);
    const offset = headerHeight;
    flatListRef.current?.scrollToOffset({
      animated: flatListRef.current && scrollPosition < headerHeight,
      offset
    });
  }, [filteredCategoryIdList, currentPeriod, customPeriod]);

  useEffect(() => {
    if (!isLoading && events) {
      const eventsListFinal = events.pages.map((page) => page?.events).flat();
      if (eventsListFinal && eventsListFinal.length > 0) {
        setEventList(eventsListFinal as CityEventCard[]);
      }
    }
  }, [events]);

  useEffect(() => {
    const offset = headerHeight;
    if (isSearchInputFocused) {
      flatListRef.current?.scrollToOffset({
        animated: scrollPosition < headerHeight,
        offset
      });
    }
  }, [isSearchInputFocused]);

  const scrollPosition2 = useRef(new Animated.Value(0)).current;

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollPosition2 } } }],
    { useNativeDriver: false } // Set this to true if you're not using the scroll position in JS
  );

  // const handleSubmitSearchValue = (newSearchValue: string): void => {
  //   dispatch(setSearchValue(newSearchValue));
  // };

  // const handleUpdateIsSearchInputFocused = (isFocused: boolean): void => {
  //   dispatch(setIsSearchInputFocused(isFocused));
  // };

  return (
    <Layout>
      <VirtualizedList
        removeClippedSubviews={false}
        contentContainerStyle={{ minHeight: '100%' }}
        maxToRenderPerBatch={10}
        windowSize={21}
        ref={flatListRef}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={<HeaderList setHeaderHeight={setHeaderHeight} />}
        onScroll={(event) => {
          onScroll(event);
          setScrollPosition(event.nativeEvent.contentOffset.y);
        }}
        scrollEventThrottle={16}
        data={[
          <CityEventListStickyHeaderItem
            filteredCategoryIdList={filteredCategoryIdList}
            handleSetFilteredCategoryIdList={setFilteredCategoryIdList}
            selectedItemDate={selectedItemDate}
            setSelectedItemDate={setSelectedItemDate}
          />,
          ...(!isLoading ? eventList : fakeWaitingData)
        ]}
        initialNumToRender={1}
        showsVerticalScrollIndicator={false}
        getItem={(data, index) => data[index]}
        getItemCount={(data) => data?.length}
        getItemLayout={(data, index) => ({ length: 450, offset: 450 * index, index })}
        stickyHeaderHiddenOnScroll={true}
        stickyHeaderIndices={[1]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            style={{
              zIndex: -10
            }}
          />
        }
        onEndReachedThreshold={5}
        onEndReached={fetchMoreData}
        ListEmptyComponent={<WarningScreenItem type={isLoading ? 'loader' : 'error'} />}
        renderItem={CityHomeEventRender}
        ListFooterComponent={() =>
          isLoading || isFetching || isFetchingNextPage || isRefetching ? (
            <>
              <CityEventCardEmptyItem large />
              <CityEventCardEmptyItem large />
              <CityEventCardEmptyItem large />
            </>
          ) : (
            <CityEventListFooterItem isLoading={isLoading} eventLength={eventList.length} />
          )
        }
        keyExtractor={(item, index) =>
          `${item?.uid?.toString()}-${index}` ?? `${item}-header-${index}`
        }
        extraData={selectedItemDate}
      />
    </Layout>
  );
};
