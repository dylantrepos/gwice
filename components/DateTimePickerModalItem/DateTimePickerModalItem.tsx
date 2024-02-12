import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Dimensions, Platform, Pressable } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

type DateTimePickerModalItemProps = {
  setShowDatePicker: React.Dispatch<React.SetStateAction<boolean>>;
  handleOnChange: (event: DateTimePickerEvent, date?: Date | undefined) => void;
  datePickerValue: Date;
  minimumDate?: Date;
}

export const DateTimePickerModalItem = ({
  setShowDatePicker,
  handleOnChange,
  datePickerValue,
  minimumDate,
}: DateTimePickerModalItemProps) => {
  return (
    Platform.OS === 'ios' ? (
       <Pressable
         onPress={() => {
           setShowDatePicker(false);
         }}
         style={{
           position: 'absolute',
           height: Dimensions.get('screen').height,
           bottom: -30,
           justifyContent: 'center',
           alignContent: 'center',
           left: -20,
           right: -20,
           zIndex: 1000,
           backgroundColor: 'rgba(0,0,0,0.5)',
           paddingHorizontal: 5,
           flex: 1,
         }}
       >

        <DateTimePicker
          style={{
            minHeight: 350,
            borderRadius: 10,
            backgroundColor: 'white',
            padding: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: .5,
            shadowRadius: 6,
          }}
          value={datePickerValue}
          mode="date"
          display="inline"
          minimumDate={minimumDate}
          onChange={handleOnChange}
          themeVariant="light"
        />
       </Pressable>
   ) : (
         <DateTimePicker
           value={datePickerValue}
           positiveButton={{
             label: 'Valider', 
           }}
           negativeButton={{
             label: '', 
             textColor: 'red'
           }}
           mode="date"
           display="default"
           minimumDate={minimumDate}
           onChange={handleOnChange}
         />
       )
   )
}