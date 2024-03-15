import { useTheme } from '@react-navigation/native';
import { type ReactNode } from 'react';
import { View, type ViewProps, type ViewStyle } from 'react-native';
import { eventsCategoryLille } from '../../../../modules/CityEvents/utils/events';
import { CityEventListCategoryListItem } from '../CityEventListCategoryListItem/CityEventListCategoryListItem';
import { CityEventListFilterItem } from '../CityEventListFilterItem/CityEventListFilterItem';

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
        categories={eventsCategoryLille}
        categoriesSelected={filteredCategoryIdList}
        filteredCategoryIdList={handleSetFilteredCategoryIdList}
      />
      <CityEventListFilterItem />
    </View>
  );
};
