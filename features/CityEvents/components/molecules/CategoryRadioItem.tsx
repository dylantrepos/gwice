import { useTheme } from '@react-navigation/native';
import { type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import { IconItem } from '../../../../components/atoms/IconItem';
import { TextItem } from '../../../../components/atoms/TextItem';
import styles from '../../styles/molecules/CategoryRadioItem.style';
import { formatTitle } from '../../utils/events';

interface CategoryRadioItemProps {
  name: string;
  icon: any;
  isCategorySelected: boolean;
  stylesProps?: any;
  handleOnPress: () => void;
}

export const CategoryRadioItem = ({
  name,
  icon,
  isCategorySelected,
  stylesProps,
  handleOnPress
}: CategoryRadioItemProps): ReactNode => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <Pressable
      style={{
        ...styles.category,
        ...stylesProps
      }}
      onPress={handleOnPress}
    >
      <View
        style={{
          ...styles.iconContainer,
          backgroundColor: isCategorySelected
            ? colors.cityEventCategoryListBackgroundSelectedColor
            : colors.cityEventCategoryListBackgroundColor
        }}
      >
        <IconItem
          color={
            isCategorySelected
              ? colors.cityEventCategoryListIconSelectedColor
              : colors.cityEventCategoryListIconColor
          }
          size="xl"
          IconElt={icon}
        />
      </View>
      <TextItem style={styles.categoryName} size="md" weight="regular">
        {formatTitle(t(name ?? ''))}
      </TextItem>
    </Pressable>
  );
};
