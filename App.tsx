import { NavigationContainer } from '@react-navigation/native';
import { HomeView } from './view/HomeView/HomeView';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux'; // Import Provider
import { store } from './store/store';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SettingsHomeView } from './view/SettingsView/SettingsHomeView/SettingsHomeView';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsWeatherView } from './view/SettingsView/SettingsWeatherView/SettingsWeatherView';
import { Home, Settings } from 'lucide-react-native'
import { StyleProp, Text, TextStyle, ViewStyle } from 'react-native';
import { CulturalEventView } from './view/CulturalEventsView/CulturalEventView/CulturalEventView';
import { CulturalEventListView } from './view/CulturalEventsView/CulturalEventListView/CulturalEventListView';
import { Poppins_100Thin, Poppins_100Thin_Italic, Poppins_200ExtraLight, Poppins_200ExtraLight_Italic, Poppins_300Light, Poppins_300Light_Italic, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_500Medium, Poppins_500Medium_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic, Poppins_800ExtraBold, Poppins_800ExtraBold_Italic, Poppins_900Black, Poppins_900Black_Italic, useFonts } from "@expo-google-fonts/poppins";

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
        component={CulturalEventView} 
        
      />
      <HomeStack.Screen 
        name="CulturalEventList" 
        component={CulturalEventListView} 
        
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
    return <Text>Loading fonts...</Text>;
  };

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <StatusBar style='light' />
        <NavigationContainer>
          <Tab.Navigator 
            screenOptions={{
              tabBarActiveTintColor: '#0D89CE',
              tabBarInactiveTintColor: 'gray',
              tabBarStyle: tabStyle.container,
              tabBarLabelStyle: tabStyle.label,
            }}
          >
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
                  // prevent the default action
                  event.preventDefault();
            
                  // navigate to the desired screen
                  navigation.navigate('Home-tab', { screen: 'Home' });
                },
              })}
            >
              {HomeScreens}
            </Tab.Screen>
            <Tab.Screen 
              name="Settings-tab" 
              options={{ 
                headerShown: false,
                tabBarLabel: () => null,
                tabBarIcon: ({ focused, color, size }) => 
                  <Settings 
                    color={focused ? '#0D89CE' : 'gray'} 
                    height={iconSize.height}
                    width={iconSize.width}
                  />
              }}
              listeners={({ navigation }) => ({
                tabPress: event => {
                  // prevent the default action
                  event.preventDefault();
            
                  // navigate to the desired screen
                  navigation.navigate('Settings-tab', { screen: 'Settings' });
                },
              })}
            >
              {SettingsScreens}
            </Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </Provider>
  );
}
