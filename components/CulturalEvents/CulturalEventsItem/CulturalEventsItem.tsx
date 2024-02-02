import { ChevronRight } from "lucide-react-native";
import style from './CulturalEventsItem.style';
import { Text } from "../../Text/Text";
import { Pressable, ScrollView, View } from "react-native";
import { CulturalEventsCardItem } from "../CulturalEventsCardItem/CulturalEventsCardItem";
import { CulturalEventCard, LilleCulturalEvent } from "../../../types/CulturalEvents";
import { useGetCulturalEvents } from "../../../hooks/useGetCulturalEvents";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { WarningScreenItem } from "../../WarningScreenItem/WarningScreenItem";
import { formatTitle } from "../../../utils/culturalEvents";

type Props = {
  navigation: any;
  route: any;
  title: string;
  handleNavigation: () => void;
  category?: number;
}

export const CulturalEventsItem = ({
  navigation, 
  route,
  title,
  handleNavigation,
  category
}: Props) => {
  const { currentCity, refetchHome } = useSelector((state: RootState) => state.general);

  const {
    isLoading, 
    events, 
    isError
  } = useGetCulturalEvents(refetchHome, category);

  if (!events) return null;


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
            : events && events?.total > 0 ?
              events.events.map((event, index) => (
                <CulturalEventsCardItem 
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
