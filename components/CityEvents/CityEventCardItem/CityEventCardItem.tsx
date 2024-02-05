import { Calendar } from "lucide-react-native";
import style from './CityEventCardItem.style';
import { Text } from "../../Text/Text";
import { Image, ImageBackground, Pressable, View } from "react-native";
import { getFormatedDateFromTimestamp } from "../../../utils/utils";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { CityEventCard } from "../../../types/Events";
import { allEventsCategoryLille, formatTitle } from '../../../utils/events';

type Props = {
  navigation: any;
  route: any;
  event: CityEventCard;
}

export const CityEventCardItem = ({
  navigation, 
  route,
  event
}: Props) => {
  const { 
    uid: eventId,
    title, 
    image, 
    "categories-metropolitaines": categoriesMetropolitaines,
    firstTiming,
    lastTiming,
  } = event;

  const [imageLoaded, setImageLoaded] = useState(false);
  const imageSrc = `${image.base}${image.filename}`;

  useEffect(() => {
    Image.prefetch(imageSrc)
      .then(() => setImageLoaded(true))
      .catch(error => console.error("Failed to prefetch image", error));
  }, []);

  const handlePress = () => {
    console.log('Pressed!');
    navigation.push('CulturalEvent', {eventId});
  }

  return imageLoaded && (
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

type CityEventCardLargeItemProps = {
  navigation: any;
  route: any;
  key: string;
  event: CityEventCard;
}

export const CityEventCardLargeItem = ({
  navigation, 
  route,
  event
}: CityEventCardLargeItemProps) => {
  const { 
    uid,
    title, 
    image, 
    "categories-metropolitaines": categoriesMetropolitaines,
    firstTiming,
    lastTiming,
    description
  } = event;

  const category = allEventsCategoryLille.find(category => category.id === categoriesMetropolitaines[0].id);

  const CategoryIconElt = category?.iconElt ?? null;

  const [imageLoaded, setImageLoaded] = useState(false);
  const imageSrc = `${image.base}${image.filename}`;

  useEffect(() => {
    Image.prefetch(imageSrc)
      .then(() => setImageLoaded(true))
      .catch(error => console.error("Failed to prefetch image", error));
  }, []);

  const handlePress = () => {
    console.log('Pressed!');
    navigation.push('CulturalEvent', {eventId: uid});
  }

  const today = new Date();
  const firstTimingDate = new Date(firstTiming.begin);

  return imageLoaded && (
    <Pressable 
      style={style.card}
      onPress={handlePress}
    >
       <ImageBackground
          style={style.cardImage}
          source={{
            uri: imageSrc
          }}
        >
          <LinearGradient
            colors={['rgba(0,0,0,1)', 'transparent']}
            style={style.cardInfos}
          >
            <Text 
              styles={style.cardTitle}
              weight="700"
            >
              {title['fr'] ?? ''}
            </Text>
            <Text 
              styles={style.cardDate}
            >
              {getFormatedDateFromTimestamp(firstTiming.begin) === getFormatedDateFromTimestamp(lastTiming.end) 
              ? `${getFormatedDateFromTimestamp(firstTiming.begin)}` 
              : firstTimingDate < today ? `Jusqu'au ${getFormatedDateFromTimestamp(lastTiming.end)}` : `Du ${getFormatedDateFromTimestamp(firstTiming.begin)} au ${getFormatedDateFromTimestamp(lastTiming.end)}`}
            </Text>
          </LinearGradient>
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,1)']}
            style={style.cardDescription} 
          >
            {categoriesMetropolitaines && 
              <View
                style={style.cardDescriptionCategoryContainer}
              >
                { CategoryIconElt && (
                  <View>
                    <CategoryIconElt
                      color={'black'} 
                      size={20} 
                      strokeWidth={1} 
                      // style={style.categoryIcon}
                      />
                  </View>
              )}
                <Text 
                  styles={style.cardDescriptionCategory} 
                >
                  {formatTitle(categoriesMetropolitaines[0].label['fr'] ?? '')}
                </Text>
              </View>
            }
            
            {description && 
              <Text 
                styles={style.cardDescriptionText} 
                numberOfLines={3}
              >
                {description['fr'] ?? ''}
              </Text>
            }
          </LinearGradient>
        </ImageBackground>
    </Pressable>
  )
};
