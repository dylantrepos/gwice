import { CalendarDays, ChevronDown, Euro } from "lucide-react-native";
import { Pressable, ScrollView, View, Animated } from 'react-native';
import style, { themeStyle } from './CityEventListFilterItem.style';
import { useEffect, useRef, useState } from "react";
import moment from 'moment-timezone';
import { useSelector } from "react-redux";
import { TextItem } from "../../../../components/TextItem/TextItem";
import { IconItem } from "../../../../components/IconItem/IconItem";
import { RootState } from "../../../../store/store";
import { useTranslation } from "react-i18next";

import { PERIODS } from "../../../../types/Date";
import { FilterDateModal } from "../CityEventPeriodModal/CityEventPeriodModal";
import { getFormattedDate } from "../../../../utils/date";

export const CityEventListFilterItem = () => {
  // Replace with your actual view
  const [isPopinVisible, setIsPopinVisible] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;
  const { theme } = useSelector((state: RootState) => state.generalReducer);
  const { currentPeriod, startDate, endDate } = useSelector((state: RootState) => state.eventReducer);
  const { t } = useTranslation();

  const handlePopin = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      delay: 0,
      useNativeDriver: false,
    }).start();

    setIsPopinVisible(true);
  }

  return (
    <>
      <FilterDateModal
        isPopinVisible={isPopinVisible}
        setIsPopinVisible={setIsPopinVisible}
      />

      <ScrollView
        style={style.filterList}
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 20,
          gap: 10,
        }}
        showsHorizontalScrollIndicator={false}
      >
        <Pressable
          style={{
            ...style.filter,
            backgroundColor: themeStyle.filterBackgroundColor[theme] as string,
          }}
          onPress={handlePopin}
        >
          <IconItem
            size="md"
            stroke="light"
            IconElt={CalendarDays}
          />
          <TextItem 
            style={style.filterTitle}
          >
            {currentPeriod !== PERIODS.CUSTOM
              ? t(`period.${currentPeriod}`)
              : getFormattedDate(startDate, endDate)
            }
          </TextItem>
          <IconItem
            size="md"
            stroke="light"
            IconElt={ChevronDown}
          />
        </Pressable>
        <View
          style={{
            ...style.filter,
            backgroundColor: themeStyle.filterBackgroundColor[theme] as string,
          }}
        >
          <IconItem
            size="md"
            stroke="light"
            IconElt={Euro}
          />
          <TextItem 
            style={style.filterTitle}
          >
            Tous les prix
          </TextItem>
          <IconItem
            size="md"
            stroke="light"
            IconElt={ChevronDown}
          />
        </View>
        <View
          style={{
            ...style.filter,
            backgroundColor: themeStyle.filterBackgroundColor[theme] as string,
          }}
        >
          <IconItem
            size="md"
            stroke="light"
            IconElt={Euro}
          />
          <TextItem 
            style={style.filterTitle}
          >
            Trier par
          </TextItem>
          <IconItem
            size="md"
            stroke="light"
            IconElt={ChevronDown}
          />
        </View>
      </ScrollView>
    </>
  );
}

