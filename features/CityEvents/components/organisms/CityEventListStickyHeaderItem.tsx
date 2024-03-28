import { useTheme } from '@react-navigation/native';
import { type ReactNode } from 'react';
import { View, type ViewProps, type ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';
import { TextItem } from '../../../../components/atoms/TextItem';
import { type RootState } from '../../../../store/store';
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
  const { searchValue } = useSelector((state: RootState) => state.eventReducer);

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
      {searchValue && (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10
          }}
        >
          <TextItem>Result(s) for {searchValue}</TextItem>
        </View>
      )}
    </View>
  );
};
