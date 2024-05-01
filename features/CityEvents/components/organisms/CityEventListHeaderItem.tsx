import { LinearGradient } from 'expo-linear-gradient';
import { PlusCircle } from 'lucide-react-native';
import { type ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import { IconItem } from '../../../../components/atoms/IconItem';
import { TextItem } from '../../../../components/atoms/TextItem';
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

    <Pressable
      style={{
        marginTop: 20,
        marginHorizontal: 20,
        alignItems: 'center'
      }}
    >
      <LinearGradient
        colors={['rgba(96,64,225,1)', 'rgba(232,144,63,1)']}
        style={{
          borderRadius: 5,
          width: '100%',
          maxWidth: 400,
          paddingHorizontal: 50,
          paddingVertical: 15,
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
          gap: 10
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <IconItem IconElt={PlusCircle} color="white" size="md" stroke="strong" />
        <TextItem color="white" weight="semiBold">
          Create an event
        </TextItem>
      </LinearGradient>
    </Pressable>
  </View>
);
