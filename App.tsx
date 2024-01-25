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
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

const SettingsScreens = () => {
  const SettingStack = createNativeStackNavigator();

  return (
    <SettingStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
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
  const HomeStack = createNativeStackNavigator();

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen 
        name="Home" 
        component={HomeView} 
        
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
                  navigation.navigate('Home');
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
                  navigation.navigate('Settings');
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
