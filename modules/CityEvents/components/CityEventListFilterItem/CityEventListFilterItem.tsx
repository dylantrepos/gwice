import { CalendarDays, ChevronDown, Euro } from 'lucide-react-native';
import { useRef, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Pressable, ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';
import { IconItem } from '../../../../components/IconItem/IconItem';
import { TextItem } from '../../../../components/TextItem/TextItem';
import { type RootState } from '../../../../store/store';
import style, { themeStyle } from './CityEventListFilterItem.style';

import { PERIODS } from '../../../../types/Date';
import { getFormattedDate } from '../../../../utils/date';
import { FilterDateModal } from '../CityEventPeriodModal/CityEventPeriodModal';

export const CityEventListFilterItem = (): ReactNode => {
  // Replace with your actual view
  const [isPopinVisible, setIsPopinVisible] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;
  const { theme } = useSelector((state: RootState) => state.generalReducer);
  const { currentPeriod, startDate, endDate } = useSelector(
    (state: RootState) => state.eventReducer
  );
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
        <Pressable
          style={{
            ...style.filter,
            backgroundColor: themeStyle.filterBackgroundColor[theme]
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
            backgroundColor: themeStyle.filterBackgroundColor[theme]
          }}
        >
          <IconItem size="md" stroke="light" IconElt={Euro} />
          <TextItem style={style.filterTitle}>Tous les prix</TextItem>
          <IconItem size="md" stroke="light" IconElt={ChevronDown} />
        </View>
        <View
          style={{
            ...style.filter,
            backgroundColor: themeStyle.filterBackgroundColor[theme]
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
