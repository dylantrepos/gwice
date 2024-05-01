import { CalendarDays, Euro, MapPin, PartyPopper, Search, X } from 'lucide-react-native';
import { useRef, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Pressable, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { IconItem } from '../../../../components/atoms/IconItem';
import { TextItem } from '../../../../components/atoms/TextItem';
import { type RootState } from '../../../../store/store';
import style from '../../styles/organisms/CityEventListFilterItem.style';

import { useTheme } from '@react-navigation/native';
import { FilterItem, FilterType } from '../../../../components/atoms/FilterItem';
import { ChooseFavoriteCategoryModal } from '../../../../components/organisms/ChooseFavoriteCategoryModal';
import { setCategoriesId, setSearchValue } from '../../../../reducers/eventReducer';
import { PERIODS } from '../../../../types/Date';
import { type CategoryItem } from '../../types/CityEvent';
import { TypeTitle } from '../../types/Constant';
import { FilterDateModal } from './CityEventPeriodModal';

interface CityEventListFilterItemProps {
  currentTab: TypeTitle;
}

export const CityEventListFilterItem = ({
  currentTab
}: CityEventListFilterItemProps): ReactNode => {
  // Replace with your actual view
  const [isPopinVisible, setIsPopinVisible] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;
  const { searchValue, categoriesId, currentPeriod } = useSelector(
    (state: RootState) => state.eventReducer
  );
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const { t } = useTranslation();

  const handlePopin = (): void => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      delay: 0,
      useNativeDriver: false
    }).start();

    setIsPopinVisible(true);
  };

  const handleClearSearch = (): void => {
    dispatch(setSearchValue(''));
  };

  const handleConfirm = (categories: CategoryItem[]): void => {
    console.log('handleConfirm : ', categories);
    dispatch(setCategoriesId(categories.map((category) => category.id)));
  };

  return (
    <>
      {currentTab !== TypeTitle.Current && (
        <FilterDateModal isPopinVisible={isPopinVisible} setIsPopinVisible={setIsPopinVisible} />
      )}
      <ChooseFavoriteCategoryModal
        isPopinVisible={showCategoryModal}
        setIsPopinVisible={setShowCategoryModal}
        onConfirm={handleConfirm}
      />

      <ScrollView
        style={style.filterList}
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 15,
          gap: 10
        }}
        showsHorizontalScrollIndicator={false}
      >
        {searchValue && (
          <Pressable
            style={{
              ...style.filter,
              backgroundColor: colors.cityEventSearchBarBackground,
              maxWidth: 250
            }}
            onPress={handleClearSearch}
          >
            <IconItem
              size="md"
              stroke="light"
              IconElt={Search}
              style={{ flex: 1 }}
              color={colors.cityEventSearchBarText}
            />
            <TextItem
              style={{
                ...style.filterTitle,
                flexShrink: 1
              }}
              ellipsizeMode="tail"
              numberOfLines={1}
              color={colors.cityEventSearchBarText}
            >
              {searchValue}
            </TextItem>
            <IconItem
              size="md"
              stroke="light"
              IconElt={X}
              style={{ flex: 1 }}
              color={colors.cityEventSearchBarText}
            />
          </Pressable>
        )}
        {currentTab !== TypeTitle.Current && (
          <FilterItem
            type={FilterType.CITY_EVENT}
            IconElt={CalendarDays}
            active={currentPeriod !== PERIODS.ALWAYS}
            title={t('generic.period')}
            handlePress={handlePopin}
          />
        )}
        <FilterItem
          type={FilterType.CITY_EVENT}
          IconElt={PartyPopper}
          active={categoriesId.length > 0}
          title={t('generic.category')}
          handlePress={() => {
            setShowCategoryModal(true);
          }}
        />
        <FilterItem
          type={FilterType.CITY_EVENT}
          IconElt={Euro}
          title={'Prix'}
          handlePress={() => {}}
        />
        <FilterItem
          type={FilterType.CITY_EVENT}
          IconElt={MapPin}
          title={'Distance'}
          handlePress={() => {}}
        />
      </ScrollView>
    </>
  );
};
