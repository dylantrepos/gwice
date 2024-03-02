import React, { PropsWithChildren } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { HeaderItem, HeaderProps } from '../components/HeaderItem/HeaderItem';
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
  headerWithBackNavigation = false,
  headerIsAbsolute = true,
  headerStyle,
  headerBackground,
  pageBackground,
  children
}: PropsWithChildren<Props>) => {
  const navigation = useNavigation();
  const { theme } = useSelector((state: RootState) => state.generalReducer);
  const HEIGHT_HEADER = 70;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{
        flex: 1,
      }}>
        <View
          style={{
            // paddingTop: headerIsAbsolute ? 0 : HEIGHT_HEADER,
            flex: 1,
          }}
        >
          <View
            style={{
              backgroundColor: pageBackground ?? themeStyle.pageBackgroundColor['light'],
              flex: 1,
            }}
          >
            { children }  
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

