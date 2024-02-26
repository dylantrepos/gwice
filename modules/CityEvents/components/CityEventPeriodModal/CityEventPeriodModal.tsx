import { Animated, Modal, Pressable, View } from 'react-native';
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { TextItem } from '../../../../components/TextItem/TextItem';
import { PERIODS } from '../../../../types/Date';
import { DateTimePickerModalItem } from '../../../../components/DateTimePickerModalItem/DateTimePickerModalItem';
import style, { themeStyle } from './CityEventPeriodModal.style';
import palette from '../../../../assets/palette';
import { RootState } from '../../../../store/store';
import { setCurrentPeriod, setCustomPeriod, setEndDatePeriod, setStartDatePeriod } from '../../../../reducers/eventReducer';
import { CalendarDays, ChevronLeft, X } from 'lucide-react-native';
import { BottomSheetItem } from '../../../../components/BottomSheetItem/BottomSheetItem';
import { ButtonItem } from '../../../../components/ButtonItem/ButtonItem';
import { getFormattedDate, getPeriod } from '../../../../utils/date';
import moment from 'moment';
// import { getFormatedDate } from '../../../CityWeather/utils/utils';

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
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { currentPeriod, startDate: storeStartDate, endDate: storeEndDate } = useSelector((state: RootState) => state.eventReducer);
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

    if (showDatePicker) {
      setShowDatePicker(false);
      
      dispatch(setStartDatePeriod(moment(selectedDates?.startDate).add(1, 'hour').toISOString()));
      dispatch(setEndDatePeriod(moment(selectedDates?.endDate).add(1, 'hour').endOf('day').add(1, 'hour').toISOString()));
    } else {
      /**
       * ! Manage custom date is reselected
       */
      const dateRange = getPeriod(currSelectedItem as PERIODS);
      dispatch(setStartDatePeriod(dateRange.start.toISOString()));
      dispatch(setEndDatePeriod(dateRange.end.toISOString()));
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
            {currSelectedItem === 'custom' && (
              <Pressable
                onPress={() => {
                  handleUpdatePeriod('custom');
                }}
                style={[
                  style.item,
                  currSelectedItem === 'custom' && style.selectedItem
                ]}
              >
                <TextItem 
                  style={{
                  ...style.itemText,
                  color: currSelectedItem === 'custom' ? palette.blueLight : themeStyle.textDefault[theme],
                  }}
                >
                  {getFormattedDate(storeStartDate, storeEndDate) ?? 'error'}
                </TextItem>
              </Pressable>
            )}

            <ButtonItem
              title='Open calendar'
              IconElt={CalendarDays}
              type='transparentPrimary'
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
                type='transparentPrimary'
                handlePress={() => {
                  setShowDatePicker(false);
                }}
              />
            </View>}
        </View>
     </BottomSheetItem>
  );
}
