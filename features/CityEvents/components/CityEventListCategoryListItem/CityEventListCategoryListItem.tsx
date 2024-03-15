import { useTheme } from '@react-navigation/native';
import { useCallback, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Pressable, View, type ViewProps } from 'react-native';
import { IconItem } from '../../../../components/general/IconItem/IconItem';
import { TextItem } from '../../../../components/general/TextItem/TextItem';
import { formatTitle } from '../../../../modules/CityEvents/utils/events';
import { type CategoryItem } from '../../../../types/Events';
import style from './CityEventListCategoryListItem.style';

interface CategoryListItemProps extends ViewProps {
  categories: CategoryItem[];
  categoriesSelected: number[];
  filteredCategoryIdList: React.Dispatch<React.SetStateAction<number[]>>;
}

interface RenderCategoryItemProps {
  item: CategoryItem;
  index: number;
}

interface TextCategoryNameProps {
  translationKey: string;
}

const TextCategoryName = ({ translationKey }: TextCategoryNameProps): ReactNode => {
  const { t } = useTranslation();

  return (
    <TextItem style={style.categoryName} size="md" weight="regular">
      {formatTitle(t(translationKey ?? ''))}
    </TextItem>
  );
};

export const CityEventListCategoryListItem = ({
  categories,
  categoriesSelected,
  filteredCategoryIdList
}: CategoryListItemProps): ReactNode => {
  const { colors } = useTheme();

  const handleToggleCategory = (categoryId: number): void => {
    const index = categoriesSelected.indexOf(categoryId);
    if (index === -1) {
      filteredCategoryIdList([...categoriesSelected, categoryId]);
    } else {
      filteredCategoryIdList(categoriesSelected.filter((cat) => cat !== categoryId));
    }
  };

  const categoryRender = useCallback(
    ({ item, index }: RenderCategoryItemProps) => {
      const { id, iconElt: IconElt, translationKey } = item;

      return (
        <Pressable
          style={style.category}
          onPress={() => {
            handleToggleCategory(id);
          }}
        >
          {IconElt && (
            <View
              style={{
                ...style.iconContainer,
                backgroundColor: categoriesSelected.includes(id)
                  ? colors.cityEventCategoryListBackgroundSelectedColor
                  : colors.cityEventCategoryListBackgroundColor
              }}
            >
              <IconItem
                color={
                  categoriesSelected.includes(id)
                    ? colors.cityEventCategoryListIconSelectedColor
                    : colors.cityEventCategoryListIconColor
                }
                size="xl"
                IconElt={IconElt}
              />
            </View>
          )}
          <TextCategoryName translationKey={translationKey} />
        </Pressable>
      );
    },
    [categoriesSelected]
  );

  return (
    <View>
      <FlatList
        data={categories}
        horizontal
        contentContainerStyle={style.categoryContainer}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => item.title + index}
        renderItem={categoryRender}
      />
    </View>
  );
};
