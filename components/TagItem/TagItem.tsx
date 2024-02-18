import { View, ViewProps, ViewStyle } from 'react-native';
import tagStyle from "./TagItem.style";
import { PropsWithChildren } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { THEME } from '../../assets/palette';
import { useBackgroundColorLoading } from '../../hooks/useBackgroundColorLoading';
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
  const { theme } = useSelector((state: RootState) => state.generalReducer);

  return (
    <View 
      style={{
        ...style as ViewStyle, 
        ...tagStyle.tagContainer,
        backgroundColor: THEME.tag.background[theme] as string,
        borderColor: THEME.tag.border[theme] as string,
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
        styles={{
          fontSize: 12,
          lineHeight: 18,
        }} 
      >
        {formatTitle(title)}
      </TextItem>
    </View>
  );
}