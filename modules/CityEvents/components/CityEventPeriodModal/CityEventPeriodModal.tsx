import { Animated, Modal, Pressable, View } from 'react-native';
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useGetPeriod } from "../../hooks/useGetPeriod";
import { BlurView } from "expo-blur";
import { TextItem } from '../../../../components/TextItem/TextItem';
import { PickDateRange } from '../../../../types/Date';
import { DateTimePickerModalItem } from '../../../../components/DateTimePickerModalItem/DateTimePickerModalItem';
import style from './CityEventPeriodModal.style';
import palette from '../../../../assets/palette';
import { RootState } from '../../../../store/store';
import { setCurrentPeriod, setCustomPeriod } from '../../../../reducers/eventReducer';
import { IconItem } from '../../../../components/IconItem/IconItem';
import { CalendarDays, X } from 'lucide-react-native';
import { BottomSheetItem } from '../../../../components/BottomSheetItem/BottomSheetItem';

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
  const { periodsAvailable } = useGetPeriod();
  const { currentPeriod, customPeriod } = useSelector((state: RootState) => state.eventReducer);
  const [currSelectedItem, setCurrSelectedItem] = useState(currentPeriod);

  const handleClose = () => {
    setTimeout(() => {
      setIsPopinVisible(false);
    }, 5);
  }

  const handleUpdatePeriod = (item: string) => {
    setCurrSelectedItem(item);
  }

  const handleConfirm = () => {
    if (currSelectedItem === 'custom') return;
    dispatch(setCurrentPeriod(currSelectedItem));
    handleClose();
  }


  const handleConfirmDate = (dateRange: PickDateRange) => { 
    setShowDatePicker(false);
    dispatch(setCurrentPeriod('custom'));
    dispatch(setCustomPeriod({
      startDate: dateRange.startDate,
      endDate: dateRange.endDate
    }));
    handleClose();
  }

  return (
     <BottomSheetItem
        title={t('period.choose')}
        visible={isPopinVisible}
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
          {periodsAvailable?.map((item: string, index: number) => (
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
                  color: currSelectedItem === item ? '#3988FD' : 'black',
                  }}
                >
                  {t(`period.${item}`)}
                </TextItem>
              </Pressable>
            )
          ))}
            <Pressable
              onPress={() => {
                setShowDatePicker(true);
                handleUpdatePeriod('custom');
              }}
              style={{
                ...style.item,
                display: 'flex',
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
              }}
            >
              <IconItem
                size="md"
                stroke="light"
                IconElt={CalendarDays}
                color={currSelectedItem === 'custom' ? palette.blue : palette.black}
              />
              <TextItem 
                size='md'
              >
                  Open calendar
              </TextItem>
            </Pressable>
            <DateTimePickerModalItem
              handleConfirmDate={handleConfirmDate}
              handleCloseModal={() => setShowDatePicker(false)}
              showDatePicker={showDatePicker}
            />
        </View>
     </BottomSheetItem>
  );
}
