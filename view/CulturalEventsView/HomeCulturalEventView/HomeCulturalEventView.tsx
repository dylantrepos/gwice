import { useCallback, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setRefetchHome } from "../../../reducers/generalReducer";
import { RootState } from "../../../store/store";
import { Dimensions, FlatList, Image, ImageBackground, Pressable, SectionList, View, ViewToken } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HeaderPage } from "../../../components/HeaderPage/HeaderPage";
import { SafeAreaView } from "react-native-safe-area-context";
import style from './HomeCulturalEventView.style';
import { Text } from "../../../components/Text/Text";
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from "react-native-gesture-handler";
import { eventsCategoryLille, formatTitle } from "../../../utils/culturalEvents";
import { LucideIcon } from "lucide-react-native";
import { ListCategoryItem } from "../../../types/CulturalEvents";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Poppins_400Regular, Poppins_600SemiBold } from "@expo-google-fonts/poppins";

type Props = {
  navigation: any;
  route: any;
}

type Comp = Record<string, JSX.Element>;

const labelsName = [
  'À la une',
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

const labels = labelsName.map((label) => {
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
  const Tab = createMaterialTopTabNavigator();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(setRefetchHome(true));
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView
      style={style.homeCulturalEvent}
    >
      <StatusBar style="auto" />
      <Header 
        navigation={navigation}
      />
      <CategoryListItem 
        categories={eventsCategoryLille}
      />
      <Tab.Navigator
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
      </Tab.Navigator>
    </SafeAreaView>
  )
}

const Title1View = () => {
  // Replace with your actual view
  return <Text>Title 1</Text>;
}

const Title2View = () => {
  // Replace with your actual view
  return <Text>Title 2</Text>;
}

const Title3View = () => {
  // Replace with your actual view
  return <Text>Title 3</Text>;
}

/*
 *
 * Components
 * 
 */

type CategoryListItemProps = {
  categories: ListCategoryItem[];
}

const CategoryListItem = ({
  categories
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
            <View style={style.category}>
              { TopIcon && 
                <TopIcon 
                  color={'white'} 
                  size={32} 
                  strokeWidth={1} 
                  style={style.categoryIcon}
                />
              }
              <Text 
                styles={style.categoryName}
                weight="500"
              >
                  {formatTitle(top.title)}
              </Text>
            </View>
            { bottom && (
              <View style={style.category}>
                { BottomIcon && 
                  <BottomIcon 
                    color={'white'} 
                    size={32} 
                    strokeWidth={1} 
                    style={style.categoryIcon}
                  />
                }
                <Text 
                  styles={style.categoryName}
                  weight="500"
                >
                    {formatTitle(bottom.title)}
                </Text>
              </View>
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

type HeaderProps = {
  navigation: any;
}

const Header = ({
  navigation
}: HeaderProps) => {

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