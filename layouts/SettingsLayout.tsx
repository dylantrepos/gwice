import React, { PropsWithChildren } from 'react';
import { View, Text, Pressable } from 'react-native';
import style from './SettingsLayout.style';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import { HeaderPage } from '../components/HeaderPage/HeaderPage';


type Props = {
  title: string,
}

export const SettingsLayout = ({
  title,
  children
}: PropsWithChildren<Props>) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView 
      style={style.settingsLayout}
    >
      <HeaderPage 
        title={title}
        navigation={navigation}
      />
      { children }
    </SafeAreaView>
  );
};

