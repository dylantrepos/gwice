import { CalendarDays, ChevronDown, Euro, Search, X } from 'lucide-react-native';
import { useRef, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Pressable, ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { IconItem } from '../../../../components/atoms/IconItem';
import { TextItem } from '../../../../components/atoms/TextItem';
import { type RootState } from '../../../../store/store';
import style from '../../styles/organisms/CityEventListFilterItem.style';

import { useTheme } from '@react-navigation/native';
import { setSearchValue } from '../../../../reducers/eventReducer';
import palette from '../../../../theme/palette';
import { PERIODS } from '../../../../types/Date';
import { getFormattedDate } from '../../../../utils/date';
import { FilterDateModal } from './CityEventPeriodModal';

export const CityEventListFilterItem = (): ReactNode => {
  // Replace with your actual view
  const [isPopinVisible, setIsPopinVisible] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;
  const { currentPeriod, startDate, endDate, searchValue } = useSelector(
    (state: RootState) => state.eventReducer
  );
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const { t } = useTranslation();

  const handlePopin = (): void => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      delay: 0,
      useNativeDriver: false
    }).start();

    setIsPopinVisible(true);
  };

  const handleClearSearch = (): void => {
    dispatch(setSearchValue(''));
  };

  return (
    <>
      <FilterDateModal isPopinVisible={isPopinVisible} setIsPopinVisible={setIsPopinVisible} />

      <ScrollView
        style={style.filterList}
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 20,
          gap: 10
        }}
        showsHorizontalScrollIndicator={false}
      >
        {searchValue && (
          <Pressable
            style={{
              ...style.filter,
              backgroundColor: palette.blue100,
              maxWidth: 250
            }}
            onPress={handleClearSearch}
          >
            <IconItem size="md" stroke="light" IconElt={Search} style={{ flex: 1 }} />
            <TextItem
              style={{
                ...style.filterTitle,
                flexShrink: 1
              }}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {searchValue}
            </TextItem>
            <IconItem size="md" stroke="light" IconElt={X} style={{ flex: 1 }} />
          </Pressable>
        )}
        <Pressable
          style={{
            ...style.filter,
            backgroundColor: colors.buttonBackground
          }}
          onPress={handlePopin}
        >
          <IconItem size="md" stroke="light" IconElt={CalendarDays} />
          <TextItem style={style.filterTitle}>
            {currentPeriod !== PERIODS.CUSTOM
              ? t(`period.${currentPeriod}`)
              : getFormattedDate(startDate, endDate)}
          </TextItem>
          <IconItem size="md" stroke="light" IconElt={ChevronDown} />
        </Pressable>
        <View
          style={{
            ...style.filter,
            backgroundColor: colors.buttonBackground
          }}
        >
          <IconItem size="md" stroke="light" IconElt={Euro} />
          <TextItem style={style.filterTitle}>Tous les prix</TextItem>
          <IconItem size="md" stroke="light" IconElt={ChevronDown} />
        </View>
        <View
          style={{
            ...style.filter,
            backgroundColor: colors.buttonBackground
          }}
        >
          <IconItem size="md" stroke="light" IconElt={Euro} />
          <TextItem style={style.filterTitle}>Trier par</TextItem>
          <IconItem size="md" stroke="light" IconElt={ChevronDown} />
        </View>
      </ScrollView>
    </>
  );
};
