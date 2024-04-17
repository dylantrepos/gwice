import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar } from 'lucide-react-native';
import { type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ImageBackground, Pressable, View } from 'react-native';
import { IconItem } from '../../../../components/atoms/IconItem';
import { TagItem } from '../../../../components/atoms/TagItem';
import { TextItem } from '../../../../components/atoms/TextItem';
import { useLoadImage } from '../../../../hooks/useLoadImage';
import palette from '../../../../theme/palette';
import styles from '../../styles/molecules/EventCardItem.style';
import { type SmallEventCardProps } from '../../types/EventCardItem.type';
import { type CityEventReturn } from '../../types/EventTest';
import { type RootStackParamList } from '../../types/Navigation.type';
import { allEventsCategoryLille, getNextTimingFormatted } from '../../utils/events';

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

  if (!id || !title || !imageUrl || !category || !shortDescription || !nextTiming) {
    return;
  }

  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'CityEventsDetails'>>();
  const imageLoaded = useLoadImage(imageUrl);

  const categories = category.map((categoryId) =>
    allEventsCategoryLille.find((category) => category.id === categoryId.open_agenda_id)
  );
  const firstCategory = categories[0];
  const CategoryIconElt = firstCategory?.iconElt ?? null;
  const timingEvent = getNextTimingFormatted(nextTiming.begin, nextTiming.end, period);

  if (!firstCategory || !CategoryIconElt) return;

  const thirdFirstCategories = categories.slice(0, 3).sort((a, b) => {
    if (!a || !b) return 0;
    const aExistsInFiltered = filteredCategory?.includes(a.id) ? 1 : 0;
    const bExistsInFiltered = filteredCategory?.includes(b.id) ? 1 : 0;
    return bExistsInFiltered - aExistsInFiltered;
  });

  const handlePress = (): void => {
    navigation.navigate('CityEventsDetails', { eventId: id });
  };

  if (!imageLoaded) return;

  if (large) {
    return (
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
              {title}
            </TextItem>
            <TextItem
              weight="regular"
              style={{
                color: palette.whitePrimary
              }}
            >
              {timingEvent}
            </TextItem>
          </LinearGradient>
          <LinearGradient colors={['transparent', 'rgba(0,0,0,1)']} style={styles.cardDescription}>
            {
              <View style={styles.cardDescriptionCategoriesContainer}>
                {thirdFirstCategories.map((category, index) => {
                  if (category && onTagPressed) {
                    return (
                      <Pressable
                        key={index}
                        onPress={() => {
                          onTagPressed(category.id);
                        }}
                      >
                        <TagItem
                          title={t(category.translationKey) ?? ''}
                          IconElt={category.iconElt}
                          state={filteredCategory?.includes(category.id) ? 'active' : 'inactive'}
                        />
                      </Pressable>
                    );
                  }
                  return null;
                })}
              </View>
            }
            {
              <TextItem style={styles.cardDescriptionText} numberOfLines={3}>
                {shortDescription}
              </TextItem>
            }
          </LinearGradient>
        </ImageBackground>
      </Pressable>
    );
  } else {
    return (
      <SmallEventCard
        handlePress={handlePress}
        imageUrl={imageUrl}
        firstCategory={firstCategory}
        CategoryIconElt={CategoryIconElt}
        withTagText={withTagText}
        title={title}
        nextTiming={nextTiming}
        timingEvent={timingEvent}
      />
    );
  }
};

const SmallEventCard = ({
  handlePress,
  imageUrl,
  firstCategory,
  CategoryIconElt,
  withTagText,
  title,
  nextTiming,
  timingEvent
}: SmallEventCardProps): ReactNode => {
  const { t } = useTranslation();
  return (
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
            {nextTiming && timingEvent}
          </TextItem>
        </View>
      </View>
    </Pressable>
  );
};
