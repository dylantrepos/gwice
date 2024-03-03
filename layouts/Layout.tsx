import React, { type PropsWithChildren, type ReactNode } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { HeaderItem } from '../components/HeaderItem/HeaderItem';
import { type HeaderProps } from '../components/HeaderItem/HeaderItem.type';

interface Props {
  header?: HeaderProps;
}

export const Layout = ({ header, children }: PropsWithChildren<Props>): ReactNode => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    {/* <SafeAreaView style={{ flex: 1 }}> */}
    <View
      style={{
        flex: 1
      }}
    >
      <HeaderItem {...header} />
      {children}
    </View>
    {/* </SafeAreaView> */}
  </GestureHandlerRootView>
);
