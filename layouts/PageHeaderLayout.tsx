import React, { PropsWithChildren, useCallback, useState } from 'react';
import style from './PageHeaderLayout.style';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { HeaderPage } from '../components/HeaderPage/HeaderPage';
import { Text } from '../components/Text/Text';
import { RefreshControl, ScrollView } from 'react-native';


type Props = {
  title: string,
  refetch: () => void;
}

export const PageHeaderLayout = ({
  title,
  refetch,
  children
}: PropsWithChildren<Props>) => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);


  return (
    <SafeAreaView 
      style={style.pageHeaderLayout}
    >
      <StatusBar style="auto" />
      <HeaderPage 
        title={title}
        navigation={navigation}
      />
      <ScrollView 
        // style={style.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      > 
        { children }
      </ScrollView>
    </SafeAreaView>
  );
};

