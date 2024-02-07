import { Calendar } from "lucide-react-native";
import style from './CityEventCardItem.style';
import { Text } from "../../Text/Text";
import { Animated, Image, ImageBackground, Pressable, View } from "react-native";
import { getFormatedDateFromTimestamp } from "../../../utils/utils";
import { memo, useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { CityEventCard } from "../../../types/Events";
import { FilterDateItem, allEventsCategoryLille, formatDate, formatTitle } from '../../../utils/events';
import { useBackgroundColorLoading } from "../../../hooks/useBackgroundColorLoading";
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

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
  event: CityEventCard;
  startDate: Date;
  selectedItemDate: FilterDateItem;
}

export const CityEventCardLargeItem = memo(({
  navigation, 
  route,
  event,
  startDate,
  selectedItemDate
}: CityEventCardLargeItemProps) => {

  const { 
    uid,
    title, 
    image, 
    "categories-metropolitaines": categoriesMetropolitaines,
    firstTiming,
    lastTiming,
    description,
    nextTiming,
    timings
  } = event;

  if (!categoriesMetropolitaines) return null;

  const categoriesId = categoriesMetropolitaines.map(category => category.id);

  const categories = categoriesId.map(categoryId => allEventsCategoryLille.find(category => category.id === categoryId));
  const lastThreeCategories = categories.slice(-3);

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

  return  (
    <Pressable 
      style={style.card}
      onPress={handlePress}
    >
       {imageLoaded && <ImageBackground
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
               {
                nextTiming &&
                formatDate({
                  inputDate: new Date(nextTiming.begin), 
                  selectedItemDate, 
                  timings: timings,
                  title: title['fr']
                })
               }
            </Text>
          </LinearGradient>
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,1)']}
            style={style.cardDescription} 
          >
            {categories && (
              <View
                style={style.cardDescriptionCategoriesContainer}
              >
                {lastThreeCategories.map((category, index) => {
                  const CategoryIconElt = category?.iconElt ?? null;
                  return (
                    <View 
                      key={index}
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
                        {formatTitle(category?.title ?? '')}
                      </Text>
                    </View>
                  )
                })}
              </View>
            )}
            {description && 
              <Text 
                styles={style.cardDescriptionText} 
                numberOfLines={3}
              >
                {description['fr'] ?? ''}
              </Text>
            }
          </LinearGradient>
        </ImageBackground>}
    </Pressable>
  )
}, (prevProps, nextProps) => { // and here is what i didn't notice before.
  return prevProps.event.uid === nextProps.event.uid;});


export const CityEventCardLargeEmptyItem = () => {

  const { backgroundColor } = useBackgroundColorLoading(true)
  
  return (
    <Animated.View 
      style={{
        ...style.cardEmptyContainer,
        backgroundColor,
      }}
    >
    </Animated.View>
  )
};
