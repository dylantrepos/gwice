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
import { HomeView } from './view/HomeView/HomeView';

// Views
import { SettingsHomeView } from './view/SettingsView/SettingsHomeView/SettingsHomeView';
import { SettingsWeatherView } from './view/SettingsView/SettingsWeatherView/SettingsWeatherView';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { type ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomNavigationItem } from './components/base/BottomNavigationItem/BottomNavigationItem';
import { WarningScreenItem } from './components/base/WarningScreenItem/WarningScreenItem';
import { CityEventsDetailsPage } from './features/CityEvents/pages/CityEventsDetailsPage/CityEventsDetailsPage';
import { CityEventsPage } from './features/CityEvents/pages/CityEventsPage/CityEventsPage';
import { useCustomFont } from './hooks/useCustomFont';
import { SettingsGeneralView } from './view/SettingsView/SettingsGeneralView/SettingsGeneralView';

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
    <SettingStack.Screen name="Settings" component={SettingsHomeView} />
    <SettingStack.Screen name="Weather" component={SettingsWeatherView} />
    <SettingStack.Screen name="General" component={SettingsGeneralView} />
  </SettingStack.Navigator>
);

const HomeScreens = (): ReactElement => {
  const { t } = useTranslation();
  return (
    <HomeStack.Navigator screenOptions={defaultScreenOptions} initialRouteName="Home">
      <HomeStack.Screen
        name="Home"
        component={HomeView}
        options={{
          ...defaultScreenOptions
          // headerTransparent: true
        }}
      />
      <HomeStack.Screen name="CityEventsDetails" component={CityEventsDetailsPage} />
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
