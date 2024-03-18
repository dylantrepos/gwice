import { isBefore } from 'date-fns';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { VirtualizedList, type NativeScrollEvent, type NativeSyntheticEvent } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCityEvents } from '../../../hooks/useGetCityEvents';
import { Layout } from '../../../layouts/Layout';
import { setRefetchCityEventHome } from '../../../reducers/generalReducer';
import { type RootState } from '../../../store/store';
import { type CityEventCard } from '../../../types/Events';
import { EventCardEmptyItem } from '../components/molecules/EventCardEmptyItem';
import { EventCardItem } from '../components/molecules/EventCardItem';
import { CityEventListFooterItem } from '../components/organisms/CityEventListFooterItem';
import { HeaderList } from '../components/organisms/CityEventListHeaderItem';
import { CityEventListStickyHeaderItem } from '../components/organisms/CityEventListStickyHeaderItem';

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

  const { currentPeriod, customPeriod, startDate, endDate } = useSelector(
    (state: RootState) => state.eventReducer
  );
  const dispatch = useDispatch();
  const flatListRef = useRef<VirtualizedList<CityEventCard> | null>(null);
  const fakeWaitingData = Array(5)
    .fill(0)
    .map((_, index) => index);

  const { isLoading, events, fetchNextPage, isFetching, isFetchingNextPage, isRefetching } =
    useGetCityEvents({
      refetchCityEventHome: refreshing,
      categoryIdList: filteredCategoryIdList,
      startDate,
      endDate,
      key: 'cityEventHome'
    });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(setRefetchCityEventHome(true));
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const CityHomeEventRender = useCallback(
    ({ item, index }: EventCardProps) => {
      if (index === 0) return item;

      if (item.nextTiming) {
        const nextTimingStart = new Date((item as CityEventCard).nextTiming.begin);
        const nextTimingEnd = new Date((item as CityEventCard).nextTiming.end);
        const now = new Date();

        if (isBefore(nextTimingStart, now) && isBefore(nextTimingEnd, now)) {
          return null;
        }
      }

      return eventList?.length > 0 ? (
        <EventCardItem event={item} period={currentPeriod} large />
      ) : (
        <EventCardEmptyItem large />
      );
    },
    [eventList]
  );

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
    setScrollPosition(event.nativeEvent.contentOffset.y);
  };

  const handleKeyExtractor = (item: CityEventCard, index: number): string =>
    `${item?.uid?.toString()}-${index}` ?? `header-${index}`;

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
        ListFooterComponent={
          <CityEventListFooterItem
            isLoading={isLoading || isFetching || isFetchingNextPage || isRefetching}
            eventLength={eventList.length}
          />
        }
        ListHeaderComponent={<HeaderList setHeaderHeight={setHeaderHeight} />}
        maxToRenderPerBatch={10}
        onEndReached={fetchNextPage}
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
