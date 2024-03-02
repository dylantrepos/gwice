import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import { type ReactNode } from 'react';
import { Pressable } from 'react-native';
import { THEME } from '../../assets/palette';
import { IconItem } from '../IconItem/IconItem';

export const HeaderLeftItem = (): ReactNode => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.5 : 1
        },
        {
          backgroundColor: THEME.header.leftButtonBackground.light,
          padding: 10,
          borderRadius: 50,
          marginRight: 10
        }
      ]}
      onPress={() => {
        navigation.goBack();
      }}
    >
      <IconItem
        IconElt={ArrowLeft}
        size="md"
        stroke="strong"
        color={THEME.header.leftButtonIcon.light}
      />
    </Pressable>
  );
};
