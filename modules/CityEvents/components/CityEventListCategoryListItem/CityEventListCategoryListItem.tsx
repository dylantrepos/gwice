import { useEffect, useRef } from "react";
import { Animated, FlatList, Pressable, View, Platform } from 'react-native';
import style from './CityEventListCategoryListItem.style';
import { ListCategoryItem } from "../../types/Events";
import { formatTitle } from "../../utils/events";
import { TextItem } from "../../../../components/TextItem/TextItem";

type CategoryListItemProps = {
  categories: ListCategoryItem[];
  categoriesSelected: number[];
  filteredCategoryIdList: React.Dispatch<React.SetStateAction<number[]>>
}

export const CityEventListCategoryListItem = ({
  categories,
  categoriesSelected,
  filteredCategoryIdList
}: CategoryListItemProps) => {

  const handleToggleCategory = (categoryId: number) => {
    const index = categoriesSelected.indexOf(categoryId);
    if (index === -1) {
      filteredCategoryIdList([...categoriesSelected, categoryId]);
      console.log('categoriesSelected: added');
    } else {
      filteredCategoryIdList(categoriesSelected.filter((cat) => cat !== categoryId));
      console.log('categoriesSelected: removed');
    }
  }

  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);


  return (
    <View
      style={style.categoryContainer}
    >
      <FlatList
        data={categories}
        horizontal
        contentContainerStyle={{
          columnGap: 10,
        }}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => item.title + index}
        renderItem={({item}) => {
          const { title, id, iconElt: IconElt } = item;

          return (
            <Pressable 
              style={style.category}
              onPress={() => {
                handleToggleCategory(id);
              }}
            >
              { IconElt && (
                  <View
                    style={{
                      backgroundColor: categoriesSelected.includes(id) ? '#0D89CE' : 'transparent',
                      borderRadius: 100,
                      padding: 10,
                      ...Platform.select({
                        ios: {
                          shadowOffset: {
                            width: 0,
                            height: 9,
                          },
                          shadowOpacity: categoriesSelected.includes(id) ? 0.20 : 0,
                          shadowRadius: 12.35,
                        },
                        android: {
                          elevation: categoriesSelected.includes(id) ? 5 : 0,
                        },
                      }),
                    }}
                    >
                    <IconElt 
                      color={categoriesSelected.includes(id) ? 'white' : 'black'} 
                      size={34} 
                      strokeWidth={1} 
                      style={style.categoryIcon}
                      />
                  </View>
              )}
              <TextItem 
                styles={{
                  ...style.categoryName,
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                  lineHeight: 23,
                }}
                weight="500"
              >
                  {formatTitle(title)}
              </TextItem>
            </Pressable>
          )
        }}
      />
  </View>
  )
}