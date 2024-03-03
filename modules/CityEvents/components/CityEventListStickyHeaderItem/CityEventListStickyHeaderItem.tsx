import { type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { THEME } from '../../../../assets/theme';
import { SearchBarItem } from '../../../../components/SearchBarItem/SearchBarItem';
import { setIsSearchInputFocused, setSearchValue } from '../../../../reducers/eventReducer';
import { type RootState } from '../../../../store/store';
import { type FilterDateItem } from '../../utils/date';
import { eventsCategoryLille } from '../../utils/events';
import { CityEventListCategoryListItem } from '../CityEventListCategoryListItem/CityEventListCategoryListItem';
import { CityEventListFilterItem } from '../CityEventListFilterItem/CityEventListFilterItem';

interface StickyHeaderProps {
  filteredCategoryIdList: number[];
  handleSetFilteredCategoryIdList: React.Dispatch<React.SetStateAction<number[]>>;
  selectedItemDate: FilterDateItem;
  setSelectedItemDate: React.Dispatch<React.SetStateAction<FilterDateItem>>;
}

export const CityEventListStickyHeaderItem = ({
  filteredCategoryIdList,
  handleSetFilteredCategoryIdList,
  selectedItemDate,
  setSelectedItemDate
}: StickyHeaderProps): ReactNode => {
  const { searchValue } = useSelector((state: RootState) => state.eventReducer);
  const { theme } = useSelector((state: RootState) => state.generalReducer);
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
        backgroundColor: THEME.style.viewBackground[theme]
      }}
    >
      <SearchBarItem
        placeholder={t('screens.events.text.searchBarPlaceholder')}
        searchValue={searchValue}
        handleSubmitSearchValue={handleSubmitSearchValue}
        handleIsFocused={handleUpdateIsSearchInputFocused}
      />
      <CityEventListCategoryListItem
        categories={eventsCategoryLille}
        categoriesSelected={filteredCategoryIdList}
        filteredCategoryIdList={handleSetFilteredCategoryIdList}
      />
      <CityEventListFilterItem />
    </View>
  );
};
