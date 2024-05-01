import { useTheme } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { CalendarClockIcon, Heart, Sparkles } from 'lucide-react-native';
import { useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, View, type ViewProps, type ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { IconItem } from '../../../../components/atoms/IconItem';
import { TextItem } from '../../../../components/atoms/TextItem';
import { TypeTitle } from '../../types/Constant';
import { CityEventListFilterItem } from './CityEventListFilterItem';

interface StickyHeaderProps extends ViewProps {
  filteredCategoryIdList: number[];
  styles?: ViewStyle;
  handleSetFilteredCategoryIdList: React.Dispatch<React.SetStateAction<number[]>>;
  handleUpdateActiveTab?: React.Dispatch<React.SetStateAction<TypeTitle>>;
}

export const CityEventListStickyHeaderItem = ({
  filteredCategoryIdList,
  handleSetFilteredCategoryIdList,
  onLayout,
  styles,
  handleUpdateActiveTab
}: StickyHeaderProps): ReactNode => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState(TypeTitle.Coming);

  const handleActiveTab = (type: TypeTitle): void => {
    setActiveTab(type);
    if (handleUpdateActiveTab) handleUpdateActiveTab(type);
  };

  return (
    <View
      style={{
        backgroundColor: colors.background,
        ...styles
      }}
      onLayout={onLayout}
    >
      {/* <CityEventListCategoryListItem
        categories={allEventsCategoryLille}
        categoriesSelected={filteredCategoryIdList}
        filteredCategoryIdList={handleSetFilteredCategoryIdList}
      /> */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#A98BFE'
        }}
      >
        <LinearGradient
          colors={['#340696', '#9E3EFF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Animated.View
            style={{
              flex: 1
            }}
          >
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
                flex: 1,
                paddingVertical: 10,
                borderBottomWidth: 2,
                borderBottomColor: activeTab === TypeTitle.Coming ? '#E7DFFF' : 'transparent'
              }}
              onPress={(): void => {
                handleActiveTab(TypeTitle.Coming);
              }}
            >
              <IconItem
                IconElt={Sparkles}
                size="md"
                color={activeTab === TypeTitle.Coming ? 'white' : 'rgba(255, 255, 255, 0.8).'}
              />
              <TextItem
                size="lg"
                weight={activeTab === TypeTitle.Coming ? 'regular' : 'light'}
                color={activeTab === TypeTitle.Coming ? 'white' : 'rgba(255, 255, 255, 0.8).'}
              >
                {t('period.coming')}
              </TextItem>
            </Pressable>
          </Animated.View>
          <Animated.View
            style={{
              flex: 1
            }}
          >
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
                flex: 1,
                paddingVertical: 10,
                borderBottomWidth: 2,
                borderBottomColor: activeTab === TypeTitle.Favorite ? '#E7DFFF' : 'transparent'
              }}
              onPress={(): void => {
                handleActiveTab(TypeTitle.Favorite);
              }}
            >
              <IconItem
                IconElt={Heart}
                size="md"
                color={activeTab === TypeTitle.Favorite ? 'white' : 'rgba(255, 255, 255, 0.8).'}
              />
              <TextItem
                size="lg"
                weight={activeTab === TypeTitle.Favorite ? 'regular' : 'light'}
                color={activeTab === TypeTitle.Favorite ? 'white' : 'rgba(255, 255, 255, 0.8).'}
              >
                {t('generic.favorite')}
              </TextItem>
            </Pressable>
          </Animated.View>
          <Animated.View
            style={{
              flex: 1
            }}
          >
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
                paddingVertical: 10,
                borderBottomWidth: 2,
                borderBottomColor: activeTab === TypeTitle.Current ? '#E7DFFF' : 'transparent'
              }}
              onPress={(): void => {
                handleActiveTab(TypeTitle.Current);
              }}
            >
              <IconItem
                IconElt={CalendarClockIcon}
                size="md"
                color={activeTab === TypeTitle.Current ? 'white' : 'rgba(255, 255, 255, 0.8).'}
              />
              <TextItem
                size="lg"
                weight={activeTab === TypeTitle.Current ? 'regular' : 'light'}
                color={activeTab === TypeTitle.Current ? 'white' : 'rgba(255, 255, 255, 0.8).'}
              >
                {t('period.now')}
              </TextItem>
            </Pressable>
          </Animated.View>
        </LinearGradient>
      </View>
      <CityEventListFilterItem currentTab={activeTab} />
    </View>
  );
};
