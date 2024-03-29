import { useNavigation } from '@react-navigation/native';
// import { SearchBar } from '@rneui/themed';
import { Searchbar } from 'react-native-paper';

import { History, X } from 'lucide-react-native';
import { type ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, SafeAreaView, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { IconItem } from '../components/atoms/IconItem';
import { TextItem } from '../components/atoms/TextItem';
import { Layout } from '../layouts/Layout';
import { setSearchValue, setSearchValueHistory } from '../reducers/eventReducer';
import { type RootState } from '../store/store';
import palette from '../theme/palette';

export const SearchPage = (): ReactNode => {
  const { searchValue, searchValueHistory } = useSelector((state: RootState) => state.eventReducer);
  const [search, setSearch] = useState(searchValue);

  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleSearch = (): void => {
    if (search.length === 0) return;
    if (!searchValueHistory.includes(search)) {
      dispatch(setSearchValueHistory([...searchValueHistory, search]));
    }
    dispatch(setSearchValue(search));
    navigation.goBack();
  };

  const handleClearSearch = (): void => {
    dispatch(setSearchValue(''));
    setSearch('');
  };

  const handleSearchHistory = (item: string): void => {
    dispatch(setSearchValue(item));
    navigation.goBack();
  };

  const handleRemoveSearchHistory = (item: string): void => {
    dispatch(setSearchValueHistory(searchValueHistory.filter((history) => history !== item)));
  };

  return (
    <Layout>
      <SafeAreaView>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 20
          }}
        >
          <Searchbar
            placeholder={t('screens.search.text.searchPlaceholder')}
            onChangeText={setSearch}
            value={search}
            onSubmitEditing={handleSearch}
            onClearIconPress={handleClearSearch}
            style={{
              flexBasis: '80%',
              height: 60,
              flexGrow: 1,
              borderRadius: 100
            }}
          />
        </View>

        <ScrollView
          scrollEventThrottle={16}
          style={{ padding: 10 }}
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{
            gap: 10
          }}
        >
          {searchValueHistory.map((item, index) => (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
              key={`searchHistory-${index}`}
            >
              <Pressable
                key={index}
                onPress={() => {
                  handleSearchHistory(item);
                }}
                style={{
                  flexGrow: 1,
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 10,
                  alignItems: 'center'
                }}
              >
                <IconItem IconElt={History} size="md" stroke="strong" color={palette.gray700} />
                <TextItem size="xl" weight="light">
                  {item}
                </TextItem>
              </Pressable>
              <Pressable
                onPress={() => {
                  handleRemoveSearchHistory(item);
                }}
                style={{ padding: 10, paddingRight: 0 }}
              >
                <IconItem IconElt={X} size="md" stroke="strong" />
              </Pressable>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
};
