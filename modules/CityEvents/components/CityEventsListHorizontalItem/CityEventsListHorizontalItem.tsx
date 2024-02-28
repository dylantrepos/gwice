import { ChevronRight } from "lucide-react-native";
import style from './CityEventsListHorizontalItem.style';
import { FlatList, View } from "react-native";
import { CityEventCardEmptyItem, CityEventCardItem } from "../CityEventCardItem/CityEventCardItem";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { RootState } from "../../../../store/store";
import { useInfiniteQuery } from "react-query";
import { fetchCityEvents } from "../../services/cityEvents";
import { CityEventsListHorizontalItemRenderProps, Props } from "./CityEventsListHorizontalItem.type";
import { TitleItem } from "../../../../components/TitleItem/TitleItem";
import { CityEventCard } from "../../types/Events";
import { useGetCityEvents } from "../../hooks/useGetCityEvents";

export const CityEventsListHorizontalItem = ({
  navigation, 
  route,
  title,
  handleNavigation,
}: Props) => {
  const { refetchCityEventHome } = useSelector((state: RootState) => state.generalReducer);
  const [eventList, setEventList] = useState<any[]>([]);
  const fakeWaitingData = Array(5).fill(0).map((_, index) => index);

  const { 
    currentPeriod, 
    startDate,
    endDate
  } = useSelector((state: RootState) => state.eventReducer);

  const {
    isLoading, 
    events, 
    isError,
    hasNextPage,
    fetchNextPage,
  } = useGetCityEvents({
    refetchCityEventHome: refetchCityEventHome, 
    categoryIdList: [],
    startDate,
    endDate,
    key: 'cityEventHome'
  });

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
