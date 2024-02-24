import { Dimensions, Modal, Pressable, View } from "react-native";
import { useState } from "react";
import palette from "../../assets/palette";
import { Calendar } from "react-native-calendars";
import { TextItem } from "../TextItem/TextItem";
import { PickDateRange } from "../../types/Date";

type DateTimePickerModalItemProps = {
  handleConfirmDate: (date: PickDateRange) => void;
  handleCloseModal: () => void;
  minimumDate?: string;
  showDatePicker: boolean;
}

export const DateTimePickerModalItem = ({
  handleConfirmDate,
  handleCloseModal,
  minimumDate,
  showDatePicker
}: DateTimePickerModalItemProps) => {

  const [selectedDates, setSelectedDates] = useState<{ startDate: string, endDate: string }>({ startDate: '', endDate: '' });

  const onDayPress = (day) => {
    console.log('day', day);
    if (!selectedDates.startDate || (selectedDates.startDate && selectedDates.endDate)) {
      setSelectedDates({ startDate: day.dateString, endDate: '' });
    } else if (!selectedDates.endDate) {
      if (new Date(day.dateString) < new Date(selectedDates.startDate)) {
        setSelectedDates({ startDate: day.dateString, endDate: '' });
        return;
      }
      setSelectedDates({ startDate: selectedDates.startDate, endDate: day.dateString });
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
    <Modal 
      visible={showDatePicker} 
      onRequestClose={handleCloseModal}
      animationType="slide"
      transparent={true}
    >
      <Pressable
        style={{
          position: 'absolute',
          height: Dimensions.get('screen').height,
          justifyContent: 'center',
          alignContent: 'center',
          left: 0,
          right: 0,
          top: 0,
          zIndex: 1000,
          backgroundColor: 'rgba(0,0,0,0.5)',
          paddingHorizontal: 20,
          flex: 1,
        }}
        onPress={handleCloseModal}
      >
        <View
          onStartShouldSetResponder={() => true} 
          style={{
          }}
        >
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
          <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: palette.white,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            gap: 20,
            paddingVertical: 20,
          }}
          >
          <Pressable
            style={{
              backgroundColor: palette.red,
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 100,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
              onPress={handleCloseModal}
            >
              <TextItem
                style={{
                  color: palette.white,
                }}
              >Cancel</TextItem>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: palette.blueLight,
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 100,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }} 
              onPress={() => handleConfirmDate(selectedDates)}
            >
              <TextItem
                style={{
                  color: palette.white,
                }}
              >Confirm</TextItem>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Modal>
   )
}