import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions
} from '@react-navigation/native-stack';
import { Edit, Heart, Home, Search, Settings } from 'lucide-react-native';
import { Platform, Pressable, SafeAreaView, View } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { HeaderBackButton } from './components/atoms/HeaderBackButton';
import './localization/i18n';
import { store } from './store/store';

// Views

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { type ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { WarningScreenItem } from './components/molecules/WarningScreenItem';
import { BottomNavigationItem } from './components/organisms/BottomNavigationItem';

import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { IconItem } from './components/atoms/IconItem';
import { CityEventDetailsPage } from './features/CityEvents/pages/CityEventDetailsPage';
import { CityEventsPage } from './features/CityEvents/pages/CityEventsPage';
import { CityEventsPageNew } from './features/CityEvents/pages/CityEventsPageNew';
import { CityEventSearchPage } from './features/CityEvents/pages/CityEventsSearchPage';
import { useCustomFont } from './hooks/useCustomFont';
import { HomePage } from './pages/HomePage';
import { SettingsGeneralPage } from './pages/SettingsGeneralPage';
import { SettingsHomePage } from './pages/SettingsHomePage';
import { SettingsPage } from './pages/SettingsPage';
import { SettingsWeatherPage } from './pages/SettingsWeatherPage';
import palette from './theme/palette';

const SettingStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

const defaultScreenOptions: NativeStackNavigationOptions = {
  headerShown: true,
  headerBackTitleVisible: false,
  headerTitleAlign: 'center',
  headerShadowVisible: false,
  headerTransparent: false,
  headerBackTitleStyle: false,
  statusBarTranslucent: false
  // statusBarStyle: 'dark'
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
  const navigation = useNavigation();
  return (
    <HomeStack.Navigator screenOptions={defaultScreenOptions} initialRouteName="Home">
      <HomeStack.Screen
        name="Home"
        component={HomePage}
        options={{
          ...defaultScreenOptions,
          headerShown: true,
          headerTitle: t('screens.home.title')
        }}
      />
      <HomeStack.Screen
        name="CityEventsDetails"
        component={CityEventDetailsPage}
        options={{
          ...defaultScreenOptions,
          headerTransparent: true,
          statusBarTranslucent: false,
          headerLeft: () => <HeaderBackButton />,
          title: '',
          headerRight: () => (
            <Pressable
              onPress={() => {}}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                backgroundColor: 'white',
                borderRadius: 100,
                ...Platform.select({
                  ios: {
                    shadowOffset: {
                      width: 0,
                      height: 0
                    },
                    shadowOpacity: 0.5,
                    shadowRadius: 2
                  },
                  android: {
                    elevation: 10
                  }
                })
              }}
            >
              <IconItem IconElt={Heart} size="sm" stroke="strong" color={palette.redPrimary} />
            </Pressable>
          )
        }}
      />
      <HomeStack.Screen
        name="CityEvents"
        component={CityEventsPage}
        options={{
          ...defaultScreenOptions,
          title: t('screens.events.title'),
          headerRight: () => (
            <Pressable
              onPress={() => {
                // @ts-expect-error navigate need definition
                navigation.navigate('Search');
              }}
              style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}
            >
              <IconItem IconElt={Search} size="md" stroke="strong" />
            </Pressable>
          )
        }}
      />
      <HomeStack.Screen
        name="CityEventsNew"
        component={CityEventsPageNew}
        options={{
          ...defaultScreenOptions,
          title: t('screens.events.title'),
          // headerStyle: {
          //   backgroundColor: '#A98BFE'
          // },
          headerLeft: () => <HeaderBackButton transparent arrowColor={palette.whitePrimary} />,
          headerBackground: () => (
            <LinearGradient
              colors={['#340696', '#9E3EFF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                flex: 1 // make sure the LinearGradient fills the entire header
              }}
            />
          ),
          headerTintColor: '#fff',
          headerRight: () => (
            <>
              <Pressable
                onPress={() => {
                  // @ts-expect-error navigate need definition
                  navigation.navigate('Search');
                }}
                style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}
              >
                <IconItem IconElt={Edit} size="md" stroke="strong" color={'white'} />
              </Pressable>

              <Pressable
                onPress={() => {
                  // @ts-expect-error navigate need definition
                  navigation.navigate('Search');
                }}
                style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}
              >
                <IconItem IconElt={Search} size="md" stroke="strong" color={'white'} />
              </Pressable>
            </>
          )
        }}
      />
      <HomeStack.Screen
        name="Search"
        component={CityEventSearchPage}
        options={{
          ...defaultScreenOptions,
          headerShown: true,
          title: t('screens.search.title')
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
