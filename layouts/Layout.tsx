import { StatusBar } from 'expo-status-bar';
import React, { type PropsWithChildren, type ReactNode } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { THEME } from '../assets/theme';
import { HeaderItem } from '../components/HeaderItem/HeaderItem';
import { type HeaderProps } from '../components/HeaderItem/HeaderItem.type';
import { type RootState } from '../store/store';

interface Props {
  header?: HeaderProps;
}

export const Layout = ({ header, children }: PropsWithChildren<Props>): ReactNode => {
  const { theme } = useSelector((state: RootState) => state.generalReducer);
  const insets = useSafeAreaInsets();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: THEME.style.viewBackground[theme],
          position: 'relative'
        }}
      >
        {header?.headerTransparent && (
          <View
            style={{ height: insets.top, backgroundColor: THEME.style.viewBackground[theme] }}
          />
        )}
        <StatusBar style={theme === 'light' ? 'dark' : 'light'} animated={true} />
        <HeaderItem {...header} />
        {children}
      </View>
    </GestureHandlerRootView>
  );
};
