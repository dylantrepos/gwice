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
    timings,
    nextTiming
  } = event;

  if (!categoriesMetropolitaines) return null;

  const { currentHomeViewDate } = useSelector((state: RootState) => state.generalReducer);

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
        title={firstCategory?.title ?? ''}
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
            {formatDate ({
              inputDateStart: new Date(nextTiming.begin), 
              inputDateEnd: new Date(nextTiming.end),
              selectedItemDate: {id: 3, label: 'week', value: 'week'},
              timings,
              startDate: moment.utc().add(1, 'hour').toDate(),
            })}
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
               {
                nextTiming &&
                formatDate({
                  inputDateStart: new Date(nextTiming.begin), 
                  inputDateEnd: new Date(nextTiming.end),
                  selectedItemDate, 
                  timings: timings,
                  title: title['fr'],
                  startDate,
                })
               }
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
                      title={category?.title ?? ''}
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
