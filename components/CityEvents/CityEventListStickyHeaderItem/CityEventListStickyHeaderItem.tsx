import { Pressable, View } from "react-native";
import { Text } from "../../Text/Text";
import { CityEventListCategoryListItem } from "../CityEventListCategoryListItem/CityEventListCategoryListItem";
import { FilterDateItem, eventsCategoryLille } from "../../../utils/events";
import { CityEventListFilterItem } from "../CityEventListFilterItem/CityEventListFilterItem";
import style from './CityEventListStickyHeaderItem.style';
import { useEffect } from "react";

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
  setSelectedItemDate
}: StickyHeaderProps) => {

  return (
    <View
    style={{
      backgroundColor: 'white',
      paddingTop: 20,
    }}
  >
     <View
      style={style.categoryTitleContainer}
     >
      <Text 
        styles={style.categoryContainerTitle} 
        weight="600"
      >
        Par thème
      </Text>
      { filteredCategoryIdList.length > 0 && (
        <Pressable
          onPress={() => handleSetFilteredCategoryIdList([])}
          style={style.categoryContainerFilterButton}
        >
          <Text
            styles={style.categoryContainerFilterText} 
            weight="500"
          >
            Tout supprimer
          </Text>
        </Pressable>
      )}
     </View>
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