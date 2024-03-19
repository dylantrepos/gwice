import { useCallback, type ReactNode } from 'react';
import { FlatList, View, type ViewProps } from 'react-native';
import style from '../../styles/organisms/CityEventListCategoryListItem.style';
import { type CategoryItem } from '../../types/Events';
import { CategoryRadioItem } from '../molecules/CategoryRadioItem';

interface CategoryListItemProps extends ViewProps {
  categories: CategoryItem[];
  categoriesSelected: number[];
  filteredCategoryIdList: React.Dispatch<React.SetStateAction<number[]>>;
}

interface RenderCategoryItemProps {
  item: CategoryItem;
  index: number;
}

export const CityEventListCategoryListItem = ({
  categories,
  categoriesSelected,
  filteredCategoryIdList
}: CategoryListItemProps): ReactNode => {
  const handleToggleCategory = (categoryId: number): void => {
    const index = categoriesSelected.indexOf(categoryId);

    filteredCategoryIdList(
      index === -1
        ? [...categoriesSelected, categoryId]
        : categoriesSelected.filter((cat) => cat !== categoryId)
    );
  };

  const categoryRender = useCallback(
    ({ item, index }: RenderCategoryItemProps) => {
      const { id, iconElt: IconElt, translationKey } = item;

      return (
        <CategoryRadioItem
          name={translationKey}
          icon={IconElt}
          isCategorySelected={categoriesSelected.includes(id)}
          handleOnPress={() => {
            handleToggleCategory(id);
          }}
        />
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
