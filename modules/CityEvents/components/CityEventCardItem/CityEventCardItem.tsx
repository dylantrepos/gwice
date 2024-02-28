import { Calendar } from "lucide-react-native";
import style from './CityEventCardItem.style';
import { Animated, Image, ImageBackground, Pressable, View } from "react-native";
import { memo, useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import moment from "moment";
import { CityEventCard } from "../../types/Events";
import { RootState } from "../../../../store/store";
import { allEventsCategoryLille, formatTitle } from "../../utils/events";
import { TextItem } from "../../../../components/TextItem/TextItem";
import { formatDate } from "../../../../utils/events";
import { useBackgroundColorLoading } from "../../../../hooks/useBackgroundColorLoading";
import { TagItem } from "../../../../components/TagItem/TagItem";
import { IconItem } from "../../../../components/IconItem/IconItem";
import { FilterDateItem } from "../../utils/date";
import { useTranslation } from "react-i18next";

type Props = {
  navigation: any;
  route: any;
  event: CityEventCard;
  period: string;
}

export const CityEventCardItem = ({
  navigation, 
  route,
  event,
  period
}: Props) => {
  const { 
    uid: eventId,
    title, 
    image, 
    "categories-metropolitaines": categoriesMetropolitaines,
    nextTiming,
    timings,
    nextDate,
  } = event;

  if (!categoriesMetropolitaines) return null;
  const { t } = useTranslation();

  const [imageLoaded, setImageLoaded] = useState(false);
  const imageSrc = `${image.base}${image.filename}`;

  useEffect(() => {
    Image.prefetch(imageSrc)
      .then(() => setImageLoaded(true))
      .catch(error => console.error("Failed to prefetch image", error));
  }, []);

  const handlePress = () => {
    navigation.push('CulturalEvent', {eventId});
  }

  const categoriesId = categoriesMetropolitaines.map(category => category.id);

  const categories = categoriesId.map(categoryId => allEventsCategoryLille.find(category => category.id === categoryId));
  const firstCategory = categories[0];

  const CategoryIconElt = firstCategory?.iconElt ?? null;
  console.log('CategoryIconElt', firstCategory);

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
      <TagItem 
        title={t(firstCategory.translationKey) ?? ''}
        IconElt={CategoryIconElt}
        style={{
          position: 'absolute',
          top: 5,
        }}
      />
      <View style={style.culturalEventsCardDetails}>
        <TextItem 
          size="sm"
          weight="regular"
          numberOfLines={2} 
          ellipsizeMode='tail'
        >
          { title['fr'] ?? '' }
        </TextItem>
        <View style={style.culturalEventsCardDetailsDate}>
          {/* <Calendar size={12} color={'black'} strokeWidth={1}/> */}
          <IconItem 
            IconElt={Calendar}
            size="sm"
            stroke="light"
          />
          <TextItem 
            style={style.culturalEventsCardDetailsDateTitle}
            size="sm"
            weight="light"
          >
            { nextTiming && formatDate({nextDate, period}) }
          </TextItem>
        </View>
      </View>
    </Pressable>
  )
};

type CityEventCardLargeItemProps = {
  navigation: any;
  route: any;
  event: CityEventCard;
  selectedItemDate: FilterDateItem;
  period: string;
}

export const CityEventCardLargeItem = memo(({
  navigation, 
  route,
  event,
  period
}: CityEventCardLargeItemProps) => {

  const { 
    uid,
    title, 
    image, 
    "categories-metropolitaines": categoriesMetropolitaines,
    description,
    nextDate,
    nextTiming,
    timings
  } = event;

  if (!categoriesMetropolitaines) return null;

  const { t } = useTranslation();

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
    navigation.push('CulturalEvent', {eventId: uid});
  }


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
            <TextItem 
              size="lg"
              weight="bold"
              numberOfLines={3}
              style={{
                color: 'white',
              }}
              >
              {title['fr'] ?? ''}
            </TextItem>
            <TextItem 
              weight="regular"
              style={{
                color: 'white',
              }}
            >
               { nextTiming && formatDate({nextDate, period}) }
            </TextItem>
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
                    <TagItem 
                      key={index}
                      title={t(category.translationKey) ?? ''}
                      IconElt={CategoryIconElt}
                    />
                  )
                })}
              </View>
            )}
            {description && 
              <TextItem 
                style={style.cardDescriptionText} 
                numberOfLines={3}
              >
                {description['fr'] ?? ''}
              </TextItem>
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
        ...style.cardLargeEmptyContainer,
        backgroundColor,
      }}
    >
    </Animated.View>
  )
};

export const CityEventCardEmptyItem = () => {

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
