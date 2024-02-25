import { Animated, Modal, Pressable, View } from 'react-native';
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { BlurView } from "expo-blur";
import { TextItem } from '../../../../components/TextItem/TextItem';
import { PERIODS, PickDateRange } from '../../../../types/Date';
import { DateTimePickerModalItem } from '../../../../components/DateTimePickerModalItem/DateTimePickerModalItem';
import style, { themeStyle } from './CityEventPeriodModal.style';
import palette from '../../../../assets/palette';
import { RootState } from '../../../../store/store';
import { setCurrentPeriod, setCustomPeriod } from '../../../../reducers/eventReducer';
import { IconItem } from '../../../../components/IconItem/IconItem';
import { CalendarDays, ChevronLeft, X } from 'lucide-react-native';
import { BottomSheetItem } from '../../../../components/BottomSheetItem/BottomSheetItem';
import { ButtonItem } from '../../../../components/ButtonItem/ButtonItem';
import { Tab, Text, TabView } from '@rneui/themed';
import { Button } from '@rneui/themed';



type FilterDateModalProps = {
  isPopinVisible: boolean;
  setIsPopinVisible: React.Dispatch<React.SetStateAction<boolean>>;
}


export const FilterDateModal = ({
  isPopinVisible,
  setIsPopinVisible,
}: FilterDateModalProps) => {
  // Replace with your actual view
  const [showDatePicker, setShowDatePicker] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { currentPeriod, customPeriod } = useSelector((state: RootState) => state.eventReducer);
  const { theme } = useSelector((state: RootState) => state.generalReducer);
  const [currSelectedItem, setCurrSelectedItem] = useState(currentPeriod);
  const [selectedDates, setSelectedDates] = useState<{ startDate: string, endDate: string }>({ startDate: '', endDate: '' });

  const handleClose = () => {
    setTimeout(() => {
      setIsPopinVisible(false);
    }, 5);
  }


  const handleUpdatePeriod = (item: string) => {
    setCurrSelectedItem(item);
  }

  const handleConfirm = () => {
    dispatch(setCurrentPeriod(currSelectedItem));
    if (currSelectedItem === 'custom') {
      setShowDatePicker(false);
      dispatch(setCustomPeriod({
        startDate: selectedDates?.startDate,
        endDate: selectedDates?.endDate,
      }));
    } 
    handleClose();
  }

  return (
     <BottomSheetItem
        title={t('period.choose')}
        visible={isPopinVisible}
        setVisibility={setIsPopinVisible}
        handleConfirm={handleConfirm}
        handleClose={handleClose}
     >
       <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
            paddingTop: 10,
          }}
        >
          {!showDatePicker ? <View>
            {(Object.values(PERIODS))?.map((item: string, index: number) => (
            item !== 'custom' && (
              <Pressable
                key={`${item}-${index}`}
                onPress={() => {
                  handleUpdatePeriod(item);
                }}
                style={[
                  style.item,
                  currSelectedItem === item && style.selectedItem
                ]}
              >
                <TextItem 
                  style={{
                  ...style.itemText,
                  color: currSelectedItem === item ? palette.blueLight : themeStyle.textDefault[theme],
                  }}
                >
                  {t(`period.${item}`)}
                </TextItem>
              </Pressable>
            )
          ))}

            <ButtonItem
              title='Open calendar'
              IconElt={CalendarDays}
              type='transparent'
              handlePress={() => {
                setShowDatePicker(!showDatePicker);
                handleUpdatePeriod('custom');
              }}
            />
          </View> 
          : <View>
              <DateTimePickerModalItem
                selectedDates={selectedDates}
                handleSelectedDates={setSelectedDates}
              />
              <ButtonItem
                title={'Return to period'}
                IconElt={ChevronLeft}
                type='transparent'
                handlePress={() => {
                  setShowDatePicker(false);
                }}
              />
            </View>}
        </View>
     </BottomSheetItem>
  );
}
