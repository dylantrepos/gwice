import { Pressable, View, ViewProps, ViewStyle } from 'react-native';
import buttonStyle, { themeStyle } from "./ButtonItem.style";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { THEME } from '../../assets/palette';
import { TextItem } from '../TextItem/TextItem';
import { formatTitle } from '../../utils/events';
import { IconItem } from '../IconItem/IconItem';

type Props = ViewProps & {
  title: string;
  IconElt?: any;
  style?: ViewStyle;
  backgroundTransparent?: boolean;
  size?: keyof typeof themeStyle.size;
  weight?: keyof typeof themeStyle.weight;
  type: keyof typeof themeStyle.type;
  handlePress: () => void;
}

export const ButtonItem = ({
  title,
  IconElt,
  style,
  backgroundTransparent = false,
  type = 'primary',
  size = 'md',
  weight = 'semiBold',
  handlePress,
}: Props) => {
  const { theme } = useSelector((state: RootState) => state.generalReducer)

  return (
    <Pressable
      style={{
        ...style as ViewStyle, 
        ...buttonStyle.buttonContainer,
        backgroundColor: themeStyle.type[type].background[theme] as string,
      }}
      onPress={handlePress}
    >
      { IconElt && <IconItem IconElt={IconElt} size="md" color={themeStyle.type[type].text[theme] as string} /> }
      <TextItem
        size={size}
        weight={weight}
        color={themeStyle.type[type].text[theme] as string}
      >
        {formatTitle(title)}
      </TextItem>
    </Pressable>
  );
}