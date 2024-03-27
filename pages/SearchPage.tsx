import { useNavigation } from '@react-navigation/native';
// import { SearchBar } from '@rneui/themed';
import { Searchbar } from 'react-native-paper';

import { ArrowLeft } from 'lucide-react-native';
import { type ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, SafeAreaView, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { IconItem } from '../components/atoms/IconItem';
import { TextItem } from '../components/atoms/TextItem';
import { Layout } from '../layouts/Layout';

export const SearchPage = (): ReactNode => {
  const [search, setSearch] = useState('');

  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // const handleSearch = (value: string): void => {
  //   console.log('value', value);
  //   console.log('value currentSearchValue', currentSearchValue);
  //   // setCurrentSearchValue(value);
  //   dispatch(setSearchValue(value));
  //   navigation.goBack();
  // };

  // useEffect(() => {
  //   console.log('[SearchPage] currentSearchValue', currentSearchValue);
  // }, [currentSearchValue]);

  /**
   * Header
   */
  // useEffect(() => {
  //   navigation.setOptions({
  //     headerShown: false
  //   });
  // }, []);

  // const handleEventNavigation = (): void => {
  //   // @ts-expect-error navigate need definition
  //   navigation.navigate('CityEvents');
  // };
  // const updateSearchValue = (value: string): void => {
  //   console.log(value);
  //   setCurrentSearchValue(value);
  // };

  const researchExampleToRemove = ['concert plk', 'sortie à vélo', 'Marché de Noël'];

  return (
    <Layout>
      <SafeAreaView>
        {/* <View
          style={{
            height: HEADER_THEME.headerHeight,
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
            style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
          >
            <IconItem IconElt={ArrowLeft} size="md" stroke="strong" />
          </Pressable>

          <Animated.View
            style={{
              width: 200,
              paddingVertical: 10,
              flex: 5,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <SearchBarItem
              currSearchValue={currentSearchValue}
              setCurrSearchValue={setCurrentSearchValue}
              handleSubmitSearchValue={handleSearch}
              placeholder="Search..."
            />
          </Animated.View>

          <Pressable
            onPress={() => {
              // if (searchOpen) scrollToTop();
              // handleSearch(currentSearchValue);
            }}
            style={{ justifyContent: 'center', alignItems: 'center', flex: 1, padding: 10 }}
          >
            <Animated.View
              style={{
                borderRadius: 100,
                // height: '100%',
                padding: 10,
                // width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <IconItem IconElt={Search} size="md" stroke="strong" />
            </Animated.View>
          </Pressable>
        </View> */}
        {/* <SearchBar
          placeholder={t('screens.events.text.searchBarPlaceholder')}
          containerStyle={{
            backgroundColor: 'transparent'
          }}
          inputContainerStyle={{
            borderRadius: 100
          }}
          leftIconContainerStyle={{
            paddingLeft: 10
          }}
          rightIconContainerStyle={{
            paddingRight: 10
          }}
          onChangeText={setSearch}
          value={search}
          round
        /> */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10
          }}
        >
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
            style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}
          >
            <IconItem IconElt={ArrowLeft} size="md" stroke="strong" />
          </Pressable>
          <Searchbar
            placeholder="Search"
            onChangeText={setSearch}
            value={search}
            style={{
              // width: '100%',
              flexBasis: '80%',
              height: 60,
              flexGrow: 1,
              borderRadius: 100
            }}
          />
        </View>

        <ScrollView
          scrollEventThrottle={16}
          style={{ padding: 20 }}
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{
            gap: 10
          }}
        >
          {researchExampleToRemove.map((item, index) => (
            <Pressable>
              <TextItem size="xl" weight="light">
                {item}
              </TextItem>
            </Pressable>
          ))}
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
};
