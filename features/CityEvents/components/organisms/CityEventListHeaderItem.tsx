import { type ReactNode } from 'react';
import { View } from 'react-native';
import { CityEventListPromoteItem } from './CityEventListPromoteItem';

interface HeaderListProps {
  setHeaderHeight: React.Dispatch<React.SetStateAction<number>>;
}

export const HeaderList = ({ setHeaderHeight }: HeaderListProps): ReactNode => (
  <View
    onLayout={(event) => {
      const { height } = event.nativeEvent.layout;
      setHeaderHeight(height);
    }}
  >
    <CityEventListPromoteItem />
  </View>
);
