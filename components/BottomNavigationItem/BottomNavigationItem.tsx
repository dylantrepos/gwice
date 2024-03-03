import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { type ReactNode } from 'react';
import { type StyleProp, type TextStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { type RootState } from '../../store/store';
import { themeStyle } from './BottomNavigationItem.style';

export interface NavigatorProps {
  name: string;
  screenName: string;
  icon: any;
  screens: any;
}

interface Props {
  navigatorTabs: NavigatorProps[];
}

export const BottomNavigationItem = ({ navigatorTabs }: Props): ReactNode => {
  // const { theme } = useSelector((state: RootState) => state.generalReducer);
  const Tab = createBottomTabNavigator();
  const insets = useSafeAreaInsets();
  const { theme } = useSelector((state: RootState) => state.generalReducer);
  const iconSize = {
    height: 26,
    width: 26
  };

  const tabStyleContainer = {
    backgroundColor: themeStyle.background[theme],
    borderTopWidth: 1,
    borderTopColor: themeStyle.border[theme],
    elevation: 0,
    height: 60 + insets.bottom
    // height: 60
  };
  const tabStyleLabel: StyleProp<TextStyle> = {
    fontSize: 20,
    fontWeight: '400'
  };

  console.log({ navigatorTabs });

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#0D89CE',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: tabStyleContainer,
          tabBarLabelStyle: tabStyleLabel,
          tabBarHideOnKeyboard: true,
          tabBarVisibilityAnimationConfig: {
            show: {
              animation: 'spring'
            },
            hide: {
              animation: 'spring'
            }
          }
        }}
      >
        {navigatorTabs.map((tab, index) => (
          <Tab.Screen
            key={index}
            name={tab.name}
            options={{
              headerShown: false,
              tabBarLabel: () => null,
              tabBarIcon: ({ focused, color, size }) => (
                <tab.icon
                  color={focused ? '#0D89CE' : 'gray'}
                  height={iconSize.height}
                  width={iconSize.width}
                />
              )
            }}
            listeners={({ navigation }) => ({
              tabPress: (event) => {
                event.preventDefault();
                navigation.navigate(tab.name, { screen: tab.screenName });
              }
            })}
          >
            {tab.screens}
          </Tab.Screen>
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
};
