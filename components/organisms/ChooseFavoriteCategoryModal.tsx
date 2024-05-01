import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import { useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import { type CategoryItem } from '../../features/CityEvents/types/CityEvent';
import { allEventsCategoryLille } from '../../features/CityEvents/utils/events';
import styles from '../../styles/components/organisms/ChooseLanguageModal.style';
import palette from '../../theme/palette';
import { formatTitle } from '../../utils/events';
import { IconItem } from '../atoms/IconItem';
import { TextItem } from '../atoms/TextItem';
import { BottomSheetItem } from '../molecules/BottomSheetItem';

interface FilterFavoriteCategoryModalProps {
  isPopinVisible: boolean;
  setIsPopinVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: (categories: CategoryItem[]) => void;
}

export const ChooseFavoriteCategoryModal = ({
  isPopinVisible,
  setIsPopinVisible,
  onConfirm
}: FilterFavoriteCategoryModalProps): ReactNode => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem[]>([]);
  const [currSelectedCategory, setCurrSelectedCategory] =
    useState<CategoryItem[]>(selectedCategory);
  const [sortedCategories, setSortedCategories] = useState<CategoryItem[]>(allEventsCategoryLille);
  const { colors } = useTheme();

  const handleClose = (): void => {
    setIsPopinVisible(false);
    setSelectedCategory(currSelectedCategory);
    setSortedCategories(() =>
      allEventsCategoryLille.sort((a, b) => {
        const isSelectedA = isSelected(a);
        const isSelectedB = isSelected(b);
        if (isSelectedA && !isSelectedB) {
          return -1;
        }
        if (!isSelectedA && isSelectedB) {
          return 1;
        }
        return t(a.translationKey).localeCompare(t(b.translationKey));
      })
    );
    setCurrSelectedCategory(selectedCategory);
    onConfirm(currSelectedCategory);
  };

  // @ts-expect-error-next-line
  const handleConfirm = async (): void => {
    handleClose();
  };

  const isSelected = (category: CategoryItem): boolean =>
    currSelectedCategory.find((cat) => cat.id === category.id) !== undefined;

  const handleToggleCategory = (category: CategoryItem): void => {
    if (isSelected(category)) {
      setCurrSelectedCategory(currSelectedCategory.filter((cat) => cat.id !== category.id));
    } else {
      setCurrSelectedCategory([...currSelectedCategory, category]);
    }
  };

  const handleDismissModal = (): void => {
    setCurrSelectedCategory(selectedCategory);
  };

  return (
    <BottomSheetItem
      title={t('screens.settingsHome.text.preferredEventsCategoriesTitle')}
      visible={isPopinVisible}
      setVisibility={setIsPopinVisible}
      handleConfirm={handleConfirm}
      disableConfirm={false}
      handleClose={handleClose}
      styles={styles.bottomSheetContainer}
      dynamicSize={false}
      handleDismiss={handleDismissModal}
    >
      <BottomSheetScrollView
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          paddingBottom: 20
        }}
      >
        {sortedCategories.map((category, key) => (
          <Pressable
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 10,
              gap: 10
            }}
            onPress={() => {
              handleToggleCategory(category);
            }}
            key={`category-${key}`}
          >
            <View
              style={{
                padding: 5,
                borderRadius: 50,
                backgroundColor: isSelected(category)
                  ? palette.purple400
                  : colors.cityEventCategoryListBackgroundColor
              }}
            >
              <IconItem
                color={
                  isSelected(category)
                    ? colors.cityEventCategoryListIconSelectedColor
                    : colors.cityEventCategoryListIconColor
                }
                size="md"
                IconElt={category.iconElt}
              />
            </View>
            <TextItem size="md" weight="regular">
              {formatTitle(t(category.title ?? ''))}
            </TextItem>
          </Pressable>
        ))}
      </BottomSheetScrollView>
    </BottomSheetItem>
  );
};
