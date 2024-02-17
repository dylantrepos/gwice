import style from './CityEventListStickyHeaderItem.style';

import { Pressable, View, Animated, Keyboard, TextInput } from "react-native";
import { CityEventListCategoryListItem } from "../CityEventListCategoryListItem/CityEventListCategoryListItem";
import { CityEventListFilterItem } from "../CityEventListFilterItem/CityEventListFilterItem";
import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react-native";
import { FilterDateItem, eventsCategoryLille } from "../../utils/events";
import { TextItem } from "../../../../components/TextItem/TextItem";
import { SearchBarItem } from '../../../../components/SearchBarItem/SearchBarItem';
import { RootState } from '../../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { setIsSearchInputFocused, setSearchValue } from '../../../../reducers/eventReducer';

type StickyHeaderProps = {
  filteredCategoryIdList: number[];
  handleSetFilteredCategoryIdList: React.Dispatch<React.SetStateAction<number[]>>;
  startDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  endDate: Date;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
  selectedItemDate: FilterDateItem;
  setSelectedItemDate: React.Dispatch<React.SetStateAction<FilterDateItem>>;
};

export const CityEventListStickyHeaderItem = ({
  filteredCategoryIdList,
  handleSetFilteredCategoryIdList,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  selectedItemDate,
  setSelectedItemDate,
}: StickyHeaderProps) => {
  const { searchValue } = useSelector((state: RootState) => state.eventReducer);  
  const dispatch = useDispatch();
  
  const handleSubmitSearchValue = (newSearchValue: string) => {
    dispatch(setSearchValue(newSearchValue));
  }

  const handleUpdateIsSearchInputFocused = (isFocused: boolean) => {
    dispatch(setIsSearchInputFocused(isFocused));
  }

  return (
    <View
      style={{
        backgroundColor: 'white',
      }}
    >
      <SearchBarItem
        placeholder="Rechercher un événement"
        searchValue={searchValue}
        handleSubmitSearchValue={handleSubmitSearchValue}
        handleIsFocused={handleUpdateIsSearchInputFocused}
      />
      <CityEventListCategoryListItem 
        categories={eventsCategoryLille}
        categoriesSelected={filteredCategoryIdList}
        filteredCategoryIdList={handleSetFilteredCategoryIdList}
      />
      <CityEventListFilterItem
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        selectedItemDate={selectedItemDate}
        setSelectedItemDate={setSelectedItemDate}
      />
    </View>)
}