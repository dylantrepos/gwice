import { type ReactNode } from 'react';
import { Pressable, View, type ViewProps, type ViewStyle } from 'react-native';
import styleTitleItem from '../../styles/components/molecules/TitleItem.style';
import { formatTitle } from '../../utils/events';
import { IconItem } from '../atoms/IconItem';
import { TextItem } from '../atoms/TextItem';

type Size = 'sm' | 'md' | 'lg' | 'xl';

type Props = ViewProps & {
  title: string;
  leftIcon?: any;
  rightIcon?: any;
  size?: Size;
  style?: ViewStyle;
  handleNavigation?: () => void;
};

const sizeAvailable: Size[] = ['sm', 'md', 'lg', 'xl'];

const getIconSize = (size: Size): Size =>
  sizeAvailable.includes(size)
    ? sizeAvailable[sizeAvailable.findIndex((sizeElt) => sizeElt === size) - 2]
    : 'md';

export const TitleItem = ({
  leftIcon,
  rightIcon,
  size = 'md',
  style,
  title,
  handleNavigation
}: Props): ReactNode => (
  <Pressable
    style={{
      ...styleTitleItem.titleItemContainer,
      ...(style as ViewStyle)
    }}
    onPress={handleNavigation}
  >
    <View style={styleTitleItem.leftContainer}>
      {leftIcon && <IconItem IconElt={leftIcon} size={getIconSize(size)} stroke="light" />}
      <TextItem weight="regular" size={size}>
        {formatTitle(title)}
      </TextItem>
    </View>
    {rightIcon && <IconItem IconElt={rightIcon} size={getIconSize(size)} stroke="light" />}
  </Pressable>
);
