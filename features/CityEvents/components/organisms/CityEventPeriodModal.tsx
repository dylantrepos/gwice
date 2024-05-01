import { CalendarDays, ChevronLeft } from 'lucide-react-native';
import moment from 'moment';
import { useEffect, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonItem } from '../../../../components/atoms/ButtonItem';
import { DateTimePickerModalItem } from '../../../../components/atoms/DateTimePickerModalItem';
import { BottomSheetItem } from '../../../../components/molecules/BottomSheetItem';
import { SelectItem, type Choice } from '../../../../components/molecules/SelectItem';
import i18n from '../../../../localization/i18n';
import {
  setCurrentPeriod,
  setCustomPeriod,
  setEndDatePeriod,
  setStartDatePeriod
} from '../../../../reducers/eventReducer';
import { type RootState } from '../../../../store/store';
import { PERIODS } from '../../../../types/Date';
import { getFormattedDate, getPeriod } from '../../../../utils/date';
import styles from '../../styles/organisms/CityEventPeriodModal.style';

interface FilterDateModalProps {
  isPopinVisible: boolean;
  setIsPopinVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

type SelectChoices = Choice[];

export const FilterDateModal = ({
  isPopinVisible,
  setIsPopinVisible
}: FilterDateModalProps): ReactNode => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { currentPeriod, customPeriod } = useSelector((state: RootState) => state.eventReducer);
  const [currSelectedItem, setCurrSelectedItem] = useState(currentPeriod);
  const [selectChoices, setSelectChoices] = useState<SelectChoices>([]);
  const [selectedDates, setSelectedDates] = useState<{ startDate: string; endDate: string }>({
    startDate: '',
    endDate: ''
  });

  const handleClose = (): void => {
    setIsPopinVisible(false);
  };

  const handleUpdatePeriod = (item: string): void => {
    setCurrSelectedItem(item);
  };

  const handleConfirm = (): void => {
    dispatch(setCurrentPeriod(currSelectedItem));

    if (showDatePicker) {
      dispatch(setCurrentPeriod('custom'));
      setShowDatePicker(false);
      setCurrSelectedItem('custom');
      const startCustom = moment.utc(selectedDates?.startDate).toISOString();
      const endCustom = moment
        .utc(selectedDates.endDate.length > 0 ? selectedDates.endDate : selectedDates.startDate)
        .endOf('day')
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
      if (currSelectedItem === 'custom' && customPeriod) {
        dispatch(setStartDatePeriod(customPeriod.startDate));
        dispatch(setEndDatePeriod(customPeriod.endDate));
      } else {
        const dateRange = getPeriod(currSelectedItem as PERIODS);
        dispatch(setStartDatePeriod(dateRange.start));
        dispatch(setEndDatePeriod(dateRange.end));
      }
      dispatch(setCurrentPeriod(currSelectedItem));
    }

    handleClose();
  };

  useEffect(() => {
    setSelectChoices([
      ...Object.values(PERIODS).map((item) =>
        item !== 'custom'
          ? {
              label: t(`period.${item}`),
              value: item
            }
          : customPeriod?.startDate
            ? {
                label: getFormattedDate(customPeriod.startDate, customPeriod?.endDate) ?? 'error',
                value: 'custom'
              }
            : null
      )
    ]);
  }, [currSelectedItem, i18n.language]);

  return (
    <BottomSheetItem
      title={t('period.choose')}
      visible={isPopinVisible}
      setVisibility={setIsPopinVisible}
      handleConfirm={handleConfirm}
      disableConfirm={showDatePicker && selectedDates.startDate.length === 0}
      handleClose={handleClose}
      style={styles.bottomSheetContainer}
    >
      {showDatePicker ? (
        <DateTimePickerModalItem
          selectedDates={selectedDates}
          handleSelectedDates={setSelectedDates}
        />
      ) : (
        <SelectItem
          choices={selectChoices}
          activeChoice={currSelectedItem}
          handleUpdateChoice={handleUpdatePeriod}
        />
      )}
      <ButtonItem
        title={t(
          showDatePicker ? 'screens.events.text.returnPeriods' : 'screens.events.text.openCalendar'
        )}
        IconElt={showDatePicker ? ChevronLeft : CalendarDays}
        variant="clear"
        handlePress={() => {
          setShowDatePicker(!showDatePicker);
        }}
      />
    </BottomSheetItem>
  );
};
