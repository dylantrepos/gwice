import { ChevronRight } from "lucide-react-native";
import style from './CityEventsListHorizontalItem.style';
import { Text } from "../../Text/Text";
import { Pressable, ScrollView, View } from "react-native";
import { CityEventCardItem } from "../CityEventCardItem/CityEventCardItem";
import { useGetCityEvents } from "../../../hooks/useGetCityEvents";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { WarningScreenItem } from "../../WarningScreenItem/WarningScreenItem";
import { formatTitle } from "../../../utils/events";
import { useEffect, useState } from "react";

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
  const { currentCity, refetchCityEventHome } = useSelector((state: RootState) => state.general);
  const [eventList, setEventList] = useState<any[]>([]);

  const {
    isLoading, 
    events, 
    isError
  } = useGetCityEvents({refetchCityEventHome, categoryIdList});

  useEffect(() => {
    if (!isLoading && events) {
      const eventsListFinal = events.pages.map((page) => page.events).flat();
      setEventList(eventsListFinal);
    }
  }, [events]);


  return (
    <View style={style.culturalEvents}>
      <Pressable 
        style={style.culturalEventsTitleContainer}
        onPress={handleNavigation}
      >
        <Text styles={style.culturalEventsTitle} weight="500">{formatTitle(title)}</Text>
        <ChevronRight size={20} color={'black'}/>
      </Pressable>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={style.culturalEventsCardsContainer}
        snapToAlignment='start'
        decelerationRate="fast"
        alwaysBounceHorizontal={false}
        snapToInterval={50}
        
        contentContainerStyle={{
          columnGap: 15,
          paddingRight: 30,
        }}

        
      >
        { isLoading || isError ?
            <WarningScreenItem
              type={isLoading ? 'loader' : 'error'}
            />
            : events && eventList.length > 0 ?
              eventList.map((event, index) => (
                <CityEventCardItem 
                  key={index}
                  navigation={navigation}
                  route={route}
                  event={event}
                />
              ))
              : <WarningScreenItem
                  type={'unavailable'}
                >{title} non disponible.</WarningScreenItem> 
        }
      </ScrollView>
    </View>
  )
};
