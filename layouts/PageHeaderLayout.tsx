import React, { PropsWithChildren } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { HeaderItem2, HeaderProps } from '../components/HeaderItem/HeaderItem2';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import palette from '../assets/palette';
import { themeStyle } from './PageHeaderLayout.style';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';


type Props = HeaderProps & {
  headerIsAbsolute?: boolean;
  pageBackground?: string;
};

export const PageHeaderLayout = ({
  headerTitle = '',
  headerTitleColor,
  headerLeftIcon = null,
  headerRightIcon = null,
  headerHandleLeftIconPress = () => {},
  headerHandleRightIconPress = () => {},
  headerIconSize = 'md',
  headerIconColor = null,
  headerIconStroke = 'strong',
  headerWithTransparentBackground = false,
  headerWithBackNavigation = false,
  headerIsAbsolute = true,
  headerStyle,
  pageBackground,
  children
}: PropsWithChildren<Props>) => {
  const navigation = useNavigation();
  const { theme } = useSelector((state: RootState) => state.generalReducer);
  const HEIGHT_HEADER = 70;
  console.log('headerIsAbsolute :', headerIsAbsolute);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{
        flex: 1,
      }}>
        <StatusBar style="auto" />
        <SafeAreaView
          style={{
            paddingTop: headerIsAbsolute ? 0 : HEIGHT_HEADER,
            flex: 1,
          }}
        >
          <HeaderItem2
            headerTitle={headerTitle}
            headerTitleColor={headerTitleColor ?? themeStyle.headerTitleColor[theme]}
            headerLeftIcon={headerLeftIcon}
            headerRightIcon={headerRightIcon}
            headerHandleLeftIconPress={headerHandleLeftIconPress}
            headerHandleRightIconPress={headerHandleRightIconPress}
            headerIconSize={headerIconSize}
            headerIconColor={headerIconColor}
            headerIconStroke={headerIconStroke}
            headerWithTransparentBackground={headerWithTransparentBackground}
            headerWithBackNavigation={headerWithBackNavigation}
            headerBackground={themeStyle.pageBackgroundColor[theme]}
            headerStyle={{
              height: HEIGHT_HEADER,
            }}
            style={{
              ...headerStyle,
            }}
            onLayout={(event) => {
              const {height} = event.nativeEvent.layout;
              console.log('height :', height);
            }}
          />
          <View
            style={{
              backgroundColor: pageBackground ?? themeStyle.pageBackgroundColor[theme],
              flex: 1,
            }}
          >
            { children }  
          </View>
        </SafeAreaView>
      </View>
    </GestureHandlerRootView>
  );
};

