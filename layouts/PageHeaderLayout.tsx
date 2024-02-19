import React, { PropsWithChildren } from 'react';
import style from './PageHeaderLayout.style';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { HeaderItem2 } from '../components/HeaderItem/HeaderItem2';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


type Props = {
  title: string,
}

export const PageHeaderLayout = ({
  title,
  children
}: PropsWithChildren<Props>) => {
  const navigation = useNavigation();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{
        flex: 1,
      }}>
        <StatusBar style="auto" />
        <SafeAreaView
          style={{
          }}
        >
          <HeaderItem2
            title={title}
          />
          { children }  
        </SafeAreaView>
      </View>
    </GestureHandlerRootView>
  );
};

