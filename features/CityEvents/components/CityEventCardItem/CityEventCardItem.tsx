import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar } from 'lucide-react-native';
import { memo, useEffect, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Image, ImageBackground, Pressable, View } from 'react-native';
import { IconItem } from '../../../../components/general/IconItem/IconItem';
import { TagItem } from '../../../../components/general/TagItem/TagItem';
import { TextItem } from '../../../../components/general/TextItem/TextItem';
import { useBackgroundColorLoading } from '../../../../hooks/useBackgroundColorLoading';
import { allEventsCategoryLille } from '../../../../modules/CityEvents/utils/events';
import { type CityEventCard } from '../../../../types/Events';
import { type FilterDateItem } from '../../../../utils/date';
import { formatDate } from '../../../../utils/events';
import style from './CityEventCardItem.style';

interface Props {
  event: CityEventCard;
  period: string;
}

export const CityEventCardItem = ({ event, period }: Props): ReactNode => {
  const {
    uid: eventId,
    title,
    image,
    'categories-metropolitaines': categoriesMetropolitaines,
    nextTiming,
    nextDate
  } = event;

  if (!categoriesMetropolitaines) return null;
  const { t } = useTranslation();

  const [imageLoaded, setImageLoaded] = useState(false);
  const imageSrc = `${image.base}${image.filename}`;
  const navigation = useNavigation();

  useEffect(() => {
    Image.prefetch(imageSrc)
      .then(() => {
        setImageLoaded(true);
      })
      .catch((error) => {
        console.error('Failed to prefetch image', error);
      });
  }, []);

  const handlePress = (): void => {
    // @ts-expect-error navigate need definition
    navigation.navigate('CulturalEvent', { eventId });
  };

  const categoriesId = categoriesMetropolitaines.map((category) => category.id);

  const categories = categoriesId.map((categoryId) =>
    allEventsCategoryLille.find((category) => category.id === categoryId)
  );
  const firstCategory = categories[0];

  const CategoryIconElt = firstCategory?.iconElt ?? null;

  return (
    imageLoaded && (
      <Pressable style={style.culturalEventsCard} onPress={handlePress}>
        <View style={style.culturalEventsCardImageContainer}>
          <Image style={style.culturalEventsCardImage} source={{ uri: imageSrc }} />
        </View>
        {firstCategory && (
          <TagItem
            title={t(firstCategory.translationKey) ?? ''}
            IconElt={CategoryIconElt}
            style={{
              position: 'absolute',
              top: 5
            }}
          />
        )}
        <View style={style.culturalEventsCardDetails}>
          <TextItem size="sm" weight="regular" numberOfLines={2} ellipsizeMode="tail">
            {title.fr ?? ''}
          </TextItem>
          <View style={style.culturalEventsCardDetailsDate}>
            {/* <Calendar size={12} color={'black'} strokeWidth={1}/> */}
            <IconItem IconElt={Calendar} size="sm" stroke="light" />
            <TextItem style={style.culturalEventsCardDetailsDateTitle} size="sm" weight="light">
              {nextTiming && formatDate({ nextDate, period })}
            </TextItem>
          </View>
        </View>
      </Pressable>
    )
  );
};

interface CityEventCardLargeItemProps {
  event: CityEventCard;
  selectedItemDate: FilterDateItem;
  period: string;
}

// eslint-disable-next-line react/display-name
export const CityEventCardLargeItem = memo(
  ({ event, period }: CityEventCardLargeItemProps) => {
    const {
      uid,
      title,
      image,
      'categories-metropolitaines': categoriesMetropolitaines,
      description,
      nextDate,
      nextTiming
    } = event;

    if (!categoriesMetropolitaines) return null;

    const { t } = useTranslation();
    const navigation = useNavigation();

    const categoriesId = categoriesMetropolitaines.map((category) => category.id);

    const categories = categoriesId.map((categoryId) =>
      allEventsCategoryLille.find((category) => category.id === categoryId)
    );

    const [imageLoaded, setImageLoaded] = useState(false);
    const imageSrc = `${image.base}${image.filename}`;

    useEffect(() => {
      Image.prefetch(imageSrc)
        .then(() => {
          setImageLoaded(true);
        })
        .catch((error) => {
          console.error('Failed to prefetch image', error);
        });
    }, []);

    const handlePress = (): void => {
      // @ts-expect-error navigate need definition
      navigation.navigate('CulturalEvent', { eventId: uid });
    };

    return (
      <Pressable style={style.card} onPress={handlePress}>
        {imageLoaded && (
          <ImageBackground
            style={style.cardImage}
            source={{
              uri: imageSrc
            }}
          >
            <LinearGradient colors={['rgba(0,0,0,1)', 'transparent']} style={style.cardInfos}>
              <TextItem
                size="lg"
                weight="bold"
                numberOfLines={3}
                style={{
                  color: 'white'
                }}
              >
                {title.fr ?? ''}
              </TextItem>
              <TextItem
                weight="regular"
                style={{
                  color: 'white'
                }}
              >
                {nextTiming && formatDate({ nextDate, period })}
              </TextItem>
            </LinearGradient>
            <LinearGradient colors={['transparent', 'rgba(0,0,0,1)']} style={style.cardDescription}>
              {categories && (
                <View style={style.cardDescriptionCategoriesContainer}>
                  {categories.slice(-3).map((category, index) => {
                    if (category) {
                      const CategoryIconElt = category?.iconElt ?? null;
                      return (
                        <TagItem
                          key={index}
                          title={t(category.translationKey) ?? ''}
                          IconElt={CategoryIconElt}
                        />
                      );
                    }
                    return null;
                  })}
                </View>
              )}
              {description && (
                <TextItem style={style.cardDescriptionText} numberOfLines={3}>
                  {description.fr ?? ''}
                </TextItem>
              )}
            </LinearGradient>
          </ImageBackground>
        )}
      </Pressable>
    );
  },
  (prevProps, nextProps) => prevProps.event.uid === nextProps.event.uid
);

interface CityEventCardEmptyItemProps {
  large?: boolean;
}

export const CityEventCardEmptyItem = ({
  large = false
}: CityEventCardEmptyItemProps): ReactNode => {
  const { backgroundColor } = useBackgroundColorLoading(true);

  return (
    <Animated.View
      style={{
        ...(large ? style.cardLargeEmptyContainer : style.cardEmptyContainer),
        backgroundColor
      }}
    ></Animated.View>
  );
};
