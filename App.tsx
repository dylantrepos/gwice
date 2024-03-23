import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions
} from '@react-navigation/native-stack';
import { Home, Settings } from 'lucide-react-native';
import { SafeAreaView, View } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import './localization/i18n';
import { store } from './store/store';

// Views

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { type ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TextItem } from './components/atoms/TextItem';
import { WarningScreenItem } from './components/molecules/WarningScreenItem';
import { BottomNavigationItem } from './components/organisms/BottomNavigationItem';
import { CityEventsDetailsPage } from './features/CityEvents/pages/CityEventsDetailsPage';
import { CityEventsPage } from './features/CityEvents/pages/CityEventsPage';
import { useCustomFont } from './hooks/useCustomFont';
import { HomePage } from './pages/HomePage';
import { SettingsGeneralPage } from './pages/SettingsGeneralPage';
import { SettingsHomePage } from './pages/SettingsHomePage';
import { SettingsPage } from './pages/SettingsPage';
import { SettingsWeatherPage } from './pages/SettingsWeatherPage';
import { HEADER_THEME } from './styles/components/organisms/HeaderItem.style';

const SettingStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

const defaultScreenOptions: NativeStackNavigationOptions = {
  headerShown: true,
  headerBackTitleVisible: false,
  headerTitleAlign: 'center',
  headerShadowVisible: false
};

const SettingsScreens = (): ReactElement => (
  <SettingStack.Navigator screenOptions={defaultScreenOptions} initialRouteName="Settings">
    <SettingStack.Screen name="Settings" component={SettingsPage} />
    <SettingStack.Screen name="Weather" component={SettingsWeatherPage} />
    <SettingStack.Screen name="General" component={SettingsGeneralPage} />
    <SettingStack.Screen name="Home" component={SettingsHomePage} />
  </SettingStack.Navigator>
);

const HomeScreens = (): ReactElement => {
  const { t } = useTranslation();
  return (
    <HomeStack.Navigator screenOptions={defaultScreenOptions} initialRouteName="Home">
      <HomeStack.Screen
        name="Home"
        component={HomePage}
        options={{
          ...defaultScreenOptions,
          header: () => (
            <Animated.View
              style={{
                height: HEADER_THEME.headerHeight,
                display: 'flex',
                flexDirection: 'row'
              }}
            >
              <View style={{ flex: 1 }} />
              <Animated.View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
                <TextItem size="xl" weight="regular">
                  {t('screens.home.title')}
                </TextItem>
              </Animated.View>

              <View style={{ flex: 1 }} />
            </Animated.View>
          )
          // headerTransparent: true
        }}
      />
      <HomeStack.Screen
        name="CityEventsDetails"
        component={CityEventsDetailsPage}
        options={{
          ...defaultScreenOptions,
          headerTransparent: true
        }}
      />
      <HomeStack.Screen
        name="CityEvents"
        component={CityEventsPage}
        options={{
          ...defaultScreenOptions,
          title: t('screens.events.title')
        }}
      />
    </HomeStack.Navigator>
  );
};

// eslint-disable-next-line @typescript-eslint/space-before-function-paren
export default function App(): ReactElement {
  const queryClient = new QueryClient();

  const fontsLoaded = useCustomFont();

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
