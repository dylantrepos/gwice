import { useTheme } from '@react-navigation/native';
import { type ReactNode } from 'react';
import { Pressable, type ViewProps, type ViewStyle } from 'react-native';
import { formatTitle } from '../../../utils/events';
import { IconItem } from '../IconItem/IconItem';
import { TextItem } from '../TextItem/TextItem';
import buttonStyle, { type themeStyle } from './ButtonItem.style';

type Props = ViewProps & {
  title: string;
  IconElt?: any;
  style?: ViewStyle;
  backgroundTransparent?: boolean;
  size?: keyof typeof themeStyle.size;
  weight?: keyof typeof themeStyle.weight;
  type: keyof typeof themeStyle.type;
  handlePress: () => void;
};

export const ButtonItem = ({
  title,
  IconElt,
  style,
  type = 'primary',
  size = 'md',
  weight = 'semiBold',
  handlePress
}: Props): ReactNode => {
  const { colors } = useTheme();

  return (
    <Pressable
      style={{
        ...(style as ViewStyle),
        ...buttonStyle.buttonContainer,
        backgroundColor: colors.buttonBackground
      }}
      onPress={handlePress}
    >
      {IconElt && <IconItem IconElt={IconElt} size="md" color={colors.text} />}
      <TextItem size={size} weight={weight} color={colors.text}>
        {formatTitle(title)}
      </TextItem>
    </Pressable>
  );
};
