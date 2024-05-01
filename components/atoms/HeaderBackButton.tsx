import { useNavigation, useTheme } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import { type ReactNode } from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { IconItem } from './IconItem';

interface HeaderBackButtonProps {
  transparent?: boolean;
  arrowColor?: string;
}

export const HeaderBackButton = ({
  transparent = false,
  arrowColor = undefined
}: HeaderBackButtonProps): ReactNode => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <Pressable
      onPress={handlePress}
      style={{
        ...styles.container,
        backgroundColor: transparent ? 'transparent' : colors.background
      }}
    >
      <IconItem IconElt={ArrowLeft} size="md" stroke="strong" color={arrowColor ?? colors.text} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 100,
    marginHorizontal: 0,
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 0,
          height: 0
        },
        shadowOpacity: 0.5,
        shadowRadius: 2
      },
      android: {
        elevation: 10
      }
    })
  }
});
