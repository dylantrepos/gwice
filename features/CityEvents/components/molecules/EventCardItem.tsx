import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar } from 'lucide-react-native';
import { useEffect, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ImageBackground, Pressable, View } from 'react-native';
import { IconItem } from '../../../../components/atoms/IconItem';
import { TagItem } from '../../../../components/atoms/TagItem';
import { TextItem } from '../../../../components/atoms/TextItem';
import palette from '../../../../theme/palette';
import { formatDate } from '../../../../utils/events';
import styles from '../../styles/molecules/EventCardItem.style';
import { type CityEventCard } from '../../types/Events';
import { allEventsCategoryLille } from '../../utils/events';

interface Props {
  event: CityEventCard;
  period: string;
  large?: boolean;
  onTagPressed?: (category: any) => void;
}

export const EventCardItem = ({ event, period, large = false, onTagPressed }: Props): ReactNode => {
  const {
    uid: eventId,
    title,
    image,
    'categories-metropolitaines': categoriesMetropolitaines,
    description,
    nextTiming,
    nextDate
  } = event;

  if (!categoriesMetropolitaines) return null;

  const { t } = useTranslation();
  const navigation = useNavigation();
  const [imageLoaded, setImageLoaded] = useState(false);

  const imageSrc = `${image.base}${image.filename}`;
  const categoriesId = categoriesMetropolitaines.map((category) => category.id);
  const categories = categoriesId.map((categoryId) =>
    allEventsCategoryLille.find((category) => category.id === categoryId)
  );
  const firstCategory = categories[0];
  const CategoryIconElt = firstCategory?.iconElt ?? null;

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
    navigation.navigate('CityEventsDetails', { eventId });
  };

  return (
    imageLoaded &&
    (large ? (
      <Pressable style={styles.card} onPress={handlePress}>
        <ImageBackground
          style={styles.cardImage}
          source={{
            uri: imageSrc
          }}
        >
          <LinearGradient colors={['rgba(0,0,0,1)', 'transparent']} style={styles.cardInfos}>
            <TextItem
              size="lg"
              weight="bold"
              numberOfLines={3}
              style={{
                color: palette.whitePrimary
              }}
            >
              {title.fr ?? ''}
            </TextItem>
            <TextItem
              weight="regular"
              style={{
                color: palette.whitePrimary
              }}
            >
              {nextTiming && formatDate({ nextDate, period })}
            </TextItem>
          </LinearGradient>
          <LinearGradient colors={['transparent', 'rgba(0,0,0,1)']} style={styles.cardDescription}>
            {categories && (
              <View style={styles.cardDescriptionCategoriesContainer}>
                {categories.slice(-3).map((category, index) => {
                  if (category) {
                    const CategoryIconElt = category?.iconElt ?? null;
                    return (
                      <Pressable
                        key={index}
                        onPress={
                          onTagPressed
                            ? () => {
                                onTagPressed(category.id);
                              }
                            : undefined
                        }
                      >
                        <TagItem
                          title={t(category.translationKey) ?? ''}
                          IconElt={CategoryIconElt}
                        />
                      </Pressable>
                    );
                  }
                  return null;
                })}
              </View>
            )}
            {description && (
              <TextItem style={styles.cardDescriptionText} numberOfLines={3}>
                {description.fr ?? ''}
              </TextItem>
            )}
          </LinearGradient>
        </ImageBackground>
      </Pressable>
    ) : (
      <Pressable style={styles.culturalEventsCard} onPress={handlePress}>
        <View style={styles.culturalEventsCardImageContainer}>
          <Image style={styles.culturalEventsCardImage} source={{ uri: imageSrc }} />
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
        <View style={styles.culturalEventsCardDetails}>
          <TextItem size="sm" weight="regular" numberOfLines={2} ellipsizeMode="tail">
            {title.fr ?? ''}
          </TextItem>
          <View style={styles.culturalEventsCardDetailsDate}>
            {/* <Calendar size={12} color={'black'} strokeWidth={1}/> */}
            <IconItem IconElt={Calendar} size="sm" stroke="light" />
            <TextItem style={styles.culturalEventsCardDetailsDateTitle} size="sm" weight="light">
              {nextTiming && formatDate({ nextDate, period })}
            </TextItem>
          </View>
        </View>
      </Pressable>
    ))
  );
};
