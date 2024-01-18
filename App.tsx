import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreenView } from './view/HomeScreenView';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux'; // Import Provider
import { store } from './store/store';


export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <StatusBar style='light' />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Home" 
            component={HomeScreenView} 
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
