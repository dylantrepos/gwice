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
    height: 26,
    width: 26,
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
              tabBarStyle: {
                backgroundColor: '#F5F5F5',
                borderTopWidth: 0,
                elevation: 0,
                height: 60,
              },
              tabBarLabelStyle: {
                fontSize: 20,
                fontWeight: '400',
              },
            }}
          >
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
