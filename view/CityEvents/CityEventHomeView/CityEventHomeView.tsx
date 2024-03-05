import { isBefore } from 'date-fns';
import { ArrowLeft } from 'lucide-react-native';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Keyboard, Pressable, StatusBar, View, VirtualizedList } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { IconItem } from '../../../components/IconItem/IconItem';
import { WarningScreenItem } from '../../../components/WarningScreenItem/WarningScreenItem';
import {
  CityEventCardLargeEmptyItem,
  CityEventCardLargeItem
} from '../../../modules/CityEvents/components/CityEventCardItem/CityEventCardItem';
import { CityEventListFooterItem } from '../../../modules/CityEvents/components/CityEventListFooterItem/CityEventListFooterItem';
import { CityEventListPromoteItem } from '../../../modules/CityEvents/components/CityEventListPromoteItem/CityEventListPromoteItem';
import { CityEventListStickyHeaderItem } from '../../../modules/CityEvents/components/CityEventListStickyHeaderItem/CityEventListStickyHeaderItem';
import { useGetCityEvents } from '../../../modules/CityEvents/hooks/useGetCityEvents';
import { type CityEventCard } from '../../../modules/CityEvents/types/Events';
import { filterDate } from '../../../modules/CityEvents/utils/date';
import { setRefetchCityEventHome } from '../../../reducers/generalReducer';
import { type RootState } from '../../../store/store';

interface HeaderListProps {
  navigation: any;
  handleHeaderHeight: React.Dispatch<React.SetStateAction<number>>;
}

const HeaderList = ({ navigation, handleHeaderHeight }: HeaderListProps): ReactNode => (
  <View
    onLayout={(event) => {
      const { height } = event.nativeEvent.layout;
      handleHeaderHeight(height);
    }}
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
  const { theme } = useSelector((state: RootState) => state.generalReducer);
  const { isSearchInputFocused, currentPeriod, customPeriod, startDate, endDate } = useSelector(
    (state: RootState) => state.eventReducer
  );
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
          navigation={navigation}
          route={route}
          event={item}
          selectedItemDate={selectedItemDate}
          period={currentPeriod}
        />
      ) : (
        <CityEventCardLargeEmptyItem />
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
    if (flatListRef.current && scrollPosition < headerHeight) {
      flatListRef.current.scrollToOffset({ animated: true, offset: headerHeight });
    }
    if (flatListRef.current && scrollPosition > headerHeight) {
      flatListRef.current.scrollToOffset({ animated: false, offset: headerHeight });
    }
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
    if (isSearchInputFocused) {
      if (flatListRef.current && scrollPosition < headerHeight) {
        flatListRef.current.scrollToOffset({ animated: true, offset: headerHeight });
      } else if (flatListRef.current && scrollPosition > headerHeight) {
        flatListRef.current.scrollToOffset({ animated: false, offset: headerHeight });
      }
    }
  }, [isSearchInputFocused]);

  const { top } = useSafeAreaInsets();

  const scrollPosition2 = useRef(new Animated.Value(0)).current;

  const headerBackgroundColor = scrollPosition2.interpolate({
    inputRange: [0, 70],
    outputRange: ['rgba(255,255,255,0)', 'rgba(255,255,255,1)']
  });

  const textOpacity = scrollPosition2.interpolate({
    inputRange: [0, 70],
    outputRange: [0, 1]
  });

  const textPosition = scrollPosition2.interpolate({
    inputRange: [0, 70],
    outputRange: [10, 0],
    extrapolate: 'clamp'
  });

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollPosition2 } } }],
    { useNativeDriver: false } // Set this to true if you're not using the scroll position in JS
  );

  return (
    <View>
      <Animated.View
        style={{
          backgroundColor: headerBackgroundColor,
          zIndex: 10,
          height: top,
          width: '100%',
          position: 'absolute',
          top: 0
        }}
      >
        <StatusBar barStyle={theme === 'light' ? 'dark-content' : 'light-content'} />
      </Animated.View>
      <Animated.View
        style={{
          height: 70,
          flex: 1,
          zIndex: 1,
          backgroundColor: headerBackgroundColor, // Use the animated background color
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          width: '100%',
          top,
          display: 'flex',
          flexDirection: 'row',
          paddingHorizontal: 20
        }}
      >
        <View
          style={{
            flex: 1
          }}
        >
          <Pressable
            style={{
              backgroundColor: 'white',
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
              width: 50
            }}
            onPress={() => navigation.goBack()}
          >
            <IconItem IconElt={ArrowLeft} size="md" color={'black'} stroke="strong" />
          </Pressable>
        </View>
        <Animated.Text
          style={{
            opacity: textOpacity,
            transform: [{ translateY: textPosition }],
            flex: 3,
            textAlign: 'center'
          }}
        >
          {' '}
          {t('screens.home.title')}{' '}
        </Animated.Text>
        <View
          style={{
            flex: 1
          }}
        ></View>
      </Animated.View>
      <VirtualizedList
        removeClippedSubviews={false}
        contentContainerStyle={{ minHeight: '100%' }}
        maxToRenderPerBatch={10}
        windowSize={21}
        ref={flatListRef}
        keyboardShouldPersistTaps="handled"
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
        ListHeaderComponent={
          <HeaderList navigation={navigation} handleHeaderHeight={setHeaderHeight} />
        }
        ListEmptyComponent={<WarningScreenItem type={isLoading ? 'loader' : 'error'} />}
        renderItem={CityHomeEventRender}
        ListFooterComponent={() =>
          isLoading || isFetching || isFetchingNextPage || isRefetching ? (
            <>
              <CityEventCardLargeEmptyItem />
              <CityEventCardLargeEmptyItem />
              <CityEventCardLargeEmptyItem />
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
    </View>
  );
};
