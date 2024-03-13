import { useTheme } from '@react-navigation/native';
import { useMemo, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useSelector } from 'react-redux';
import { CalendarTranslation } from '../../../localization/translations/Calendar';
import { type RootState } from '../../../store/store';
import palette from '../../../theme/palette';

interface DateTimePickerModalItemProps {
  selectedDates: { startDate: string; endDate: string };
  handleSelectedDates: (dates: { startDate: string; endDate: string }) => void;
  minimumDate?: string;
}

export const DateTimePickerModalItem = ({
  selectedDates,
  handleSelectedDates,
  minimumDate
}: DateTimePickerModalItemProps): ReactNode => {
  const { i18n } = useTranslation();
  const { colors } = useTheme();
  const { isDarkMode } = useSelector((state: RootState) => state.generalReducer);

  useMemo(() => {
    CalendarTranslation.forEach((translation) => {
      LocaleConfig.locales[translation.key] = translation;
    });
  }, []);

  LocaleConfig.defaultLocale = i18n.language;

  const onDayPress = (day: any): void => {
    if (!selectedDates.startDate || (selectedDates.startDate && selectedDates.endDate)) {
      handleSelectedDates({ startDate: day.dateString, endDate: '' });
    } else if (!selectedDates.endDate) {
      if (new Date(day.dateString as string) < new Date(selectedDates.startDate)) {
        handleSelectedDates({ startDate: day.dateString, endDate: '' });
        return;
      }
      handleSelectedDates({ startDate: selectedDates.startDate, endDate: day.dateString });
    }
  };

  const getMarkedDates = (startDate: string, endDate: string): any => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const markedDates =
      !endDate || startDate === endDate
        ? {
            [startDate]: { color: palette.bluePrimary, textColor: 'white' }
          }
        : {
            [startDate]: { startingDay: true, color: palette.bluePrimary, textColor: 'white' },
            [endDate]: { endingDay: true, color: palette.bluePrimary, textColor: 'white' }
          };

    let iterDate = new Date(start.getTime() + 24 * 60 * 60 * 1000);

    while (iterDate < end) {
      markedDates[iterDate.toISOString().split('T')[0]] = {
        color: palette.bluePrimary,
        textColor: 'white'
      };
      iterDate = new Date(iterDate.getTime() + 24 * 60 * 60 * 1000);
    }

    return markedDates;
  };

  return (
    <Calendar
      markingType="period"
      style={{
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
      }}
      theme={{
        backgroundColor: colors.calendarBackground,
        calendarBackground: colors.calendarBackground,
        textSectionTitleColor: isDarkMode ? palette.white900 : palette.blackPrimary,
        textSectionTitleDisabledColor: '#d9e1e8',
        selectedDayBackgroundColor: palette.blue600,
        selectedDayTextColor: palette.whitePrimary,
        todayTextColor: isDarkMode ? palette.blue600 : palette.bluePrimary,
        dayTextColor: isDarkMode ? palette.whitePrimary : palette.blackPrimary,
        textDisabledColor: isDarkMode ? palette.gray800 : palette.gray400,
        selectedDotColor: '#ffffff',
        arrowColor: isDarkMode ? palette.whitePrimary : palette.blackPrimary,
        disabledArrowColor: '#d9e1e8',
        monthTextColor: isDarkMode ? palette.whitePrimary : palette.blackPrimary,
        indicatorColor: 'blue'
      }}
      markedDates={getMarkedDates(selectedDates.startDate, selectedDates.endDate)}
      onDayPress={onDayPress}
      allowSelectionOutOfRange={false}
      minDate={minimumDate ?? new Date().toISOString().split('T')[0]}
    />
  );
};
