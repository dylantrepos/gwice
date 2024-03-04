import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions
} from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Home, Settings } from 'lucide-react-native';
import { SafeAreaView, View } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import './localization/i18n';
import { store } from './store/store';
import { HomeView } from './view/HomeView/HomeView';

// Views
import { CityEventHomeView } from './view/CityEvents/CityEventHomeView/CityEventHomeView';
import { CityEventView } from './view/CityEvents/CityEventView/CityEventView';
import { SettingsHomeView } from './view/SettingsView/SettingsHomeView/SettingsHomeView';
import { SettingsWeatherView } from './view/SettingsView/SettingsWeatherView/SettingsWeatherView';

import {
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
  useFonts
} from '@expo-google-fonts/poppins';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { type ReactElement } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomNavigationItem } from './components/BottomNavigationItem/BottomNavigationItem';
import { WarningScreenItem } from './components/WarningScreenItem/WarningScreenItem';
import { SettingsGeneralView } from './view/SettingsView/SettingsGeneralView/SettingsGeneralView';

const SettingStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false
  // animation: 'none'
};

const SettingsScreens = (): ReactElement => (
  <SettingStack.Navigator screenOptions={screenOptions} initialRouteName="Settings">
    <SettingStack.Screen name="Settings" component={SettingsHomeView} />
    <SettingStack.Screen name="Weather" component={SettingsWeatherView} />
    <SettingStack.Screen name="General" component={SettingsGeneralView} />
  </SettingStack.Navigator>
);

const HomeScreens = (): ReactElement => (
  <HomeStack.Navigator screenOptions={screenOptions} initialRouteName="Home">
    <HomeStack.Screen
      name="Home"
      component={HomeView}
      // options={{
      //   headerShown: true,
      //   headerTransparent: true,
      //   header: () => <HeaderItem headerTitle="test" />
      // }}
    />
    <HomeStack.Screen name="CulturalEvent" component={CityEventView} />
    <HomeStack.Screen
      name="HomeCulturalEvent"
      component={CityEventHomeView}
      // options={{
      //   headerShown: true,
      //   headerTransparent: true,
      //   header: () => <HeaderItem headerTitle="test2" />
      // }}
    />
  </HomeStack.Navigator>
);

// eslint-disable-next-line @typescript-eslint/space-before-function-paren
export default function App(): ReactElement {
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
    Poppins_900_Italic: Poppins_900Black_Italic
  });

  if (!fontsLoaded) {
    return (
      <SafeAreaView>
        <View>
          <WarningScreenItem type="loader" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <BottomSheetModalProvider>
              <BottomNavigationItem
                navigatorTabs={[
                  {
                    name: 'Home-tab',
                    screenName: 'Home',
                    icon: Home,
                    screens: HomeScreens
                  },
                  {
                    name: 'Settings-tab',
                    screenName: 'Settings',
                    icon: Settings,
                    screens: SettingsScreens
                  }
                ]}
              />
            </BottomSheetModalProvider>
          </QueryClientProvider>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
