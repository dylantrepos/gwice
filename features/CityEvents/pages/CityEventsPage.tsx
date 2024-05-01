import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { VirtualizedList } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCityEvents } from '../../../hooks/useGetCityEvents';
import { Layout } from '../../../layouts/Layout';
import { setRefetchCityEventHome } from '../../../reducers/generalReducer';
import { type RootState } from '../../../store/store';
import { EventCardEmptyItem } from '../components/molecules/EventCardEmptyItem';
import { EventCardItem } from '../components/molecules/EventCardItem';
import { HeaderList } from '../components/organisms/CityEventListHeaderItem';
import { CityEventListStickyHeaderItem } from '../components/organisms/CityEventListStickyHeaderItem';
import { type CityEventReturn } from '../types/CityEvent';

interface EventCardProps {
  item: any;
  index: number;
}

export const CityEventsPage = (): ReactNode => {
  const [eventList, setEventList] = useState<CityEventReturn[]>([]);
  const [filteredCategoryIdList, setFilteredCategoryIdList] = useState<number[]>([]);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  const { currentPeriod, customPeriod, startDate, endDate, searchValue } = useSelector(
    (state: RootState) => state.eventReducer
  );
  const virtualizedRef = useRef<VirtualizedList<CityEventReturn> | null>(null);

  const { isLoading, data, hasNextPage, fetchNextPage, isError } = useGetCityEvents({
    refetchCityEventHome: refreshing,
    categoryIdList: filteredCategoryIdList,
    startDate,
    endDate,
    search: searchValue,
    key: 'cityEventHome'
  });

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

      return eventList?.length > 0 ? (
        <>
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

  const fakeWaitingData = Array(5)
    .fill(0)
    .map((_, index) => index);

  /**
   * useEffect
   */

  useEffect(() => {
    setEventList([]);
    virtualizedRef.current?.scrollToOffset({
      offset: headerHeight,
      animated: true
    });
  }, [filteredCategoryIdList, currentPeriod, customPeriod, searchValue]);

  useEffect(() => {
    if (!isLoading && data && !isError) {
      const eventsListFinal = data.pages.map((page) => page?.events).flat();
      if (eventsListFinal) {
        setEventList(eventsListFinal as CityEventReturn[]);
      }
    } else {
      setEventList([]);
    }
  }, [data, isError]);

  /**
   * Funtions
   */

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
        keyExtractor={(item, index) => `${item?.uid?.toString()}-${index}` ?? `header-${index}`}
        ListHeaderComponent={<HeaderList setHeaderHeight={setHeaderHeight} />}
        maxToRenderPerBatch={10}
        onEndReached={async () => {
          if (hasNextPage && !isError) await fetchNextPage();
        }}
        onEndReachedThreshold={5}
        ref={virtualizedRef}
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
