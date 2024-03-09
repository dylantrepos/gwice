import React, { type PropsWithChildren, type ReactNode } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { THEME } from '../assets/theme';
import { type HeaderProps } from '../components/HeaderItem/HeaderItem.type';
import { type RootState } from '../store/store';

interface Props {
  header?: HeaderProps;
}

export const Layout = ({ children }: PropsWithChildren<Props>): ReactNode => {
  const { theme } = useSelector((state: RootState) => state.generalReducer);

  return (
    <View
      style={{
        backgroundColor: THEME.style.viewBackground[theme],
        flex: 1
      }}
    >
      {children}
    </View>
  );
};
