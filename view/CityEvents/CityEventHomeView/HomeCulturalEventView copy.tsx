import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setRefetchHome } from "../../../reducers/generalReducer";
import { RootState } from "../../../store/store";
import { Animated, Dimensions, Easing, FlatList, Image, ImageBackground, LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, SectionList, TouchableOpacity, View, ViewToken } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HeaderPage } from "../../../components/HeaderPage/HeaderPage";
import { SafeAreaView } from "react-native-safe-area-context";
import style from './CityEventHomeView.style';
import { Text } from "../../../components/Text/Text";
import { LinearGradient } from 'expo-linear-gradient';
import { eventsCategoryLille, formatTitle } from "../../../utils/events";
import { LucideIcon, Scroll } from "lucide-react-native";
import { ListCategoryItem } from "../../../types/Events";
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
  const { currentCity, refetchHome } = useSelector((state: RootState) => state.general);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const [filterCategory, setFilterCategory] = useState<string[]>([]);
  const scrollViewRef = useRef(null);

  // const Tab = createMaterialTopTabNavigator();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(setRefetchHome(true));
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const onSwipeLeft = () => {
    setActiveTab((old) => {
      if (old + 1 < labelsName.length) {
        return old + 1;
      }
      return old;
    })
  }

  const onSwipeRight = () => {
    setActiveTab((old) => {
      if (old - 1 >= 0) {
        return old - 1;
      }
      return old;
    })
  }

  const [scrollViewTop, setScrollViewTop] = useState(0);
  const [horizontalScrollViewTop, setHorizontalScrollViewTop] = useState(0);
  const [headerFixedPos, setHeaderFixedPos] = useState(0);

  const handleScrollViewLayout = (event: LayoutChangeEvent) => {
    setScrollViewTop(event.nativeEvent.layout.y);
  };

  const handleHorizontalScrollViewLayout = (event: LayoutChangeEvent) => {
    setHorizontalScrollViewTop(event.nativeEvent.layout.y);
  };

  useEffect(() => {
    if (scrollViewTop > 0 && horizontalScrollViewTop > 0) {
      setHeaderFixedPos(scrollViewTop + horizontalScrollViewTop);
    }
    console.log({ scrollViewTop, horizontalScrollViewTop });
  }, [scrollViewTop, horizontalScrollViewTop])

  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 50);
  

  const scrollYAnim = useRef(new Animated.Value(0)).current;
  const stickyHeaderHeight = 60;

  const [scrollY, setScrollY] = useState(-stickyHeaderHeight);
  const scrollYRef = useRef(scrollY);
  const [isSticky, setIsSticky] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  let timerId: NodeJS.Timeout | null = null;


  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;

    if (timerId ) {
      clearTimeout(timerId);
    }
  
    // Set a new timer
    timerId = setTimeout(() => {
      if (currentScrollY < scrollYRef.current) {
        console.log('Scroll to top');
        Animated.timing(scrollYAnim, {
          toValue: -stickyHeaderHeight,
          duration: 100, // Control the speed of the animation here
          useNativeDriver: true,
          easing: Easing.inOut(Easing.linear)
        }).start();
        setShowSticky(true);
      } else if (currentScrollY > scrollYRef.current) {
        Animated.timing(scrollYAnim, {
          toValue: 0,
          duration: 100, // Control the speed of the animation here
          useNativeDriver: true,
          easing: Easing.inOut(Easing.linear)
        }).start();
        setShowSticky(false);
        console.log('Scroll to bottom');
      }
    }, 1500);

    scrollYRef.current = currentScrollY;
    setScrollY(currentScrollY);
    const offsetY = event.nativeEvent.contentOffset.y;
    setIsSticky(offsetY >= horizontalScrollViewTop - 10); // Adjust this value as needed
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'red', height: Dimensions.get("screen").height, position: 'relative' }}>
      <SafeAreaView
        style={style.homeCulturalEvent}
      >
        <View style={{flex: 1, overflow: 'hidden'}}>
    { (isSticky) && (
      <Animated.View
      style={{
        ...style.stickyHeader,
        transform: [{ translateY: scrollYAnim }],
        height: stickyHeaderHeight,
        // top: headerFixedPos,
       }}
      >

       <Animated.ScrollView
       horizontal
       showsHorizontalScrollIndicator={false}
     >
         <View style={style.eventTempNavigator}>
           {labelsName.map((tab, index) => (
             <Pressable 
               key={tab} 
               onPress={() => setActiveTab(index)}
               style={style.eventTempNavigatorTab}
             >
               <Text 
                 weight={activeTab === index ? '600' : '400'}
                 styles={{ 
                   color: activeTab === index ? '#0D89CE' : '#BBBBBB',
                   fontSize: 18,
                 }}

               >
                 {tab}
               </Text>
             </Pressable>
           ))}
         </View>
       </Animated.ScrollView>
      </Animated.View>)
      }
    <ScrollView
          onScroll={ handleScroll}
          scrollEventThrottle={1000}
          onLayout={handleScrollViewLayout}
        >
        <StatusBar style="auto" />
        <PromoteEvent 
          navigation={navigation}
        />
        <CategoryListItem 
          categories={eventsCategoryLille}
          filterCategory={setFilterCategory}
          categoriesSelected={filterCategory}
        />

        <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        onLayout={handleHorizontalScrollViewLayout}
        style={[style.eventTempNavigatorScrollView]}
      >
          <View style={style.eventTempNavigator}>
            {labelsName.map((tab, index) => (
              <Pressable 
                key={tab} 
                onPress={() => setActiveTab(index)}
                style={style.eventTempNavigatorTab}
              >
                <Text 
                  weight={activeTab === index ? '600' : '400'}
                  styles={{ 
                    color: activeTab === index ? '#0D89CE' : '#BBBBBB',
                    fontSize: 18,
                  }}

                >
                  {tab}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
        <View
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onTouchCancel={onTouchEnd}
        >
          {activeTab === 0 && <Title1View/>}
          {activeTab === 1 && <Title2View />}
          {activeTab === 2 && <Title3View />}
          {activeTab === 3 && <Title3View />}
          {activeTab === 4 && <Title3View />}
          {activeTab === 5 && <Title3View />}
        </View>

        {/* <Tab.Navigator
          style={style.eventTempNavigator}
          screenOptions={({ route }) => ({
            // tabBarItemStyle: { width: 'auto' },
            // tabBarGap: 10,
            tabBarScrollEnabled: true,
            tabBarActiveTintColor: '#0D89CE',
            tabBarInactiveTintColor: '#BBBBBB',
            tabBarContentContainerStyle: { 
              // backgroundColor: 'powderblue',
              // paddingHorizontal: 20,
            },  
            tabBarIndicatorContainerStyle: {

            },
            tabBarItemStyle: {
              justifyContent: 'space-around',
              backgroundColor: 'transparent',
            },
            tabBarIndicatorStyle: { 
              backgroundColor: '#0D89CE',
              borderRadius: 10,
              height: 3,
            },
            tabBarPressColor: '#fff',
            tabBarStyle: { 
              backgroundColor: '#transparent',

            },
            tabBarPressOpacity: 0,
          })}
        >
          <Tab.Screen 
            name={'À la une'} 
            component={Title1View} 
            options={() => ({
              tabBarLabel: ({ color, focused }) => (
                <Text 
                  weight={'400'}
                  styles={{ 
                    color, 
                    fontSize: 16, 
                  }
                }>
                  À la une
                </Text>
              ),
            })}
          />
          { labels.map((label, index) => {
            return (
              <Tab.Screen 
                key={`label-${index}`}
                name={label.name} 
                component={label.component} 
                options={() => ({
                  tabBarLabel: ({ color, focused }) => (
                    <Text 
                      weight={'400'}
                      styles={{ 
                        color, 
                        fontSize: 16, 
                      }
                    }>
                      {label.name}
                    </Text>
                  ),
                })}
              />
            )
            })
          }
        </Tab.Navigator> */}
      </ScrollView>
      </View>
    </SafeAreaView>
      </View>
  )
}

const Title1View = () => {
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

const Title2View = () => {
  // Replace with your actual view
  return <View
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
                uri: 'https://lilleaddict.fr/wp-content/uploads/2024/01/fort-de-mons-1024x1024.jpeg'
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
        </View>;
}

const Title3View = () => {
  // Replace with your actual view
  return <View
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
                uri: 'https://lilleaddict.fr/wp-content/uploads/2024/01/playground--1024x1024.jpg'
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
        </View>;
}

/*
 *
 * Components
 * 
 */

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
  const splittedCategories = [];

  for (let i = 0; i < categories.length; i += 2) {
    const itemTop = categories[i];
    const itemBottom = i + 1 < categories.length ? categories[i + 1] : null;

    splittedCategories.push({
      top: itemTop,
      bottom: itemBottom,
    });
  }

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
    <Text 
      styles={style.categoryContainerTitle} weight="600"
    >
      Par thème
    </Text>
    <FlatList
      data={splittedCategories}
      horizontal
      keyExtractor={(item, index) => item.top.title + index}
      renderItem={({item}) => {
        const { top, bottom } = item;
        const TopIcon = top.iconElt;
        const BottomIcon = bottom ? bottom.iconElt : null;
        return (
          <View style={style.categoryList}>
            <Pressable 
              style={{
                ...style.category,
                backgroundColor: categoriesSelected.includes(top.title) ? '#1C1C1C' : '#F2F2F2',
              }}
              onPress={() => {
                handleToggleCategory(top.title)
                console.log('categoriesSelected.includes(top.title): ', categoriesSelected.includes(top.title));
                console.log('categories.length === 0: ', categories.length === 0);
              }}
            >
              { TopIcon && 
                <TopIcon 
                  color={categoriesSelected.includes(top.title) ? 'white' : 'black'} 
                  size={32} 
                  strokeWidth={1} 
                  style={style.categoryIcon}
                />
              }
              <Text 
                styles={{
                  ...style.categoryName,
                  color: categoriesSelected.includes(top.title) ? 'white' : 'black',
                }}
                weight="500"
              >
                  {formatTitle(top.title)}
              </Text>
            </Pressable>
            { bottom && (
              <Pressable 
                style={{
                  ...style.category,
                  backgroundColor: categoriesSelected.includes(bottom.title) ? '#1C1C1C' : '#F2F2F2',
                }}
                onPress={() => {
                  console.log('bottom.title: ', categoriesSelected.includes(bottom.title));
                  console.log('bottom.title: ', categoriesSelected.length < 1);
                  handleToggleCategory(bottom.title)
                }}
              >
                { BottomIcon && 
                  <BottomIcon 
                    color={categoriesSelected.includes(bottom.title) ? 'white' : 'black'} 
                    size={32} 
                    strokeWidth={1} 
                    style={style.categoryIcon}
                  />
                }
                <Text 
                  styles={{
                    ...style.categoryName,
                    color: categoriesSelected.includes(bottom.title) ? 'white' : 'black',
                  }}
                  weight="500"
                >
                    {formatTitle(bottom.title)}
                </Text>
              </Pressable>
            )}
          </View>
        )
      }}
      contentContainerStyle={{
        columnGap: 10,
        paddingHorizontal: 20,
      }}
      showsHorizontalScrollIndicator={false}
    />
  </View>
  )
}

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
            navigation={navigation}
            styles={style.header}
            titleStyles={style.headerTitle}
            iconColor="white"
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