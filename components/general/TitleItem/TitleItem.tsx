import { type ReactNode } from 'react';
import { Pressable, View, type ViewProps, type ViewStyle } from 'react-native';
import { formatTitle } from '../../../utils/events';
import { IconItem } from '../IconItem/IconItem';
import { TextItem } from '../TextItem/TextItem';
import styleTitleItem from './TitleItem.style';

type Size = 'sm' | 'md' | 'lg' | 'xl';

type Props = ViewProps & {
  title: string;
  leftIcon?: any;
  rightIcon?: any;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  style?: ViewStyle;
};

const sizeAvailable: Size[] = ['sm', 'md', 'lg', 'xl'];

const getIconSize = (size: Size): ReactNode =>
  sizeAvailable.includes(size)
    ? sizeAvailable[sizeAvailable.findIndex((sizeElt) => sizeElt === size) - 2]
    : 'md';

export const TitleItem = ({ leftIcon, rightIcon, size = 'md', style, title }: Props) => (
  <View
    style={{
      ...styleTitleItem.titleItemContainer,
      ...(style as ViewStyle)
    }}
  >
    <View>
      {leftIcon && <IconItem IconElt={leftIcon} size={getIconSize(size)} stroke="light" />}
      <TextItem weight="regular" size={size}>
        {formatTitle(title)}
      </TextItem>
    </View>
    {rightIcon && <IconItem IconElt={rightIcon} size={getIconSize(size)} stroke="light" />}
  </View>
);

type PressableProps = Props & {
  handleNavigation: () => void;
};

TitleItem.Pressable = ({
  leftIcon,
  rightIcon,
  size = 'md',
  style,
  title,
  handleNavigation
}: PressableProps) => (
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
