import { useTheme } from '@react-navigation/native';
import { type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { View, type ViewProps, type ViewStyle } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { eventsCategoryLille } from '../../../modules/CityEvents/utils/events';
import { setIsSearchInputFocused, setSearchValue } from '../../../reducers/eventReducer';
import { type RootState } from '../../../store/store';
import { type FilterDateItem } from '../../../utils/date';
import { CityEventListCategoryListItem } from '../CityEventListCategoryListItem/CityEventListCategoryListItem';
import { CityEventListFilterItem } from '../CityEventListFilterItem/CityEventListFilterItem';

interface StickyHeaderProps extends ViewProps {
  filteredCategoryIdList: number[];
  handleSetFilteredCategoryIdList: React.Dispatch<React.SetStateAction<number[]>>;
  selectedItemDate: FilterDateItem;
  setSelectedItemDate: React.Dispatch<React.SetStateAction<FilterDateItem>>;
  styles?: ViewStyle;
}

export const CityEventListStickyHeaderItem = ({
  filteredCategoryIdList,
  handleSetFilteredCategoryIdList,
  selectedItemDate,
  setSelectedItemDate,
  onLayout,
  styles
}: StickyHeaderProps): ReactNode => {
  const { searchValue } = useSelector((state: RootState) => state.eventReducer);
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleSubmitSearchValue = (newSearchValue: string): void => {
    dispatch(setSearchValue(newSearchValue));
  };

  const handleUpdateIsSearchInputFocused = (isFocused: boolean): void => {
    dispatch(setIsSearchInputFocused(isFocused));
  };

  return (
    <View
      style={{
        backgroundColor: colors.background,
        ...styles
      }}
      onLayout={onLayout}
    >
      {/* <SearchBarItem
        placeholder={t('screens.events.text.searchBarPlaceholder')}
        searchValue={searchValue}
        handleSubmitSearchValue={handleSubmitSearchValue}
        handleIsFocused={handleUpdateIsSearchInputFocused}
      /> */}
      <CityEventListCategoryListItem
        categories={eventsCategoryLille}
        categoriesSelected={filteredCategoryIdList}
        filteredCategoryIdList={handleSetFilteredCategoryIdList}
      />
      <CityEventListFilterItem />
    </View>
  );
};
