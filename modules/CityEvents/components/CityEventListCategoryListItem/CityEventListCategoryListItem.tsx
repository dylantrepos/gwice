import { useEffect, useRef, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, FlatList, Platform, Pressable, View, type ViewProps } from 'react-native';
import { useSelector } from 'react-redux';
import { IconItem } from '../../../../components/IconItem/IconItem';
import { TextItem } from '../../../../components/TextItem/TextItem';
import { type RootState } from '../../../../store/store';
import { type CategoryItem } from '../../types/Events';
import { formatTitle } from '../../utils/events';
import style, { themeStyle } from './CityEventListCategoryListItem.style';

interface CategoryListItemProps extends ViewProps {
  categories: CategoryItem[];
  categoriesSelected: number[];
  filteredCategoryIdList: React.Dispatch<React.SetStateAction<number[]>>;
}

export const CityEventListCategoryListItem = ({
  categories,
  categoriesSelected,
  filteredCategoryIdList
}: CategoryListItemProps): ReactNode => {
  const { theme } = useSelector((state: RootState) => state.generalReducer);
  const { t } = useTranslation();

  const handleToggleCategory = (categoryId: number): void => {
    const index = categoriesSelected.indexOf(categoryId);
    if (index === -1) {
      filteredCategoryIdList([...categoriesSelected, categoryId]);
    } else {
      filteredCategoryIdList(categoriesSelected.filter((cat) => cat !== categoryId));
    }
  };

  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start();
  }, []);

  return (
    <View style={style.categoryContainer}>
      <FlatList
        data={categories}
        horizontal
        contentContainerStyle={{
          columnGap: 10
        }}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => item.title + index}
        renderItem={({ item }) => {
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
                    backgroundColor: categoriesSelected.includes(id) ? '#0D89CE' : 'transparent',
                    borderRadius: 100,
                    padding: 10,
                    ...Platform.select({
                      ios: {
                        shadowOffset: {
                          width: 0,
                          height: 9
                        },
                        shadowOpacity: categoriesSelected.includes(id) ? 0.2 : 0,
                        shadowRadius: 12.35
                      },
                      android: {
                        elevation: categoriesSelected.includes(id) ? 5 : 0
                      }
                    })
                  }}
                >
                  <IconItem
                    color={
                      categoriesSelected.includes(id)
                        ? themeStyle.categoryBackgroundIncludeColor[theme]
                        : themeStyle.categoryBackgroundExcludeColor[theme]
                    }
                    size="xl"
                    stroke="light"
                    IconElt={IconElt}
                    style={style.categoryIcon}
                  />
                  {/* <IconElt
                      color={categoriesSelected.includes(id) ? 'white' : 'black'}
                      size={34}
                      strokeWidth={1}
                      style={style.categoryIcon}
                      /> */}
                </View>
              )}
              <TextItem
                style={{
                  ...style.categoryName,
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                  lineHeight: 23
                }}
                size="md"
                weight="regular"
              >
                {formatTitle(t(translationKey ?? ''))}
              </TextItem>
            </Pressable>
          );
        }}
      />
    </View>
  );
};
