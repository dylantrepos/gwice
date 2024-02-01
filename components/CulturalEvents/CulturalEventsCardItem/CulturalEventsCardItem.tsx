import { Calendar } from "lucide-react-native";
import style from './CulturalEventsCardItem.style';
import { Text } from "../../Text/Text";
import { Image, Pressable, View } from "react-native";
import { getFormatedDateFromTimestamp } from "../../../utils/utils";
import { CulturalEventCard } from "../../../types/CulturalEvents";
import { useEffect, useState } from "react";
import { WarningScreenItem } from "../../WarningScreenItem/WarningScreenItem";

type Props = {
  navigation: any;
  route: any;
  event: CulturalEventCard;
}

export const CulturalEventsCardItem = ({
  navigation, 
  route,
  event
}: Props) => {
  const { 
    uid,
    title, 
    image, 
    "categories-metropolitaines": categoriesMetropolitaines,
    firstTiming,
    lastTiming,
  } = event;

  const [imageLoaded, setImageLoaded] = useState(false);

  const handlePress = () => {
    console.log('Pressed!');
    navigation.push('CulturalEvent', {uid});
  }

  const imageSrc = `${image.base}${image.filename}`;

  useEffect(() => {
    setImageLoaded(false);
  }, [imageLoaded]);

  return (
    <Pressable 
      style={style.culturalEventsCard}
      onPress={handlePress}
    >
      <View style={style.culturalEventsCardImageContainer}>
        {imageLoaded ? <WarningScreenItem type='loader' /> : null}
        <Image 
          style={style.culturalEventsCardImage}
          source={{uri: imageSrc}}
          onLoadStart={() => setImageLoaded(false)}
          onLoadEnd={() => {
            setImageLoaded(true)
          }}
        />
      </View>
      <View style={style.culturalEventsCardCategory}>
        <Text styles={style.culturalEventsCardCategoryTitle} weight="300">
          {categoriesMetropolitaines[0].id !== 28 
            ? categoriesMetropolitaines[0].label['fr']
            : 'Autre'}
        </Text>
      </View>
      <View style={style.culturalEventsCardDetails}>
        <Text 
          styles={style.culturalEventsCardDetailsTitle} 
          weight="500" 
          numberOfLines={2} 
          ellipsizeMode='tail'
        >
          { title['fr'] ?? '' }
        </Text>
        <View style={style.culturalEventsCardDetailsDate}>
          <Calendar size={12} color={'black'} strokeWidth={1}/>
          <Text styles={style.culturalEventsCardDetailsDateTitle} weight="300">
            {`Du ${getFormatedDateFromTimestamp(firstTiming.begin)} au ${getFormatedDateFromTimestamp(lastTiming.end)}`}
          </Text>
        </View>
      </View>
    </Pressable>
  )
};
