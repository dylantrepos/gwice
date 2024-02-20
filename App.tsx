import { NavigationContainer } from '@react-navigation/native';
import { HomeView } from './view/HomeView/HomeView';
import { StatusBar } from 'expo-status-bar';
import { Provider, useSelector } from 'react-redux'; // Import Provider
import { RootState, store } from './store/store';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChevronLeft, Home, Search, Settings } from 'lucide-react-native'
import { Pressable, SafeAreaView, StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';

// Views
import { SettingsWeatherView } from './view/SettingsView/SettingsWeatherView/SettingsWeatherView';
import { CityEventView } from './view/CityEvents/CityEventView/CityEventView';
import { CityEventHomeView } from './view/CityEvents/CityEventHomeView/CityEventHomeView';
import { SettingsHomeView } from './view/SettingsView/SettingsHomeView/SettingsHomeView';

import { Poppins_100Thin, Poppins_100Thin_Italic, Poppins_200ExtraLight, Poppins_200ExtraLight_Italic, Poppins_300Light, Poppins_300Light_Italic, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_500Medium, Poppins_500Medium_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic, Poppins_800ExtraBold, Poppins_800ExtraBold_Italic, Poppins_900Black, Poppins_900Black_Italic, useFonts } from "@expo-google-fonts/poppins";
import { WarningScreenItem } from './components/WarningScreenItem/WarningScreenItem';
import { BottomNavigationItem } from './components/BottomNavigationItem/BottomNavigationItem';
import { SettingsGeneralView } from './view/SettingsView/SettingsGeneralView/SettingsGeneralView';
import { IconItem } from './components/IconItem/IconItem';
import { TextItem } from './components/TextItem/TextItem';

const SettingStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

const SettingsScreens = () => {
  return (
    <SettingStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Settings" 
    >
      <SettingStack.Screen 
        name="Settings" 
        component={SettingsHomeView} 
        
      />
      <SettingStack.Screen 
        name="Weather" 
        component={SettingsWeatherView} 
      />
      <SettingStack.Screen 
        name="General" 
        component={SettingsGeneralView} 
      />
    </SettingStack.Navigator>
  )
}

const HomeScreens = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <HomeStack.Screen 
        name="Home" 
        component={HomeView}
      />
      <HomeStack.Screen 
        name="CulturalEvent" 
        component={CityEventView} 
        
      />
      <HomeStack.Screen 
        name="HomeCulturalEvent" 
        component={CityEventHomeView} 
        
      />
    </HomeStack.Navigator>
  )
}

export default function App() {
  const queryClient = new QueryClient();
  const Tab = createBottomTabNavigator();

  const iconSize = {
    height: 26,
    width: 26,
  }
  const tabStyle = {
    container: {
      backgroundColor: '#FFF',
      borderTopWidth: 1,
      borderTopColor: '#F6F6F6',
      elevation: 0,
      height: 60,
    } as StyleProp<ViewStyle>,
    label: {
      fontSize: 20,
      fontWeight: '400',
    } as StyleProp<TextStyle>,
  }

  const [fontsLoaded] = useFonts({
    Poppins_100: Poppins_100Thin,
    Poppins_100_Italic: Poppins_100Thin_Italic,
    Poppins_200: Poppins_200ExtraLight,
    Poppins_200_Italic: Poppins_200ExtraLight_Italic,
    Poppins_300: Poppins_300Light,
    Poppins_300_Italic: Poppins_300Light_Italic,
    Poppins_400: Poppins_400Regular,
    Poppins_400_Italic: Poppins_400Regular_Italic,
    Poppins_500: Poppins_500Medium,
    Poppins_500_Italic: Poppins_500Medium_Italic,
    Poppins_600: Poppins_600SemiBold,
    Poppins_600_Italic: Poppins_600SemiBold_Italic,
    Poppins_700: Poppins_700Bold,
    Poppins_700_Italic: Poppins_700Bold_Italic,
    Poppins_800Bold: Poppins_800ExtraBold,
    Poppins_800_Italic: Poppins_800ExtraBold_Italic,
    Poppins_900: Poppins_900Black,
    Poppins_900_Italic: Poppins_900Black_Italic,
  });

  if (!fontsLoaded) {
    return (
      <SafeAreaView>
        <View>
          <WarningScreenItem type='loader' />
        </View>
      </SafeAreaView>
    );
  };

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <StatusBar style='light' />
        <BottomNavigationItem 
          navigatorTabs={[
            {
              name: 'Home-tab',
              screenName: 'Home',
              icon: Home,
              screens: HomeScreens,
            },
            {
              name: 'Settings-tab',
              screenName: 'Settings',
              icon: Settings,
              screens: SettingsScreens,
            },
          ]}
        />
         <Tab.Screen 
              name="Home-tab" 
              options={{ 
                headerShown: false,
                tabBarLabel: () => null,
                tabBarIcon: ({ focused, color, size }) => 
                  <Home 
                    color={focused ? '#0D89CE' : 'gray'}
                    height={iconSize.height}
                    width={iconSize.width}
                  />
                ,
              }}
              listeners={({ navigation }) => ({
                tabPress: event => {
                  event.preventDefault();
                  navigation.navigate('Home-tab', { screen: 'Home' });
                },
              })}
            >
              {HomeScreens}
            </Tab.Screen>
      </QueryClientProvider>
    </Provider>
  );
}
