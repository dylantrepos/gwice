import { useNavigation } from '@react-navigation/native';
import { formatDistance } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar } from 'lucide-react-native';
import moment from 'moment';
import { useEffect, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ImageBackground, Pressable, View } from 'react-native';
import { IconItem } from '../../../../components/atoms/IconItem';
import { TagItem } from '../../../../components/atoms/TagItem';
import { TextItem } from '../../../../components/atoms/TextItem';
import palette from '../../../../theme/palette';
import { formatDate } from '../../../../utils/events';
import styles from '../../styles/molecules/EventCardItem.style';
import { type CityEventReturn } from '../../types/EventTest';
import { allEventsCategoryLille } from '../../utils/events';

interface Props {
  event: CityEventReturn;
  period: string;
  large?: boolean;
  filteredCategory?: number[];
  withTagText?: boolean;
  onTagPressed?: (category: any) => void;
}

export const EventCardItem = ({
  event,
  period,
  large = false,
  withTagText = true,
  filteredCategory,
  onTagPressed
}: Props): ReactNode => {
  const {
    id,
    title,
    image_url: imageUrl,
    category,
    short_description: shortDescription,
    nextTiming
  } = event;

  const { t } = useTranslation();
  const navigation = useNavigation();
  const [imageLoaded, setImageLoaded] = useState(false);

  const categories =
    category?.map((categoryId) =>
      allEventsCategoryLille.find((category) => category.id === categoryId.open_agenda_id)
    ) ?? [];
  const firstCategory = categories[0] ?? null;
  const CategoryIconElt = firstCategory?.iconElt ?? null;

  const timingEvent = (): string => {
    const startTime = moment(nextTiming.begin);
    const endTime = moment(nextTiming.end);
    const now = moment();

    if (now.isBetween(startTime, endTime)) {
      const remainingTime = formatDistance(endTime.toDate(), now.toDate());
      return `Now (end in ${remainingTime})`;
    } else if (startTime.isAfter(now) && startTime.isSame(now, 'day')) {
      const untilStart = formatDistance(startTime.toDate(), now.toDate());
      return `In ${untilStart}`;
    } else {
      return formatDate({ nextDate: nextTiming.begin, period });
    }
  };

  useEffect(() => {
    if (!imageUrl) return;
    Image.prefetch(imageUrl)
      .then(() => {
        setImageLoaded(true);
      })
      .catch((error) => {
        console.error('Failed to prefetch image', error);
      });
  }, []);

  const handlePress = (): void => {
    // @ts-expect-error navigate need definition
    navigation.navigate('CityEventsDetails', { eventId: id });
  };

  return (
    imageLoaded &&
    (large ? (
      <Pressable style={styles.card} onPress={handlePress}>
        <ImageBackground
          style={styles.cardImage}
          source={{
            uri: imageUrl
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
              {title ?? ''}
            </TextItem>
            <TextItem
              weight="regular"
              style={{
                color: palette.whitePrimary
              }}
            >
              {nextTiming && timingEvent()}
              {/* {nextTiming && formatDate({ nextDate: nextTiming, period })} */}
            </TextItem>
          </LinearGradient>
          <LinearGradient colors={['transparent', 'rgba(0,0,0,1)']} style={styles.cardDescription}>
            {categories && (
              <View style={styles.cardDescriptionCategoriesContainer}>
                {categories
                  .slice(0, 3)
                  .sort((a, b) => {
                    if (!a || !b) return 0;
                    const aExistsInFiltered = filteredCategory?.includes(a.id) ? 1 : 0;
                    const bExistsInFiltered = filteredCategory?.includes(b.id) ? 1 : 0;
                    return bExistsInFiltered - aExistsInFiltered;
                  })
                  .map((category, index) => {
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
                            state={filteredCategory?.includes(category.id) ? 'active' : 'inactive'}
                          />
                        </Pressable>
                      );
                    }
                    return null;
                  })}
              </View>
            )}
            {shortDescription && (
              <TextItem style={styles.cardDescriptionText} numberOfLines={3}>
                {shortDescription}
              </TextItem>
            )}
          </LinearGradient>
        </ImageBackground>
      </Pressable>
    ) : (
      <Pressable style={styles.culturalEventsCard} onPress={handlePress}>
        <View style={styles.culturalEventsCardImageContainer}>
          <Image style={styles.culturalEventsCardImage} source={{ uri: imageUrl }} />
        </View>
        {firstCategory && (
          <TagItem
            title={t(firstCategory.translationKey) ?? ''}
            IconElt={CategoryIconElt}
            withText={withTagText}
            style={{
              position: 'absolute',
              top: 5
            }}
          />
        )}
        <View style={styles.culturalEventsCardDetails}>
          <TextItem size="md" weight="regular" numberOfLines={2} ellipsizeMode="tail">
            {title ?? ''}
          </TextItem>
          <View style={styles.culturalEventsCardDetailsDate}>
            <IconItem IconElt={Calendar} size="sm" stroke="light" />
            <TextItem style={styles.culturalEventsCardDetailsDateTitle} size="sm" weight="light">
              {nextTiming && timingEvent()}
            </TextItem>
          </View>
        </View>
      </Pressable>
    ))
  );
};
