import { useEffect, useState, type ReactNode } from 'react';
import { Pressable, type ViewProps, type ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { type RootState } from '../../store/store';
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
  const [backgroundColorButton, setBackgroundColorButton] = useState(
    themeStyle.buttonStyle[type].backgroundColor
  );
  const [textColorButton, setTextColorButton] = useState(themeStyle.buttonStyle[type].textColor);
  const { isDarkMode } = useSelector((state: RootState) => state.generalReducer);

  useEffect(() => {
    const { backgroundColor, textColor } = isDarkMode
      ? themeStyle.buttonDarkStyle[type]
      : themeStyle.buttonStyle[type];

    setBackgroundColorButton(backgroundColor);
    setTextColorButton(textColor);
  }, [isDarkMode, type]);

  return (
    <Pressable
      style={{
        ...(style as ViewStyle),
        borderColor: variant === 'outline' ? backgroundColorButton : 'transparent',
        borderWidth: variant === 'outline' ? 1 : 0,
        borderStyle: 'solid'
      }}
      onPress={handlePress}
    >
      <Animated.View
        style={{
          ...buttonStyle.buttonContainer,
          backgroundColor: variant === 'solid' ? backgroundColorButton : 'transparent'
        }}
      >
        {IconElt && (
          <IconItem
            IconElt={IconElt}
            size="md"
            color={variant === 'solid' ? textColorButton : backgroundColorButton}
          />
        )}
        <TextItem
          size={size}
          weight={weight}
          color={variant === 'solid' ? textColorButton : backgroundColorButton}
        >
          {formatTitle(title)}
        </TextItem>
      </Animated.View>
    </Pressable>
  );
};
