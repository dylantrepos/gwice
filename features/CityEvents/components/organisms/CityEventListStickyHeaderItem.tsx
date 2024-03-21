import { useTheme } from '@react-navigation/native';
import { type ReactNode } from 'react';
import { View, type ViewProps, type ViewStyle } from 'react-native';
import { allEventsCategoryLille } from '../../utils/events';
import { CityEventListCategoryListItem } from './CityEventListCategoryListItem';
import { CityEventListFilterItem } from './CityEventListFilterItem';

interface StickyHeaderProps extends ViewProps {
  filteredCategoryIdList: number[];
  handleSetFilteredCategoryIdList: React.Dispatch<React.SetStateAction<number[]>>;
  styles?: ViewStyle;
}

export const CityEventListStickyHeaderItem = ({
  filteredCategoryIdList,
  handleSetFilteredCategoryIdList,
  onLayout,
  styles
}: StickyHeaderProps): ReactNode => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        backgroundColor: colors.background,
        ...styles
      }}
      onLayout={onLayout}
    >
      <CityEventListCategoryListItem
        categories={allEventsCategoryLille}
        categoriesSelected={filteredCategoryIdList}
        filteredCategoryIdList={handleSetFilteredCategoryIdList}
      />
      <CityEventListFilterItem />
    </View>
  );
};
