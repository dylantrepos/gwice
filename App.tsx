import { NavigationContainer } from '@react-navigation/native';
import { HomeView } from './view/HomeView/HomeView';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux'; // Import Provider
import { store } from './store/store';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SettingsHomeView } from './view/SettingsView/SettingsHomeView/SettingsHomeView';
import { Home } from './assets/icons/Home';
import { Settings } from './assets/icons/Settings';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsWeatherView } from './view/SettingsView/SettingsWeatherView/SettingsWeatherView';

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

export default function App() {
  const queryClient = new QueryClient();
  const Tab = createBottomTabNavigator();
  const iconSize = {
    height: 24,
    width: 24,
  }

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <StatusBar style='light' />
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen 
              name="Home-tab" 
              component={HomeView} 
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
            />
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
            >
              {SettingsScreens}
            </Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </Provider>
  );
}
