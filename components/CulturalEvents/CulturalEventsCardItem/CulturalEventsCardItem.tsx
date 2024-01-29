import { ChevronRight } from "lucide-react-native";
import style from './CulturalEventsCardItem.style';
import { Text } from "../../Text/Text";
import { Image, Pressable, View } from "react-native";
import { limitTitleLength } from "../../../utils/utils";
import { CulturalEvent } from "../../../types/CulturalEvents";

type Props = {
  navigation: any;
  route: any;
  event: CulturalEvent
}

export const CulturalEventsCardItem = ({
  navigation, 
  route,
  event
}: Props) => {
  const { title, image, date } = event;

  const handlePress = () => {
    console.log('Pressed!');
    navigation.push('CulturalEvents', {event});
  }

  return (
    <Pressable 
      style={style.culturalEventsCard}
      onPress={handlePress}
    >
      <View style={style.culturalEventsCardImageContainer}>
        <Image 
          style={style.culturalEventsCardImage}
          source={{uri: image ?? ''}}
        />
      </View>
      <View style={style.culturalEventsCardDetails}>
        <Text styles={style.culturalEventsCardDetailsTitle} weight="500">{limitTitleLength(title ?? '')}</Text>
        <Text styles={style.culturalEventsCardDetailsTitle} weight="300">
          {`${(date?.end && date?.end !== date.start) ? 'Du ' : 'Le '}${date?.start}${(date?.end && date?.end !== date.start) ? ` au ${date.end}` : ''}`}
        </Text>
      </View>
    </Pressable>
  )
};
