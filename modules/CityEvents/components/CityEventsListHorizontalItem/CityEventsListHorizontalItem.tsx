import { ChevronRight } from "lucide-react-native";
import style from './CityEventsListHorizontalItem.style';
import { FlatList, Pressable, View } from "react-native";
import { CityEventCardEmptyItem, CityEventCardItem } from "../CityEventCardItem/CityEventCardItem";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import moment from "moment";
import { isBefore } from 'date-fns';
import { RootState } from "../../../../store/store";
import { formatTitle } from "../../utils/events";
import { TextItem } from "../../../../components/TextItem/TextItem";
import { useInfiniteQuery } from "react-query";
import { fetchCityEvents } from "../../services/cityEvents";
import { CityEventsListHorizontalItemRenderProps, Props } from "./CityEventsListHorizontalItem.type";
import { IconItem } from "../../../../components/IconItem/IconItem";
import { TitleItem } from "../../../../components/TitleItem/TitleItem";

export const CityEventsListHorizontalItem = ({
  navigation, 
  route,
  title,
  handleNavigation,
  categoryIdList
}: Props) => {
  const { refetchCityEventHome } = useSelector((state: RootState) => state.generalReducer);
  const [eventList, setEventList] = useState<any[]>([]);
  const fakeWaitingData = Array(5).fill(0).map((_, index) => index);

  const { 
    isLoading, 
    data: events, 
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    ['CityEventsListHorizontalItem', refetchCityEventHome], 
    ({pageParam: nextEventPageIds = null}) => fetchCityEvents({ 
        categoryIdList, 
        nextEventPageIds,
    }),
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.after) {
          return lastPage.after;
        }
        return undefined;
      },
    }
  );

  useEffect(() => {
    if (!isLoading && events) {
      const now = moment.utc(1).toDate();
      const eventsListFinal = events.pages.map((page) => page.events).flat().filter((event) => {
        if (isBefore(event.nextTiming.begin, now) && isBefore(event.nextTiming.end, now)){
          return null;
        }
        else {
          return event;
        }
      });
      setEventList(eventsListFinal);
    }
  }, [events]);

  const CityEventsListHorizontalItemRender = useCallback(({item, index}: CityEventsListHorizontalItemRenderProps) => {
    // check if the item is the sticky header
    if (item.nextTiming) {
      const nextTimingStart = new Date(item.nextTiming.begin);
      const nextTimingEnd = new Date(item.nextTiming.end);
      const now = new Date();
  
      if (isBefore(nextTimingStart, now) && isBefore(nextTimingEnd, now)) {
        return null;
      } 
    }
  
    return eventList?.length > 0 
        ? <CityEventCardItem 
            navigation={navigation}
            route={route}
            event={item}
          />
        : <CityEventCardEmptyItem />
  }, [eventList])

  return (
    <View style={style.culturalEvents}>
      <TitleItem.Pressable
        title={title}
        handleNavigation={handleNavigation}
        rightIcon={ChevronRight}
      />
      <FlatList
        data={(!isLoading ? eventList : fakeWaitingData)}   
        keyExtractor={(item, index) => index.toString()}
        renderItem={CityEventsListHorizontalItemRender}     
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={style.culturalEventsCardsContainer}
        snapToAlignment='start'
        decelerationRate="fast"
        alwaysBounceHorizontal={false}
        snapToInterval={315}
        onEndReached={() => hasNextPage ? fetchNextPage() : null}
        contentContainerStyle={{
          columnGap: 15,
          paddingRight: 30,
        }}
      />
    </View>
  )
};
