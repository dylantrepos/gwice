import { Animated, Pressable, View, ViewProps, ViewStyle } from 'react-native';
import styleTitleItem from "./TitleItem.style";
import { TextItem } from '../TextItem/TextItem';
import { formatTitle } from '../../utils/events';
import { IconItem } from '../IconItem/IconItem';

type Props = ViewProps & {
  title: string;
  leftIcon?: any;
  rightIcon?: any;
  size?: 'sm' | 'md';
  style?: ViewStyle;
}

export const TitleItem = ({
  leftIcon,
  rightIcon,
  size = 'md',
  style,
  title,
}: Props) => {

  return (
    <View
      style={{
        ...styleTitleItem.titleItemContainer,
        ...style as ViewStyle,
      }}
    >
      <View>
        {leftIcon && (
          <IconItem
            IconElt={leftIcon}
            size={size}
            stroke="light"
          />
        )}
        <TextItem 
          weight="regular"
          size={size}
        >
          {formatTitle(title)}
        </TextItem>
      </View>
      {rightIcon && (
        <IconItem
          IconElt={rightIcon} 
          size={size}
          stroke="light"
        />
      )}
    </View>
  );
}

type PressableProps = Props & {
  handleNavigation: () => void;
}

TitleItem.Pressable = ({
  leftIcon,
  rightIcon,
  size = 'md',
  style,
  title,
  handleNavigation,
}: PressableProps) => {
  return (
    <Pressable
      style={{
        ...styleTitleItem.titleItemContainer,
        ...style as ViewStyle,
      }}
      onPress={handleNavigation}
    >
      <View
        style={styleTitleItem.leftContainer}
      >
        {leftIcon && (
          <IconItem
            IconElt={leftIcon}
            size={size}
            stroke="light"
          />
        )}
        <TextItem 
          weight="regular"
          size={size}
        >
          {formatTitle(title)}
        </TextItem>
      </View>
      {rightIcon && (
        <IconItem
          IconElt={rightIcon} 
          size={size}
          stroke="light"
        />
      )}
    </Pressable>
  );
}
