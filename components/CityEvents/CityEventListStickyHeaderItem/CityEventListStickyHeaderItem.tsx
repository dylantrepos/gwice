import { Pressable, View } from "react-native";
import { Text } from "../../Text/Text";
import { CityEventListCategoryListItem } from "../CityEventListCategoryListItem/CityEventListCategoryListItem";
import { FilterDateItem, eventsCategoryLille } from "../../../utils/events";
import { CityEventListFilterItem } from "../CityEventListFilterItem/CityEventListFilterItem";
import style from './CityEventListStickyHeaderItem.style';
import { useEffect, useState } from "react";
import { Search } from "lucide-react-native";
import { TextInput } from "react-native-gesture-handler";

type StickyHeaderProps = {
  filteredCategoryIdList: number[];
  handleSetFilteredCategoryIdList: React.Dispatch<React.SetStateAction<number[]>>;
  startDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  endDate: Date;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
  selectedItemDate: FilterDateItem;
  setSelectedItemDate: React.Dispatch<React.SetStateAction<FilterDateItem>>;
  searchInput: string;
  handleSearchInput: (text: string) => void;
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
  searchInput,
  handleSearchInput,
}: StickyHeaderProps) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  const updateSearchValue = (newInput: string) => {
    setSearchValue(newInput);
  
    if (timerId) {
      clearTimeout(timerId);
    }
  
    setTimerId(
      setTimeout(() => {
        handleSearchInput(newInput);
        // Call your search function here
        // For example: performSearch(newInput);
      }, 300)
    );
  };


  return (
    <View
    style={{
      backgroundColor: 'white',
    }}
  >
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#f5f5f5',
        margin: 20,
        marginBottom: 10,
        borderRadius: 100,
        gap: 10,
      }}
    >
      <Search
        size={22}
        color="black"
        strokeWidth={2}
        style={style.searchEventIcon}
      />
      <TextInput
        style={{
          flex: 1,
          fontSize: 16,
          paddingTop: 0,
          paddingBottom: 0
        }}
        placeholder="Rechercher un événement"
        placeholderTextColor="#A0A0A0"
        inputMode="search"
        multiline={false}
        value={searchValue}
        onChangeText={updateSearchValue}
      />
    </View>
    <View
      style={style.categoryTitleContainer}
    >
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