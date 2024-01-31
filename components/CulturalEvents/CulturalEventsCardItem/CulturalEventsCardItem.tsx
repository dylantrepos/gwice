import { ChevronRight } from "lucide-react-native";
import style from './CulturalEventsCardItem.style';
import { Text } from "../../Text/Text";
import { Image, Pressable, View } from "react-native";
import { getFormatedDateFromTimestamp, limitTitleLength } from "../../../utils/utils";
import { LilleCulturalEvent } from "../../../types/CulturalEvents";

type Props = {
  navigation: any;
  route: any;
  event: LilleCulturalEvent
}

export const CulturalEventsCardItem = ({
  navigation, 
  route,
  event
}: Props) => {
  const { 
    title, 
    image, 
    dateRange,
    description,
    location,
    "categories-metropolitaines": categoriesMetropolitaines,
    nextTiming
  } = event;

  const handlePress = () => {
    console.log('Pressed!');
    navigation.push('CulturalEvents', {event});
  }

  const imageSrc = `${image.base}${image.filename}`

  return (
    <Pressable 
      style={style.culturalEventsCard}
      onPress={handlePress}
    >
      <View style={style.culturalEventsCardImageContainer}>
        <Image 
          style={style.culturalEventsCardImage}
          source={{uri: imageSrc}}
        />
      </View>
      <View style={style.culturalEventsCardDetails}>
        <Text styles={style.culturalEventsCardDetailsTitle} weight="500">{limitTitleLength(title['fr'] ?? '')}</Text>
        <Text styles={style.culturalEventsCardDetailsTitle} weight="300">
          {`${getFormatedDateFromTimestamp(nextTiming.begin)}`}
        </Text>
      </View>
    </Pressable>
  )
};
