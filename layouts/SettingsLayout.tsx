import React, { PropsWithChildren } from 'react';
import { View, Text, Pressable } from 'react-native';
import style from './SettingsLayout.style';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronRight } from '../assets/icons/ChevronRight';


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
      <View style={style.settingsLayoutHeader}>
        { title !== 'Settings' && (
          <Pressable 
            onPress={() => navigation.goBack()}
            style={style.settingsLayoutChevron}
          >
            <ChevronRight />
          </Pressable>
        )}
        <Text style={style.settingsLayoutTitle}>{title}</Text>
      </View>
      { children }
    </SafeAreaView>
  );
};

