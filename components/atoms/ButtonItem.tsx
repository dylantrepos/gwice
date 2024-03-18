import { type ReactNode } from 'react';
import { Appearance, Pressable, type ViewProps, type ViewStyle } from 'react-native';
import buttonStyle, { themeStyle } from '../../styles/components/atoms/ButtonItem.style';
import { formatTitle } from '../../utils/events';
import { IconItem } from './IconItem';
import { TextItem } from './TextItem';

type Props = ViewProps & {
  title: string;
  IconElt?: any;
  style?: ViewStyle;
  backgroundTransparent?: boolean;
  size?: keyof typeof themeStyle.size;
  weight?: keyof typeof themeStyle.weight;
  type?: keyof typeof themeStyle.buttonStyle;
  variant?: keyof typeof themeStyle.variant;
  handlePress: () => void;
};

export const ButtonItem = ({
  title,
  IconElt,
  style,
  type = 'primary',
  size = 'md',
  weight = 'semiBold',
  variant = 'solid',
  handlePress
}: Props): ReactNode => {
  const { backgroundColor, textColor } =
    Appearance.getColorScheme() === 'dark'
      ? themeStyle.buttonDarkStyle[type]
      : themeStyle.buttonStyle[type];

  return (
    <Pressable
      style={{
        ...(style as ViewStyle),
        ...buttonStyle.buttonContainer,
        backgroundColor: variant === 'solid' ? backgroundColor : 'transparent',
        borderColor: variant === 'outline' ? backgroundColor : 'transparent',
        borderWidth: variant === 'outline' ? 1 : 0,
        borderStyle: 'solid'
      }}
      onPress={handlePress}
    >
      {IconElt && (
        <IconItem
          IconElt={IconElt}
          size="md"
          color={variant === 'solid' ? textColor : backgroundColor}
        />
      )}
      <TextItem
        size={size}
        weight={weight}
        color={variant === 'solid' ? textColor : backgroundColor}
      >
        {formatTitle(title)}
      </TextItem>
    </Pressable>
  );
};
