import { CalendarDays, ChevronLeft } from 'lucide-react-native';
import moment from 'moment';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import palette from '../../../../assets/palette';
import { BottomSheetItem } from '../../../../components/BottomSheetItem/BottomSheetItem';
import { ButtonItem } from '../../../../components/ButtonItem/ButtonItem';
import { DateTimePickerModalItem } from '../../../../components/DateTimePickerModalItem/DateTimePickerModalItem';
import { TextItem } from '../../../../components/TextItem/TextItem';
import {
  setCurrentPeriod,
  setCustomPeriod,
  setEndDatePeriod,
  setStartDatePeriod
} from '../../../../reducers/eventReducer';
import { type RootState } from '../../../../store/store';
import { PERIODS } from '../../../../types/Date';
import { getFormattedDate, getPeriod } from '../../../../utils/date';
import style, { themeStyle } from './CityEventPeriodModal.style';
// import { getFormatedDate } from '../../../CityWeather/utils/utils';

interface FilterDateModalProps {
  isPopinVisible: boolean;
  setIsPopinVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FilterDateModal = ({ isPopinVisible, setIsPopinVisible }: FilterDateModalProps) => {
  // Replace with your actual view
  const [showDatePicker, setShowDatePicker] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    currentPeriod,
    customPeriod,
    startDate: storeStartDate,
    endDate: storeEndDate
  } = useSelector((state: RootState) => state.eventReducer);
  const { theme } = useSelector((state: RootState) => state.generalReducer);
  const [currSelectedItem, setCurrSelectedItem] = useState(currentPeriod);
  const [selectedDates, setSelectedDates] = useState<{ startDate: string; endDate: string }>({
    startDate: '',
    endDate: ''
  });

  const handleClose = () => {
    setTimeout(() => {
      setIsPopinVisible(false);
    }, 5);
  };

  const handleUpdatePeriod = (item: string) => {
    setCurrSelectedItem(item);
  };

  const handleConfirm = () => {
    dispatch(setCurrentPeriod(currSelectedItem));

    if (showDatePicker) {
      setShowDatePicker(false);
      const startCustom = moment(selectedDates?.startDate).add(1, 'hour').toISOString();
      const endCustom = moment(
        selectedDates.endDate.length > 0 ? selectedDates.endDate : selectedDates.startDate
      )
        .add(1, 'hour')
        .endOf('day')
        .add(1, 'hour')
        .toISOString();

      dispatch(setStartDatePeriod(startCustom));
      dispatch(setEndDatePeriod(endCustom));
      dispatch(
        setCustomPeriod({
          startDate: startCustom,
          endDate: endCustom
        })
      );
    } else {
      console.log('currentPeriod', currentPeriod);

      if (currSelectedItem === 'custom' && customPeriod) {
        dispatch(setStartDatePeriod(customPeriod.startDate));
        dispatch(setEndDatePeriod(customPeriod.endDate));
      } else {
        const dateRange = getPeriod(currSelectedItem as PERIODS);
        dispatch(setStartDatePeriod(dateRange.start.toISOString()));
        dispatch(setEndDatePeriod(dateRange.end.toISOString()));
      }
    }

    handleClose();
  };

  return (
    <BottomSheetItem
      title={t('period.choose')}
      visible={isPopinVisible}
      setVisibility={setIsPopinVisible}
      handleConfirm={handleConfirm}
      disableConfirm={showDatePicker && !selectedDates.startDate}
      handleClose={handleClose}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 5,
          paddingTop: 10
        }}
      >
        {!showDatePicker ? (
          <View>
            {Object.values(PERIODS)?.map(
              (item: string, index: number) =>
                item !== 'custom' && (
                  <Pressable
                    key={`${item}-${index}`}
                    onPress={() => {
                      handleUpdatePeriod(item);
                    }}
                    style={[style.item, currSelectedItem === item && style.selectedItem]}
                  >
                    <TextItem
                      style={{
                        ...style.itemText,
                        color:
                          currSelectedItem === item
                            ? palette.blueLight
                            : themeStyle.textDefault[theme]
                      }}
                    >
                      {t(`period.${item}`)}
                    </TextItem>
                  </Pressable>
                )
            )}
            {customPeriod?.startDate && (
              <Pressable
                onPress={() => {
                  handleUpdatePeriod('custom');
                }}
                style={[style.item, currSelectedItem === 'custom' && style.selectedItem]}
              >
                <TextItem
                  style={{
                    ...style.itemText,
                    color:
                      currSelectedItem === 'custom'
                        ? palette.blueLight
                        : themeStyle.textDefault[theme]
                  }}
                >
                  {getFormattedDate(customPeriod.startDate, customPeriod?.endDate) ?? 'error'}
                </TextItem>
              </Pressable>
            )}

            <ButtonItem
              title={t('screens.events.text.openCalendar')}
              IconElt={CalendarDays}
              type="transparentPrimary"
              handlePress={() => {
                setShowDatePicker(!showDatePicker);
                handleUpdatePeriod('custom');
              }}
            />
          </View>
        ) : (
          <View>
            <DateTimePickerModalItem
              selectedDates={selectedDates}
              handleSelectedDates={setSelectedDates}
            />
            <ButtonItem
              title={t('screens.events.text.returnPeriods')}
              IconElt={ChevronLeft}
              type="transparentPrimary"
              handlePress={() => {
                setShowDatePicker(false);
              }}
            />
          </View>
        )}
      </View>
    </BottomSheetItem>
  );
};
