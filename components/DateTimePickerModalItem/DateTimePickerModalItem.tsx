import { Dimensions, Modal, Pressable, View } from "react-native";
import { useState } from "react";
import palette from "../../assets/palette";
import { Calendar } from "react-native-calendars";
import { TextItem } from "../TextItem/TextItem";
import { PickDateRange } from "../../types/Date";

type DateTimePickerModalItemProps = {
  selectedDates: { startDate: string, endDate: string };
  handleSelectedDates: (dates: { startDate: string, endDate: string }) => void;
  minimumDate?: string;
}

export const DateTimePickerModalItem = ({
  selectedDates,
  handleSelectedDates,
  minimumDate,
}: DateTimePickerModalItemProps) => {

 

  const onDayPress = (day: any) => {
    console.log('day', day);
    if (!selectedDates.startDate || (selectedDates.startDate && selectedDates.endDate)) {
      handleSelectedDates({ startDate: day.dateString, endDate: '' });
    } else if (!selectedDates.endDate) {
      if (new Date(day.dateString) < new Date(selectedDates.startDate)) {
        handleSelectedDates({ startDate: day.dateString, endDate: '' });
        return;
      }
      handleSelectedDates({ startDate: selectedDates.startDate, endDate: day.dateString });
    }
  }

  const getMarkedDates = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const markedDates = startDate === endDate ? {
      [startDate]: { color: palette.blueLight, textColor: 'white'}
    } : {
      [startDate]: { startingDay: true, color: palette.blueLight, textColor: 'white' },
      [endDate]: { endingDay: true, color: palette.blueLight, textColor: 'white' }
    };
  
    let iterDate = new Date(start.getTime() + 24 * 60 * 60 * 1000);
  
    while (iterDate < end) {
      markedDates[iterDate.toISOString().split('T')[0]] = { color: palette.blueLight50, textColor: 'white'};
      iterDate = new Date(iterDate.getTime() + 24 * 60 * 60 * 1000);
    }
  
    return markedDates;
  }
  
  return (
    <Calendar
      markingType='period'
      style={{  
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      }}
      markedDates={getMarkedDates(selectedDates.startDate, selectedDates.endDate)}
      onDayPress={onDayPress}
      allowSelectionOutOfRange={false}
      minDate={minimumDate ?? (new Date()).toISOString().split('T')[0]}
    />
   )
}