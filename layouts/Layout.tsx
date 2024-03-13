import { useTheme } from '@react-navigation/native';
import React, { type PropsWithChildren, type ReactNode } from 'react';
import { StatusBar, View } from 'react-native';
import { useSelector } from 'react-redux';
import { type HeaderProps } from '../components/base/HeaderItem/HeaderItem.type';
import { type RootState } from '../store/store';

interface Props {
  header?: HeaderProps;
}

export const Layout = ({ children }: PropsWithChildren<Props>): ReactNode => {
  const { isDarkMode } = useSelector((state: RootState) => state.generalReducer);
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background
      }}
    >
      <View style={{ flex: 1 }}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={colors.background}
          animated
        />
        {children}
      </View>
    </View>
  );
};
