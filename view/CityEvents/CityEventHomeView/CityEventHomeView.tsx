import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setRefetchCityEventHome } from "../../../reducers/generalReducer";
import { Keyboard, View, VirtualizedList } from "react-native";
import { CityEventCard } from "../../../modules/CityEvents/types/Events";
import { RefreshControl } from "react-native-gesture-handler";
import { WarningScreenItem } from "../../../components/WarningScreenItem/WarningScreenItem";
import { isBefore } from 'date-fns';
import { CityEventListPromoteItem } from "../../../modules/CityEvents/components/CityEventListPromoteItem/CityEventListPromoteItem";
import { CityEventCardLargeEmptyItem, CityEventCardLargeItem } from "../../../modules/CityEvents/components/CityEventCardItem/CityEventCardItem";
import { useGetCityEvents } from "../../../modules/CityEvents/hooks/useGetCityEvents";
import { CityEventListStickyHeaderItem } from "../../../modules/CityEvents/components/CityEventListStickyHeaderItem/CityEventListStickyHeaderItem";
import { CityEventListFooterItem } from "../../../modules/CityEvents/components/CityEventListFooterItem/CityEventListFooterItem";
import { RootState } from "../../../store/store";
import { PageHeaderLayout } from "../../../layouts/PageHeaderLayout";
import { filterDate } from "../../../modules/CityEvents/utils/date";


type HeaderListProps = {
  navigation: any;
  handleHeaderHeight: React.Dispatch<React.SetStateAction<number>>;
}

const HeaderList = ({
  navigation,
  handleHeaderHeight
}: HeaderListProps) => {

  return  ( 
  <View
    onLayout={(event) => {
      const {height} = event.nativeEvent.layout;
      handleHeaderHeight(height);
    }}
  >
    <CityEventListPromoteItem 
      navigation={navigation}
    />
  </View>)
}

type Props = {
  navigation: any;
  route: any;
}

type CityEventCardLargeItemProps = {
  item: any;
  index: number;
}


export const CityEventHomeView = ({
  navigation,
  route
}: Props) => {
  const [refreshing, setRefreshing] = useState(false);
  const [eventList, setEventList] = useState<CityEventCard[] | number[]>([]);
  const [filteredCategoryIdList, setFilteredCategoryIdList] = useState<number[]>([]);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [selectedItemDate, setSelectedItemDate] = useState(filterDate[0]);
  const { 
    isSearchInputFocused, 
    currentPeriod, 
    customPeriod,
    startDate,
    endDate
  } = useSelector((state: RootState) => state.eventReducer);
  const dispatch = useDispatch();
  const flatListRef = useRef<VirtualizedList<CityEventCard> | null>(null);
  const fakeWaitingData = Array(5).fill(0).map((_, index) => index);


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(setRefetchCityEventHome(true));
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);


  const CityHomeEventRender = useCallback(({item, index}: CityEventCardLargeItemProps) => {
    // check if the item is the sticky header
    if (index === 0) return item;

    if (index > 0 && item.nextTiming) {
      const nextTimingStart = new Date(item.nextTiming.begin);
      const nextTimingEnd = new Date(item.nextTiming.end);
      const now = new Date();

      if (isBefore(nextTimingStart, now) && isBefore(nextTimingEnd, now)) {
        return null;
      } 
    }

    return eventList?.length > 0 
        ? <CityEventCardLargeItem 
            navigation={navigation}
            route={route}
            event={item as CityEventCard}
            selectedItemDate={selectedItemDate}
            period={currentPeriod}
          />
        : <CityEventCardLargeEmptyItem />
  }, [eventList])

  const {
    isLoading, 
    events, 
    isError,
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

  const fetchMoreData = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        if (flatListRef.current && scrollPosition < headerHeight) {
          flatListRef.current.scrollToOffset({ animated: false, offset: headerHeight });
        }
      }
    );
  
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
      }
      else if (flatListRef.current && scrollPosition > headerHeight) {
        flatListRef.current.scrollToOffset({ animated: false, offset: headerHeight });
      }
    }
  }, [isSearchInputFocused]);

  return (
    <PageHeaderLayout
      headerWithTransparentBackground={true}
    >
      <VirtualizedList
        removeClippedSubviews={false}
        contentContainerStyle={{ minHeight: '100%' }}
        maxToRenderPerBatch={10}
        windowSize={21}
        ref={flatListRef}
        keyboardShouldPersistTaps="handled"
        onScroll={(event) => {
          setScrollPosition(event.nativeEvent.contentOffset.y);
        }}
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
        getItemLayout={(data, index) => (
          {length: 450, offset: 450 * index, index}
        )}
        stickyHeaderHiddenOnScroll={true}
        stickyHeaderIndices={[1]}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} onRefresh={onRefresh} 
          />
        }
        onEndReachedThreshold={5}
        onEndReached={fetchMoreData}
        ListHeaderComponent={
          <HeaderList 
            navigation={navigation} 
            handleHeaderHeight={setHeaderHeight}
          />
        }
        
        ListEmptyComponent={
          <WarningScreenItem 
            type={isLoading ? 'loader' : 'error'} 
          />
        }
        renderItem={CityHomeEventRender}
        ListFooterComponent={() => {
          return (isLoading || isFetching || isFetchingNextPage || isRefetching) 
            ? <>
                <CityEventCardLargeEmptyItem />
                <CityEventCardLargeEmptyItem />
                <CityEventCardLargeEmptyItem />
              </>
            : (
              <CityEventListFooterItem 
                isLoading={isLoading}
                eventLength={eventList.length}
              />
            )
        }}
        keyExtractor={(item, index) => `${(item as CityEventCard)?.uid?.toString()}-${index}` ?? `${item}-header-${index}`}
        extraData={selectedItemDate}
      />
    </PageHeaderLayout>
  )
};