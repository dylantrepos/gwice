import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreenView } from './view/HomeScreenView/HomeScreenView';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux'; // Import Provider
import { store } from './store/store';
import { QueryClient, QueryClientProvider } from 'react-query';



export default function App() {

  const Stack = createNativeStackNavigator();
  const queryClient = new QueryClient();


  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </Provider>
  );
}
