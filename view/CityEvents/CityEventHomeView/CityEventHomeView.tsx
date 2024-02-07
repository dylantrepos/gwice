import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from 'react-redux';
import { setRefetchCityEventHome } from "../../../reducers/generalReducer";
import { Dimensions, View, VirtualizedList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import style from './CityEventHomeView.style';
import { Text } from "../../../components/Text/Text";
import { CityEventCard } from "../../../types/Events";
import { GestureHandlerRootView, RefreshControl } from "react-native-gesture-handler";
import { useGetCityEvents } from "../../../hooks/useGetCityEvents";
import { CityEventCardLargeEmptyItem, CityEventCardLargeItem } from "../../../components/CityEvents/CityEventCardItem/CityEventCardItem";
import { WarningScreenItem } from "../../../components/WarningScreenItem/WarningScreenItem";
import { CityEventListPromoteItem } from "../../../components/CityEvents/CityEventListPromoteItem/CityEventListPromoteItem";
import { CityEventListSearchItem } from '../../../components/CityEvents/CityEventListSearchItem/CityEventListSearchItem';
import { CityEventListStickyHeaderItem } from "../../../components/CityEvents/CityEventListStickyHeaderItem/CityEventListStickyHeaderItem";
import { CityEventListFooterItem } from "../../../components/CityEvents/CityEventListFooterItem/CityEventListFooterItem";
import moment from 'moment-timezone';
import { FilterDateItem, filterDate } from "../../../utils/events";


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
    <CityEventListSearchItem />
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
  const [selectedItemDate, setSelectedItemDate] = useState(filterDate[3]);
  const dispatch = useDispatch();
  const flatListRef = useRef<VirtualizedList<CityEventCard> | null>(null);
  const fakeWaitingData = Array(5).fill(0).map((_, index) => index);

  const today = moment.tz("Europe/Paris").add(1, 'hours');
  const sundayEndOfDay = moment(today).add(7, 'days').endOf('day').add(1, 'hours');

  const [startDate, setStartDate] = useState(today.toDate());
  const [endDate, setEndDate] = useState(sundayEndOfDay.toDate());

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(setRefetchCityEventHome(true));
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const CityHomeEventRender = useCallback(({item, index}: CityEventCardLargeItemProps) => {
    // check if the item is the sticky header
    if (index > 0 && item.nextTiming) {
      const nextTiming = new Date(item.nextTiming.begin);
      const now = new Date();

      if (nextTiming < now) {
        return null;
      } 
    }

    return index === 0 ? item : eventList?.length > 0 ? (
      <CityEventCardLargeItem 
        navigation={navigation}
        route={route}
        event={item as CityEventCard}
        startDate={startDate}
        selectedItemDate={selectedItemDate}
      />
    ) : (
      <CityEventCardLargeEmptyItem />
    )
  }, [eventList])

  const {
    isLoading, 
    events, 
    isError,
    hasNextPage,
    fetchNextPage
  } = useGetCityEvents({
    refetchCityEventHome: refreshing, 
    categoryIdList: filteredCategoryIdList,
    startDate,
    endDate
  });

  const fetchMoreData = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }

  useEffect(() => {
    console.log('/////////');
    console.log('startDate', startDate);
    console.log('endDate', endDate);
}, [startDate, endDate]);

  useEffect(() => {
    setEventList([]);
    if (flatListRef.current && scrollPosition > headerHeight) {
      flatListRef.current.scrollToOffset({ animated: false, offset: headerHeight });
    }
  }, [filteredCategoryIdList]);

  useEffect(() => {
    if (!isLoading && events) {
      console.log('events total', events.pages[0].total);
      const eventsListFinal = events.pages.map((page) => page.events).flat();
      setEventList(eventsListFinal);
    }
  }, [events]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={style.cityEventHomeContainer}>
        <SafeAreaView
          style={style.cityEventHomeContainerSafeArea}
        >
          <VirtualizedList
            removeClippedSubviews={false}
            contentContainerStyle={{ minHeight: '100%' }}
            maxToRenderPerBatch={10}
            windowSize={21}
            ref={flatListRef}
            onScroll={(event) => {
              setScrollPosition(event.nativeEvent.contentOffset.y);
            }}
            data={[
              <CityEventListStickyHeaderItem 
                filteredCategoryIdList={filteredCategoryIdList}
                handleSetFilteredCategoryIdList={setFilteredCategoryIdList}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                selectedItemDate={selectedItemDate}
                setSelectedItemDate={setSelectedItemDate}
                />, 
              ...(eventList?.length > 0 || !isLoading ? eventList : fakeWaitingData)
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
            ListFooterComponent={() => (
              <CityEventListFooterItem
                isLoading={isLoading}
              />
            )}
            keyExtractor={(item, index) => `${(item as CityEventCard)?.uid?.toString()}-${index}` ?? `${item}-header-${index}`}
            extraData={selectedItemDate}
          />
      </SafeAreaView>
      </View>
    </GestureHandlerRootView>
  )
};