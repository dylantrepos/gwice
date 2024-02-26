import style from './CityEventListStickyHeaderItem.style';

import { Pressable, View, Animated, Keyboard, TextInput } from "react-native";
import { CityEventListCategoryListItem } from "../CityEventListCategoryListItem/CityEventListCategoryListItem";
import { CityEventListFilterItem } from "../CityEventListFilterItem/CityEventListFilterItem";
import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react-native";
import { eventsCategoryLille } from "../../utils/events";
import { TextItem } from "../../../../components/TextItem/TextItem";
import { SearchBarItem } from '../../../../components/SearchBarItem/SearchBarItem';
import { RootState } from '../../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { setIsSearchInputFocused, setSearchValue } from '../../../../reducers/eventReducer';
import { THEME } from '../../../../assets/palette';
import { useTranslation } from 'react-i18next';
import { FilterDateItem } from '../../utils/date';

type StickyHeaderProps = {
  filteredCategoryIdList: number[];
  handleSetFilteredCategoryIdList: React.Dispatch<React.SetStateAction<number[]>>;
  selectedItemDate: FilterDateItem;
  setSelectedItemDate: React.Dispatch<React.SetStateAction<FilterDateItem>>;
};

export const CityEventListStickyHeaderItem = ({
  filteredCategoryIdList,
  handleSetFilteredCategoryIdList,
  selectedItemDate,
  setSelectedItemDate,
}: StickyHeaderProps) => {
  const { searchValue } = useSelector((state: RootState) => state.eventReducer);  
  const { theme } = useSelector((state: RootState) => state.generalReducer);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  
  const handleSubmitSearchValue = (newSearchValue: string) => {
    dispatch(setSearchValue(newSearchValue));
  }

  const handleUpdateIsSearchInputFocused = (isFocused: boolean) => {
    dispatch(setIsSearchInputFocused(isFocused));
  }

  return (
    <View
      style={{
        backgroundColor: THEME.background[theme] as string,
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
    </View>)
}