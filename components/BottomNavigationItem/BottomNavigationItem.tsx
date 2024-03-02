import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { themeStyle } from "./BottomNavigationItem.style";

export type NavigatorProps = {
  name: string,
  screenName: string,
  icon: any,
  screens: any,
}

type Props = {
  navigatorTabs: NavigatorProps[],
}

export const BottomNavigationItem = ({
  navigatorTabs
}: Props) => {
  const { theme } = useSelector((state: RootState) => state.generalReducer);
  const Tab = createBottomTabNavigator();
  const iconSize = {
    height: 26,
    width: 26,
  }
  const tabStyle = {
    container: {
      backgroundColor: themeStyle.background['light'] as string,
      borderTopWidth: 1,
      borderTopColor: themeStyle.border['light'] as string,
      elevation: 0,
      height: 60,
      // height: 60,
    } as StyleProp<ViewStyle>,
    label: {
      fontSize: 20,
      fontWeight: '400',
    } as StyleProp<TextStyle>,
  }

  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={{
          tabBarActiveTintColor: '#0D89CE',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: tabStyle.container,
          tabBarLabelStyle: tabStyle.label,
          tabBarHideOnKeyboard: true,
          tabBarVisibilityAnimationConfig: {
            show: {
              animation: 'spring',

            },
            hide: {
              animation: 'spring',
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
              tabBarIcon: ({ focused, color, size }) => 
                <tab.icon 
                  color={focused ? '#0D89CE' : 'gray'}
                  height={iconSize.height}
                  width={iconSize.width}
                />
              ,
            }}
            listeners={({ navigation }) => ({
              tabPress: event => {
                event.preventDefault();
                navigation.navigate(tab.name, { screen: tab.screenName });
              },
            })}
          >
            {tab.screens}
          </Tab.Screen>
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  )
}