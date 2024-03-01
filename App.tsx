import { NavigationContainer } from '@react-navigation/native';
import { HomeView } from './view/HomeView/HomeView';
import { StatusBar } from 'expo-status-bar';
import { Provider, useSelector } from 'react-redux'; // Import Provider
import { RootState, store } from './store/store';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NativeStackNavigationOptions, createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChevronLeft, Home, Search, Settings, BadgeEuro } from 'lucide-react-native';
import { Pressable, SafeAreaView, StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';
import './localization/i18n';

// Views
import { SettingsWeatherView } from './view/SettingsView/SettingsWeatherView/SettingsWeatherView';
import { CityEventView } from './view/CityEvents/CityEventView/CityEventView';
import { CityEventHomeView } from './view/CityEvents/CityEventHomeView/CityEventHomeView';
import { SettingsHomeView } from './view/SettingsView/SettingsHomeView/SettingsHomeView';

import { Poppins_100Thin, Poppins_100Thin_Italic, Poppins_200ExtraLight, Poppins_200ExtraLight_Italic, Poppins_300Light, Poppins_300Light_Italic, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_500Medium, Poppins_500Medium_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic, Poppins_800ExtraBold, Poppins_800ExtraBold_Italic, Poppins_900Black, Poppins_900Black_Italic, useFonts } from "@expo-google-fonts/poppins";
import { WarningScreenItem } from './components/WarningScreenItem/WarningScreenItem';
import { BottomNavigationItem } from './components/BottomNavigationItem/BottomNavigationItem';
import { SettingsGeneralView } from './view/SettingsView/SettingsGeneralView/SettingsGeneralView';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { THEME } from './assets/palette';
import { TextItem } from './components/TextItem/TextItem';
import { useTranslation } from 'react-i18next';

const SettingStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

// const { theme } = useSelector((state: RootState) => state.generalReducer);

const screenOptions: NativeStackNavigationOptions = {
  headerShown: true,
  headerTintColor: THEME.titleBackground['light'] as string,
  headerTitleAlign: 'center',
  headerBackTitleVisible: false,
};


const SettingsScreens = () => {
  const { t } = useTranslation();
  return (
    <SettingStack.Navigator
      screenOptions={{
        ...screenOptions,
      }}
      initialRouteName="Settings" 
    >
      <SettingStack.Screen 
        name="Settings" 
        component={SettingsHomeView} 
        options={{
          title: t('screens.settingsHome.title'),
        }}
      />
      <SettingStack.Screen 
        name="Weather" 
        component={SettingsWeatherView} 
        options={{
          title: t('screens.settingsWeather.title'),
        }}
      />
      <SettingStack.Screen 
        name="General" 
        component={SettingsGeneralView} 
        options={{
          title: t('screens.settingsGeneral.title'),
        }}
      />
    </SettingStack.Navigator>
  )
}

const HomeScreens = () => {
  const { t } = useTranslation();
  
  return (
    <HomeStack.Navigator
      screenOptions={{
        ...screenOptions,
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
        options={{
          title: t('screens.settingsHome.title'),
        }}
      />
      <HomeStack.Screen 
        name="HomeCulturalEvent" 
        component={CityEventHomeView} 
        options={{
          title: t('screens.settingsHome.title'),
        }}
      />
    </HomeStack.Navigator>
  )
}

export default function App() {
  const queryClient = new QueryClient();

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
    <GestureHandlerRootView 
      style={{ flex: 1 }}
    >
      <StatusBar style={'dark'} />
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <SafeAreaView style={{flex: 1}}>
            <BottomSheetModalProvider>
            
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
            </BottomSheetModalProvider>
          </SafeAreaView>
        </QueryClientProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
