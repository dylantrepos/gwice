import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import { useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { allEventsCategoryLille } from '../../features/CityEvents/utils/events';
import { setEventCategory } from '../../reducers/homeReducer';
import { type RootState } from '../../store/store';
import styles from '../../styles/components/organisms/ChooseLanguageModal.style';
import { formatTitle } from '../../utils/events';
import { IconItem } from '../atoms/IconItem';
import { TextItem } from '../atoms/TextItem';
import { BottomSheetItem } from '../molecules/BottomSheetItem';

interface FilterFavoriteCategoryModalProps {
  isPopinVisible: boolean;
  setIsPopinVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ChooseFavoriteCategoryModal = ({
  isPopinVisible,
  setIsPopinVisible
}: FilterFavoriteCategoryModalProps): ReactNode => {
  const { t } = useTranslation();
  const { eventCategory } = useSelector((state: RootState) => state.homeReducer);
  const [currSelectedCategory, setCurrSelectedCategory] = useState(eventCategory);
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const handleClose = (): void => {
    setIsPopinVisible(false);
  };

  // @ts-expect-error-next-line
  const handleConfirm = async (): void => {
    dispatch(setEventCategory(currSelectedCategory));
    handleClose();
  };

  const handleToggleCategory = (category: number): void => {
    if (currSelectedCategory.includes(category)) {
      setCurrSelectedCategory(currSelectedCategory.filter((cat) => cat !== category));
    } else {
      setCurrSelectedCategory([...currSelectedCategory, category]);
    }
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
      // withConfirm={false}
      stylesConfirmButton={
        {
          // marginTop: 40
          // position: 'absolute'
        }
      }
    >
      <BottomSheetScrollView
        contentContainerStyle={{
          // backgroundColor: 'blue',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          // gap: 20,
          paddingBottom: 20
        }}
      >
        {allEventsCategoryLille.map((category, key) => (
          <Pressable
            style={{
              width: '100%',
              flexDirection: 'row',
              // backgroundColor: 'red',
              alignItems: 'center',
              paddingVertical: 10,
              gap: 10
            }}
            onPress={() => {
              handleToggleCategory(category.id);
            }}
            key={`category-${key}`}
          >
            <View
              style={{
                // display: 'flex',
                // ...styles.iconContainer,
                padding: 5,
                borderRadius: 50,
                backgroundColor: currSelectedCategory.includes(category.id)
                  ? colors.cityEventCategoryListBackgroundSelectedColor
                  : colors.cityEventCategoryListBackgroundColor
              }}
            >
              <IconItem
                color={
                  currSelectedCategory.includes(category.id)
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
