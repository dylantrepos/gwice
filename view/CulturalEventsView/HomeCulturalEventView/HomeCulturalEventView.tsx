import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setRefetchHome } from "../../../reducers/generalReducer";
import { RootState } from "../../../store/store";
import { Animated, Dimensions, Easing, FlatList, Image, ImageBackground, LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent, Platform, Pressable, ScrollView, SectionList, TouchableOpacity, View, ViewToken } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HeaderPage } from "../../../components/HeaderPage/HeaderPage";
import { SafeAreaView } from "react-native-safe-area-context";
import style from './HomeCulturalEventView.style';
import { Text } from "../../../components/Text/Text";
import { LinearGradient } from 'expo-linear-gradient';
import { eventsCategoryLille, formatTitle } from "../../../utils/culturalEvents";
import { CalendarDays, ChevronDown, Euro, Filter, LucideIcon, Scroll, Search } from "lucide-react-native";
import { ListCategoryItem } from "../../../types/CulturalEvents";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Poppins_400Regular, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import { useSwipe } from "../../../hooks/useSwap";

type Props = {
  navigation: any;
  route: any;
}

type Comp = Record<string, JSX.Element>;

const labelsName = [
  'A la une',
  'Aujourd\'hui',
  'Ce week-end',
  'Cette semaine',
  'Ce mois-ci',
  'Cette année'
];

const titleComp = (title: string) => {
  return (
    () => <Text>{title}</Text>
  )
}

const labels = labelsName.map((label, index) => {
  return {
    name: label,
    component: titleComp(label)
  }
});


export const HomeCulturalEventView = ({
  navigation,
  route
}: Props) => {
  const [refreshing, setRefreshing] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string[]>([]);
  const dispatch = useDispatch();

  // const Tab = createMaterialTopTabNavigator();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(setRefetchHome(true));
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'red', height: Dimensions.get("screen").height, position: 'relative' }}>
      <SafeAreaView
        style={style.homeCulturalEvent}
      >
        <Animated.ScrollView
          stickyHeaderHiddenOnScroll={true}
          stickyHeaderIndices={[3]}
        >
          <PromoteEvent 
            navigation={navigation}
          />
          <SearchEventItem />
            <Text 
              styles={style.categoryContainerTitle} 
              weight="600"
            >
              Par thème
            </Text>

          <View
            style={{
              backgroundColor: 'white',
            }}
          >

            <CategoryListItem 
              categories={eventsCategoryLille}
              categoriesSelected={filterCategory}
              filterCategory={setFilterCategory}
            />
            <FilterListItem />
          </View>
          <CardsListItem />
        </Animated.ScrollView>
     </SafeAreaView>
    </View>
  )
}

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
            <Text
              styles={style.promoteEventButton}
            >
              Appuyez pour découvrir
            </Text>
          </LinearGradient>
        </ImageBackground>
      </Pressable>
)};


const CardsListItem = () => {
  // Replace with your actual view
  return (
    <View
      style={style.cardList}
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <View
          key={`card-${index}`}
        style={style.card}
      >
        <ImageBackground
          style={style.cardImage}
          source={{
            uri: 'https://lilleaddict.fr/wp-content/uploads/2024/02/gand-festival-lumieres-1024x900.jpeg'
          }}
        >
          <LinearGradient
            colors={['rgba(0,0,0,1)', 'transparent']}
            style={style.cardInfos}
          >
            <Text 
              styles={style.cardTitle}
              weight="700"
            >
              Événements du week-end
            </Text>
            <Text 
              styles={style.cardDate}
            >
              Du 31 jan. au 4 fév.
            </Text>
          </LinearGradient>
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,1)']}
          >
            <Text 
              styles={style.cardDescription} 
              numberOfLines={3}
            >
              Ce week-end ça envoie du lourd près de chez toi avec le festival des lumières de Gand, l’Enduropale, le Playground Market et un open air au Fort de Mons… Enfin bref, un bon gros programme que l’on t’explique par ici. 🙂
            </Text>
          </LinearGradient>
        </ImageBackground>
      </View>
      ))}
    </View>
  );
}

type CategoryListItemProps = {
  categories: ListCategoryItem[];
  categoriesSelected: string[];
  filterCategory: React.Dispatch<React.SetStateAction<string[]>>
}

const CategoryListItem = ({
  categories,
  categoriesSelected,
  filterCategory
}: CategoryListItemProps) => {

  const handleToggleCategory = (category: string) => {
    const index = categoriesSelected.indexOf(category);
    if (index === -1) {
      filterCategory([...categoriesSelected, category]);
      console.log('categoriesSelected: added');
    } else {
      filterCategory(categoriesSelected.filter((cat) => cat !== category));
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
          paddingHorizontal: 20,
        }}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => item.title + index}
        renderItem={({item}) => {
          const { title, iconElt: IconElt } = item;

          return (
            <Pressable 
              style={style.category}
              onPress={() => {
                handleToggleCategory(title);
              }}
            >
              { IconElt && (
                  <View
                    style={{
                      backgroundColor: categoriesSelected.includes(title) ? '#0D89CE' : 'transparent',
                      borderRadius: 100,
                      padding: 10,
                      ...Platform.select({
                        ios: {
                          shadowOffset: {
                            width: 0,
                            height: 9,
                          },
                          shadowOpacity: categoriesSelected.includes(title) ? 0.50 : 0,
                          shadowRadius: 12.35,
                        },
                        android: {
                          elevation: categoriesSelected.includes(title) ? 5 : 0,
                        },
                      }),
                    }}
                    >
                    <IconElt 
                      color={categoriesSelected.includes(title) ? 'white' : 'black'} 
                      size={40} 
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
