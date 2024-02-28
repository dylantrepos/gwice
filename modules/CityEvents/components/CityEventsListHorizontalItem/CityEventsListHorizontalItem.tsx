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
import { CityEventCard } from "../../types/Events";

export const CityEventsListHorizontalItem = ({
  navigation, 
  route,
  title,
  handleNavigation,
  categoryIdList
}: Props) => {
  const { refetchCityEventHome } = useSelector((state: RootState) => state.generalReducer);
  const { currentPeriod } = useSelector((state: RootState) => state.eventReducer);
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
        if (lastPage?.after) {
          return lastPage.after;
        }
        return undefined;
      },
    }
  );

  useEffect(() => {
    if (!isLoading && events) {
      const eventsListFinal = events.pages.map((page) => page?.events).flat();
      if (eventsListFinal && eventsListFinal.length > 0) {
        setEventList(eventsListFinal as CityEventCard[]);
      }
    }
  }, [events]);

  const CityEventsListHorizontalItemRender = useCallback(({ item }: CityEventsListHorizontalItemRenderProps) => {
    
    return eventList?.length > 0 
        ? <CityEventCardItem 
            navigation={navigation}
            route={route}
            event={item}
            period={currentPeriod}
          />
        : <CityEventCardEmptyItem />
  }, [eventList])

  return (
    <View style={style.culturalEvents}>
      <TitleItem.Pressable
        title={title}
        size="xl"
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
