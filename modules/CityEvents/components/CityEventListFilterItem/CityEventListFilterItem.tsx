import { CalendarDays, ChevronDown, Euro, Filter } from "lucide-react-native";
import { Modal, Pressable, ScrollView, View, Animated, Platform } from 'react-native';
import style, { themeStyle } from './CityEventListFilterItem.style';
import { useEffect, useRef, useState } from "react";
import { BlurView } from 'expo-blur';
import moment from 'moment-timezone';
import { useDispatch, useSelector } from "react-redux";
import { TextItem } from "../../../../components/TextItem/TextItem";
import { DateTimePickerModalItem } from "../../../../components/DateTimePickerModalItem/DateTimePickerModalItem";
import { IconItem } from "../../../../components/IconItem/IconItem";
import { RootState } from "../../../../store/store";
import { useTranslation } from "react-i18next";
import { FilterDateItem, filterDate } from "../../utils/date";
import { useGetPeriod } from "../../hooks/useGetPeriod";
import { PERIODS } from "../../../../types/Date";
import { FilterDateModal } from "../CityEventPeriodModal/CityEventPeriodModal";


type CityEventListFilterItemProps = {
  startDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  endDate: Date;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
  selectedItemDate: FilterDateItem;
  setSelectedItemDate: React.Dispatch<React.SetStateAction<FilterDateItem>>;
}

export const CityEventListFilterItem = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  selectedItemDate,
  setSelectedItemDate
}: CityEventListFilterItemProps) => {
  // Replace with your actual view
  const [isPopinVisible, setIsPopinVisible] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;
  const animatedValue = useRef(new Animated.Value(0)).current;
  const { theme } = useSelector((state: RootState) => state.generalReducer);
  const { currentPeriod } = useGetPeriod();
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
        animatedValue={animatedValue}
        isPopinVisible={isPopinVisible}
        setIsPopinVisible={setIsPopinVisible}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        selectedItemDate={selectedItemDate}
        setSelectedItemDate={setSelectedItemDate}
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
            {selectedItemDate.id !== 5
              ? t(`period.${currentPeriod}`)
              : moment.utc(startDate).format('DDMMYYYY').toString() !== moment.utc(endDate).format('DDMMYYYY').toString()
                ? `${moment.utc(startDate).format('DD/MM/YYYY')} - ${moment.utc(endDate).format('DD/MM/YYYY')}`
                : moment.utc(startDate).format('DD/MM/YYYY')
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

