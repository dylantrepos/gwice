import { useTheme } from '@react-navigation/native';
import React, { type PropsWithChildren, type ReactNode } from 'react';
import { StatusBar, View } from 'react-native';
import { useSelector } from 'react-redux';
import { THEME } from '../assets/theme';
import { type HeaderProps } from '../components/HeaderItem/HeaderItem.type';
import { type RootState } from '../store/store';

interface Props {
  header?: HeaderProps;
}

export const Layout = ({ children }: PropsWithChildren<Props>): ReactNode => {
  const { theme } = useSelector((state: RootState) => state.generalReducer);
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
          barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor={THEME.style.headerBackground[theme]}
          animated
        />
        {children}
      </View>
    </View>
  );
};
