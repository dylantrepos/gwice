import { type ReactNode } from 'react';
import { Pressable, type ViewProps, type ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';
import { type RootState } from '../../store/store';
import { formatTitle } from '../../utils/events';
import { IconItem } from '../IconItem/IconItem';
import { TextItem } from '../TextItem/TextItem';
import buttonStyle, { themeStyle } from './ButtonItem.style';

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
  backgroundTransparent = false,
  type = 'primary',
  size = 'md',
  weight = 'semiBold',
  handlePress
}: Props): ReactNode => {
  const { theme } = useSelector((state: RootState) => state.generalReducer);

  return (
    <Pressable
      style={{
        ...(style as ViewStyle),
        ...buttonStyle.buttonContainer,
        backgroundColor: themeStyle.type[type].background[theme]
      }}
      onPress={handlePress}
    >
      {IconElt && (
        <IconItem IconElt={IconElt} size="md" color={themeStyle.type[type].text[theme]} />
      )}
      <TextItem size={size} weight={weight} color={themeStyle.type[type].text[theme]}>
        {formatTitle(title)}
      </TextItem>
    </Pressable>
  );
};
