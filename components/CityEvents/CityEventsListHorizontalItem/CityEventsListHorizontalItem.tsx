import { ChevronRight } from "lucide-react-native";
import style from './CityEventsListHorizontalItem.style';
import { Text } from "../../Text/Text";
import { Dimensions, FlatList, Pressable, ScrollView, View } from "react-native";
import { CityEventCardItem } from "../CityEventCardItem/CityEventCardItem";
import { useGetCityEvents } from "../../../hooks/useGetCityEvents";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { WarningScreenItem } from "../../WarningScreenItem/WarningScreenItem";
import { formatTitle } from "../../../utils/events";
import { useEffect, useState } from "react";
import moment from "moment";
import { endOfDay, isBefore } from 'date-fns';

type Props = {
  navigation: any;
  route: any;
  title: string;
  handleNavigation: () => void;
  categoryIdList?: number[];
}

export const CityEventsListHorizontalItem = ({
  navigation, 
  route,
  title,
  handleNavigation,
  categoryIdList
}: Props) => {
  const { 
    refetchCityEventHome
  } = useSelector((state: RootState) => state.general);
  const [eventList, setEventList] = useState<any[]>([]);

  const {
    isLoading, 
    events, 
    isError
  } = useGetCityEvents({
    refetchCityEventHome, 
    categoryIdList,
  });

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



  // 315 


  return (
    <View style={style.culturalEvents}>
      <Pressable 
        style={style.culturalEventsTitleContainer}
        onPress={handleNavigation}
      >
        <Text styles={style.culturalEventsTitle} weight="500">{formatTitle(title)}</Text>
        <ChevronRight size={20} color={'black'}/>
      </Pressable>
      <FlatList
        data={eventList}   
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <CityEventCardItem 
            navigation={navigation}
            route={route}
            event={item}
          />
        )}     
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={style.culturalEventsCardsContainer}
        snapToAlignment='start'
        decelerationRate="fast"
        alwaysBounceHorizontal={false}
        snapToInterval={315}
        
        contentContainerStyle={{
          columnGap: 15,
          paddingRight: 30,
        }}
      />
    </View>
  )
};
