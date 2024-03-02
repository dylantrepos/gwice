import { View, ViewProps, ViewStyle } from 'react-native';
import tagStyle, { themeStyle } from "./TagItem.style";
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
}

export const TagItem = ({
  title,
  IconElt,
  style,
}: Props) => {
  const { theme } = useSelector((state: RootState) => state.generalReducer)

  return (
    <View 
      style={{
        ...style as ViewStyle, 
        ...tagStyle.tagContainer,
        backgroundColor: themeStyle.background['light'] as string,
        borderColor: themeStyle.border['light'] as string,
      }}
    >
      { IconElt && (
        <IconItem
          IconElt={IconElt}
          size="sm"
          stroke="light"
        />
      )}
      <TextItem
        size='sm'
      >
        {formatTitle(title)}
      </TextItem>
    </View>
  );
}