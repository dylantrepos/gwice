import style from './CityEventListStickyHeaderItem.style';

import { Pressable, View, Animated, Keyboard, TextInput } from "react-native";
import { CityEventListCategoryListItem } from "../CityEventListCategoryListItem/CityEventListCategoryListItem";
import { CityEventListFilterItem } from "../CityEventListFilterItem/CityEventListFilterItem";
import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react-native";
import { FilterDateItem, eventsCategoryLille } from "../../utils/events";
import { TextItem } from "../../../../components/TextItem/TextItem";

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
  isSearchInputFocused: boolean;
  setIsSearchInputFocused: React.Dispatch<React.SetStateAction<boolean>>;
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
  isSearchInputFocused,
  setIsSearchInputFocused
}: StickyHeaderProps) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [currSearchValue, setCurrSearchValue] = useState<string>('');
  const slideAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const inputRef =  useRef<TextInput | null>(null);

  // const updateSearchValue = (newInput: string) => {
  //   setSearchValue(newInput);
  
  //   if (timerId) {
  //     clearTimeout(timerId);
  //   }
  
  //   setTimerId(
  //     setTimeout(() => {
  //       handleSearchInput(newInput);
  //       // Call your search function here
  //       // For example: performSearch(newInput);
  //     }, 300)
  //   );
  // };

  const handleUpdateSearchValue = (newInput: string) => {
    setCurrSearchValue(newInput);
  }

  const clearSearchValue = () => {
    setCurrSearchValue('');

    console.log('Keyboard.isVisible : ', Keyboard.isVisible());
    if (!Keyboard.isVisible()) {
      handleSearchInput('');
    }
    // inputRef.current?.focus();
  };

  const handleSubmitSearchInput = () => {
    console.log('curr : ', currSearchValue);
    handleSearchInput(currSearchValue);
    Keyboard.dismiss();
  }

  useEffect(() => {
    Animated.timing(
      slideAnim,
      {
        toValue: (currSearchValue.length > 0) ? 1 : 0, 
        duration: 150, 
        useNativeDriver: true,
      }
    ).start();
  }, [currSearchValue, isFocused]);

  return (
    <View
    style={{
      backgroundColor: 'white',
    }}
  >
    <View
      style={style.searchEvent}
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
        blurOnSubmit={false}
        placeholder="Rechercher un événement"
        placeholderTextColor="#A0A0A0"
        inputMode="search"
        multiline={false}
        value={currSearchValue}
        onChangeText={handleUpdateSearchValue}
        onSubmitEditing={handleSubmitSearchInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        ref={inputRef}
      />
      <Animated.View
        style={{
          ...style.searchResetIcon,
          transform: [{
            translateX: slideAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [100, 0] // replace -100 with the actual out position
            })
          }]
        }}
      >
        <Pressable 
          onPress={clearSearchValue}
        >
          <X
            size={22}
            color="black"
            strokeWidth={2}
          />
        </Pressable>
      </Animated.View>
    </View>
    <View
      style={style.categoryTitleContainer}
    >
    { filteredCategoryIdList.length > 0 && (
      <Pressable
        onPress={() => handleSetFilteredCategoryIdList([])}
        style={style.categoryContainerFilterButton}
      >
        <TextItem
          styles={style.categoryContainerFilterText} 
          weight="500"
        >
          Tout supprimer
        </TextItem>
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