import React, { PropsWithChildren } from 'react';
import { View, Text, Pressable } from 'react-native';
import style from './SettingsLayout.style';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import { HeaderItem } from '../components/HeaderItem/HeaderItem';


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
      <HeaderItem 
        title={title}
        navigation={navigation}
      />
      { children }
    </SafeAreaView>
  );
};

