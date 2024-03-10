import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useTheme } from '@react-navigation/native';
import { type ReactNode } from 'react';
import { useColorScheme, type StyleProp, type TextStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { THEME } from '../../assets/theme';
import { type RootState } from '../../store/store';
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
  const { colors } = useTheme();
  const { theme } = useSelector((state: RootState) => state.generalReducer);
  const iconSize = {
    height: 26,
    width: 26
  };

  const tabStyleContainer = {
    backgroundColor: colors.bottomSheetBackground,
    borderTopWidth: 1,
    borderTopColor: colors.bottomNavBorder,
    elevation: 0,
    height: 60 + insets.bottom
    // height: 60
  };
  const tabStyleLabel: StyleProp<TextStyle> = {
    fontSize: 20,
    fontWeight: '400'
  };

  const scheme = useColorScheme();

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.bottomNavIconActive,
          tabBarInactiveTintColor: colors.bottomNavIcon,
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
                  color={
                    THEME.style[focused ? 'bottomNavIconFocusedColor' : 'bottomNavIconColor'][theme]
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
