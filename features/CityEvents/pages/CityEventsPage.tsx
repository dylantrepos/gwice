import { useNavigation } from '@react-navigation/native';
import { isBefore } from 'date-fns';
import { Search } from 'lucide-react-native';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Pressable,
  VirtualizedList,
  type NativeScrollEvent,
  type NativeSyntheticEvent
} from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { IconItem } from '../../../components/atoms/IconItem';
import { useGetCityEvents } from '../../../hooks/useGetCityEvents';
import { Layout } from '../../../layouts/Layout';
import { setRefetchCityEventHome } from '../../../reducers/generalReducer';
import { type RootState } from '../../../store/store';
import { EventCardEmptyItem } from '../components/molecules/EventCardEmptyItem';
import { EventCardItem } from '../components/molecules/EventCardItem';
import { HeaderList } from '../components/organisms/CityEventListHeaderItem';
import { CityEventListStickyHeaderItem } from '../components/organisms/CityEventListStickyHeaderItem';
import { type CityEventCard } from '../types/Events';

interface EventCardProps {
  item: any;
  index: number;
}

export const CityEventsPage = (): ReactNode => {
  const [eventList, setEventList] = useState<CityEventCard[] | number[]>([]);
  const [filteredCategoryIdList, setFilteredCategoryIdList] = useState<number[]>([]);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { t } = useTranslation();

  const { currentPeriod, customPeriod, startDate, endDate, searchValue } = useSelector(
    (state: RootState) => state.eventReducer
  );
  const flatListRef = useRef<VirtualizedList<CityEventCard> | null>(null);
  const fakeWaitingData = Array(5)
    .fill(0)
    .map((_, index) => index);

  const {
    isLoading,
    events,
    hasNextPage,
    fetchNextPage,
    isError,
    isFetching,
    isFetchingNextPage,
    isRefetching
  } = useGetCityEvents({
    refetchCityEventHome: refreshing,
    categoryIdList: filteredCategoryIdList,
    startDate,
    endDate,
    search: searchValue,
    key: 'cityEventHome'
  });

  /**
   * Header
   */
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => {
            // @ts-expect-error navigate need definition
            navigation.navigate('Search');
          }}
          style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}
        >
          <IconItem IconElt={Search} size="md" stroke="strong" />
        </Pressable>
      )
    });
  }, []);

  /**
   * useCallback
   */

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(setRefetchCityEventHome(true));
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const CityHomeEventRender = useCallback(
    ({ item, index }: EventCardProps) => {
      if (index === 0 || isError) return item;

      if (item.nextTiming) {
        const nextTimingStart = new Date((item as CityEventCard).nextTiming.begin);
        const nextTimingEnd = new Date((item as CityEventCard).nextTiming.end);
        const now = new Date();

        if (isBefore(nextTimingStart, now) && isBefore(nextTimingEnd, now)) {
          return null;
        }
      }

      return eventList?.length > 0 ? (
        <>
          {/* {index === 1 && searchValue && searchValue && (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10
              }}
            >
              <TextItem>
                {`${events?.pages[0]?.total} ${
                  (events?.pages[0]?.total ?? 0) < 2
                    ? t('screens.events.text.numberEventFound')
                    : t('screens.events.text.numberEventsFound')
                }`}
              </TextItem>
            </View>
          )} */}
          <EventCardItem
            event={item}
            period={currentPeriod}
            onTagPressed={handleClickTag}
            filteredCategory={filteredCategoryIdList}
            large
          />
        </>
      ) : (
        <EventCardEmptyItem large />
      );
    },
    [eventList, isError]
  );

  const scrollToTop = (): void => {
    const offset = headerHeight;
    flatListRef.current?.scrollToOffset({
      animated: flatListRef.current && scrollPosition < headerHeight,
      offset
    });
  };

  /**
   * useEffect
   */

  useEffect(() => {
    setEventList([]);
    scrollToTop();
  }, [filteredCategoryIdList, currentPeriod, customPeriod, searchValue]);

  useEffect(() => {
    if (!isLoading && events && !isError) {
      const eventsListFinal = events.pages.map((page) => page?.events).flat();
      if (eventsListFinal) {
        setEventList(eventsListFinal as CityEventCard[]);
      }
    } else {
      setEventList([]);
    }
  }, [events, isError]);

  /**
   * Funtions
   */

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
    setScrollPosition(event.nativeEvent.contentOffset.y);
  };

  const handleKeyExtractor = (item: CityEventCard, index: number): string =>
    `${item?.uid?.toString()}-${index}` ?? `header-${index}`;

  const handleClickTag = (categoryId: number): void => {
    const index = filteredCategoryIdList.indexOf(categoryId);

    setFilteredCategoryIdList(
      index === -1
        ? [...filteredCategoryIdList, categoryId]
        : filteredCategoryIdList.filter((cat) => cat !== categoryId)
    );
  };

  return (
    <Layout>
      <VirtualizedList
        contentContainerStyle={{ minHeight: '100%' }}
        data={[
          <CityEventListStickyHeaderItem
            filteredCategoryIdList={filteredCategoryIdList}
            handleSetFilteredCategoryIdList={setFilteredCategoryIdList}
          />,
          ...(!isLoading ? eventList : fakeWaitingData)
        ]}
        getItem={(data, index) => data[index]}
        getItemCount={(data) => data?.length}
        getItemLayout={(_, index) => ({ length: 450, offset: 450 * index, index })}
        initialNumToRender={1}
        keyboardShouldPersistTaps="handled"
        keyExtractor={handleKeyExtractor}
        // ListFooterComponent={
        //   !hasNextPage ? (
        //     <CityEventListFooterItem
        //       isLoading={isLoading || isFetching || isFetchingNextPage || isRefetching}
        //       eventLength={eventList.length}
        //       isError={isError}
        //     />
        //   ) : null
        // }
        ListHeaderComponent={<HeaderList setHeaderHeight={setHeaderHeight} />}
        maxToRenderPerBatch={10}
        onEndReached={() => {
          if (hasNextPage && !isError) fetchNextPage();
        }}
        onEndReachedThreshold={5}
        onScroll={handleScroll}
        ref={flatListRef}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        removeClippedSubviews={false}
        renderItem={CityHomeEventRender}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        stickyHeaderHiddenOnScroll={true}
        stickyHeaderIndices={[1]}
        windowSize={21}
      />
    </Layout>
  );
};
