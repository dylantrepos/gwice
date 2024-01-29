import { ChevronRight } from "lucide-react-native";
import style from './CulturalEventsItem.style';
import { Text } from "../../Text/Text";
import { Pressable, ScrollView, View } from "react-native";
import { CulturalEventsCardItem } from "../CulturalEventsCardItem/CulturalEventsCardItem";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import useGetCulturalEvents from "../../../hooks/useGetCulturalEvents";
import { LoaderItem } from "../../LoaderItem/LoaderItem";
import { ErrorItem } from "../../ErrorItem/ErrorItem";
import { useEffect } from "react";

type Props = {
  navigation: any;
  route: any
}

export const CulturalEventsItem = ({
  navigation, 
  route
}: Props) => {
  const { currentCity, refetchHome } = useSelector((state: RootState) => state.general);
  
  const {isLoading, events, error} = useGetCulturalEvents(currentCity.cityName, 'today', refetchHome);
  

  const handlePress = () => {
    console.log('Pressed!');
    navigation.push('CulturalEvents');
  }

  useEffect(() => {
    // console.log('CulturalEventsItem.tsx: useEffect: culturalEvents: ', culturalEvents);
    console.log('CulturalEventsItem.tsx: useEffect: culturalEvents: ', events?.length);
  }, [events]);

  return (
    <View style={style.culturalEvents}>
      <Pressable 
        style={style.culturalEventsTitleContainer}
        onPress={handlePress}
      >
        <Text styles={style.culturalEventsTitle} weight="500">Événements culturels</Text>
        <ChevronRight size={20} color={'black'}/>
      </Pressable>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={style.culturalEventsCardsContainer}
        snapToAlignment='start'
        decelerationRate="fast"
        alwaysBounceHorizontal={false}
        contentContainerStyle={{
          columnGap: 15,
          paddingRight: 30,
        }}
      >
        { isLoading 
          ? <LoaderItem />
          : error 
            ? <ErrorItem />
            : events && events?.length > 0 ?
              events.map((event, index) => (
                <CulturalEventsCardItem 
                  key={index}
                  navigation={navigation}
                  route={route}
                  event={event}
                />
              ))
              : <Text>No cultural events available.</Text> 
        }
      </ScrollView>
    </View>
  )
};
