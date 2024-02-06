import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from 'react-redux';
import { setRefetchCityEventHome } from "../../../reducers/generalReducer";
import { Animated, Dimensions, FlatList, Image, ImageBackground, Platform, Pressable, ScrollView, View, VirtualizedList } from "react-native";
import { HeaderPage } from "../../../components/HeaderPage/HeaderPage";
import { SafeAreaView } from "react-native-safe-area-context";
import style from './CityEventHomeView.style';
import { Text } from "../../../components/Text/Text";
import { LinearGradient } from 'expo-linear-gradient';
import { eventsCategoryLille, formatTitle } from "../../../utils/events";
import { CalendarDays, ChevronDown, Euro, Eye, Filter, Search } from "lucide-react-native";
import { CityEventCard, ListCategoryItem } from "../../../types/Events";
import { GestureHandlerRootView, RefreshControl } from "react-native-gesture-handler";
import { useGetCityEvents } from "../../../hooks/useGetCityEvents";
import { CityEventCardLargeItem } from "../../../components/CityEvents/CityEventCardItem/CityEventCardItem";
import { WarningScreenItem } from "../../../components/WarningScreenItem/WarningScreenItem";


type HeaderListProps = {
  navigation: any;
}

const HeaderList = ({
  navigation,
}: HeaderListProps) => {

  return  ( <>
    <PromoteEvent 
      navigation={navigation}
    />
    <SearchEventItem />
  </>)
}

type StickyHeaderProps = {
  filteredCategoryIdList: number[];
  handleSetFilteredCategoryIdList: React.Dispatch<React.SetStateAction<number[]>>;
};

const StickyHeader = ({
  filteredCategoryIdList,
  handleSetFilteredCategoryIdList
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
    <CategoryListItem 
      categories={eventsCategoryLille}
      categoriesSelected={filteredCategoryIdList}
      filteredCategoryIdList={handleSetFilteredCategoryIdList}
    />
    <FilterListItem />
  </View>)
}


type Props = {
  navigation: any;
  route: any;
}


export const CityEventHomeView = ({
  navigation,
  route
}: Props) => {
  const [refreshing, setRefreshing] = useState(false);
  const [eventList, setEventList] = useState<CityEventCard[]>([]);
  const [filteredCategoryIdList, setFilteredCategoryIdList] = useState<number[]>([]);
  const [nextEventPageIds, setNextEventPageIds] = useState<(string | number)[]>();
  const dispatch = useDispatch();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(setRefetchCityEventHome(true));
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const {
    isLoading, 
    events, 
    isError
  } = useGetCityEvents({
    refetchCityEventHome: refreshing, 
    categoryIdList: filteredCategoryIdList,
    nextEventPageIds
  });

  
  useEffect(() => { 
    // console.log('events changed : ', events.events);
    if (!isLoading && events) {
      console.log('events.events updated ');
      setEventList((old) => ([
        ...old,
        ...events.events
      ]));
    }
  }, [events]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'red', height: Dimensions.get("screen").height, position: 'relative' }}>
        <SafeAreaView
          style={style.homeCulturalEvent}
        >
          <VirtualizedList
            removeClippedSubviews={false}
            data={[
                  <StickyHeader 
                    filteredCategoryIdList={filteredCategoryIdList}
                    handleSetFilteredCategoryIdList={setFilteredCategoryIdList}

                    />, 
                  ...eventList
                ]}
            // initialNumToRender={5}
            disableVirtualization
            showsVerticalScrollIndicator={false}
            getItem={(data, index) => data[index]}
            getItemCount={(data) => data?.length}
            stickyHeaderHiddenOnScroll={true}
            stickyHeaderIndices={[1]}
            refreshControl={
              <RefreshControl 
                refreshing={refreshing} onRefresh={onRefresh} 
              />
            }
            onEndReachedThreshold={2}
            onEndReached={() => {
              if (events?.after) {
                setNextEventPageIds(events.after);
              }
            }}
            ListHeaderComponent={
              <HeaderList 
                navigation={navigation} 
              />
            }
            ListEmptyComponent={
              <WarningScreenItem 
                type={isLoading ? 'loader' : 'error'} 
              />
            }
            
            renderItem={({item, index}) => {
              // check if the item is the sticky header
              console.log('item: ', index === 0 ? 'sticky header ------------' : item.title);
              return index === 0 ? item : (
                <CityEventCardLargeItem 
                  navigation={navigation}
                  route={route}
                  event={item as CityEventCard}
                />
              )
            }}
            keyExtractor={(item, index) => `${(item as CityEventCard)?.uid?.toString()}-${index}` ?? `${item}-header-${index}`}
          />
      </SafeAreaView>
      </View>
    </GestureHandlerRootView>
  )
}

 /*
  *
  * Components
  * 
  */
type PromoteEventProps = {
  navigation: any;
}

const PromoteEvent = ({
  navigation
}: PromoteEventProps) => {

  const handlePressPromoteEvent = () => {
    console.log('Promote pressed!');
  }

  return (
    <Pressable
        onPress={handlePressPromoteEvent}
        style={style.promoteEvent}
        >
        <ImageBackground
          style={style.promoteEventImage}
          source={{
            uri: 'https://lilleaddict.fr/wp-content/uploads/2024/02/gand-festival-lumieres-1024x900.jpeg'
          }} 
        >
          <HeaderPage 
            title={'Événements'}
            // navigation={navigation}
            styles={style.header}
            titleStyles={style.headerTitle}
            // iconColor="white"
          />
          <LinearGradient 
            colors={['transparent', 'rgba(0,0,0,1)']}
            style={style.promoteEventInfos}
          >
            <Text
              styles={style.promoteEventDate}
            >
              Du 31 jan. au 4 fév.
            </Text>
            <Pressable
              style={style.promoteEventButton}
            >
              <Text
                styles={style.promoteEventButtonText}
              >
                Appuyez pour découvrir
              </Text>
            </Pressable>
          </LinearGradient>
        </ImageBackground>
      </Pressable>
)};


const SearchEventItem = () => {
  return (
    <Pressable
      style={style.searchEvent}
    >
      <Search
        size={22}
        color="black"
        strokeWidth={2}
        style={style.searchEventIcon}
      />
      <Text
        styles={style.searchEventTitle}
      >
        Rechercher un événement
      </Text>
    </Pressable>
  )
}


type CategoryListItemProps = {
  categories: ListCategoryItem[];
  categoriesSelected: number[];
  filteredCategoryIdList: React.Dispatch<React.SetStateAction<number[]>>
}

const CategoryListItem = ({
  categories,
  categoriesSelected,
  filteredCategoryIdList
}: CategoryListItemProps) => {

  const handleToggleCategory = (categoryId: number) => {
    const index = categoriesSelected.indexOf(categoryId);
    if (index === -1) {
      filteredCategoryIdList([...categoriesSelected, categoryId]);
      console.log('categoriesSelected: added');
    } else {
      filteredCategoryIdList(categoriesSelected.filter((cat) => cat !== categoryId));
      console.log('categoriesSelected: removed');
    }
  }

  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);


  return (
    <View
      style={style.categoryContainer}
    >
      <FlatList
        data={categories}
        horizontal
        contentContainerStyle={{
          columnGap: 10,
        }}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => item.title + index}
        renderItem={({item}) => {
          const { title, id, iconElt: IconElt } = item;

          return (
            <Pressable 
              style={style.category}
              onPress={() => {
                handleToggleCategory(id);
              }}
            >
              { IconElt && (
                  <View
                    style={{
                      backgroundColor: categoriesSelected.includes(id) ? '#0D89CE' : 'transparent',
                      borderRadius: 100,
                      padding: 10,
                      ...Platform.select({
                        ios: {
                          shadowOffset: {
                            width: 0,
                            height: 9,
                          },
                          shadowOpacity: categoriesSelected.includes(id) ? 0.20 : 0,
                          shadowRadius: 12.35,
                        },
                        android: {
                          elevation: categoriesSelected.includes(id) ? 5 : 0,
                        },
                      }),
                    }}
                    >
                    <IconElt 
                      color={categoriesSelected.includes(id) ? 'white' : 'black'} 
                      size={34} 
                      strokeWidth={1} 
                      style={style.categoryIcon}
                      />
                  </View>
              )}
              <Text 
                styles={{
                  ...style.categoryName,
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                  lineHeight: 23,
                }}
                weight="500"
              >
                  {formatTitle(title)}
              </Text>
            </Pressable>
          )
        }}
      />
  </View>
  )
}

const FilterListItem = () => {
  // Replace with your actual view
  return (
    <ScrollView
      style={style.filterList}
      horizontal
      contentContainerStyle={{
        paddingHorizontal: 20,
        gap: 10,
      }}
      showsHorizontalScrollIndicator={false}
    >
      <View
        style={style.filter}
      >
        <CalendarDays
          size={22}
          color="black"
          strokeWidth={2}
          style={style.filterIcon}
        />
        <Text 
          styles={style.filterTitle}
        >
          Cette semaine
        </Text>
        <ChevronDown
          size={22}
          color="black"
          strokeWidth={2}
          style={style.filterIcon}
        />
      </View>
      <View
        style={style.filter}
      >
        <Euro
          size={22}
          color="black"
          strokeWidth={2}
          style={style.filterIcon}
        />
        <Text 
          styles={style.filterTitle}
        >
          Tous les prix
        </Text>
        <ChevronDown
          size={22}
          color="black"
          strokeWidth={2}
          style={style.filterIcon}
        />
      </View>
      <View
        style={style.filter}
      >
        <Filter
          size={22}
          color="black"
          strokeWidth={2}
          style={style.filterIcon}
        />
        <Text 
          styles={style.filterTitle}
        >
          Trier par
        </Text>
        <ChevronDown
          size={22}
          color="black"
          strokeWidth={2}
          style={style.filterIcon}
        />
      </View>
    </ScrollView>
  );
}
