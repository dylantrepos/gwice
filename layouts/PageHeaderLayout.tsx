import React, { PropsWithChildren } from 'react';
import style from './PageHeaderLayout.style';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { HeaderPage } from '../components/HeaderPage/HeaderPage';


type Props = {
  title: string,
}

export const PageHeaderLayout = ({
  title,
  children
}: PropsWithChildren<Props>) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView 
      style={style.pageHeaderLayout}
    >
      <StatusBar style="auto" />
      <HeaderPage 
        title={title}
        navigation={navigation}
      />
        { children }
    </SafeAreaView>
  );
};

