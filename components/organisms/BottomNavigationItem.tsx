import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { type ReactNode } from 'react';
import { type StyleProp, type TextStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { type RootState } from '../../store/store';
import palette from '../../theme/palette';
import { DarkTheme, DefaultTheme } from '../../theme/theme';

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
  const { isDarkMode } = useSelector((state: RootState) => state.generalReducer);
  const iconSize = {
    height: 26,
    width: 26
  };

  const tabStyleLabel: StyleProp<TextStyle> = {
    fontSize: 20,
    fontWeight: '400'
  };

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: isDarkMode ? palette.blackPrimary : palette.whitePrimary,
            borderTopWidth: 1,
            borderTopColor: isDarkMode ? palette.gray700 : palette.gray200,
            elevation: 0,
            height: 60 + insets.bottom
            // height: 60
          },
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
                  color={
                    focused ? palette.bluePrimary : isDarkMode ? palette.gray300 : palette.gray600
                  }
                  height={iconSize.height}
                  width={iconSize.width}
                />
              )
            }}
          >
            {tab.screens}
          </Tab.Screen>
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
};
