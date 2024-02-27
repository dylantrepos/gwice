import { useTranslation } from "react-i18next";
import palette from "../../assets/palette";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { CalendarTranslation } from "../../localization/translations/Calendar";

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
  const { t, i18n } = useTranslation();

  console.log('i18n', i18n.language);
  CalendarTranslation.forEach((translation) => {
    LocaleConfig.locales[translation.key] = translation;
  });

  LocaleConfig.defaultLocale = i18n.language;

  const onDayPress = (day: any) => {
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

    const markedDates = !endDate || startDate === endDate ? {
      [startDate]: { color: palette.blueLight, textColor: 'white' }
    } : {
      [startDate]: { startingDay: true, color: palette.blueLight, textColor: 'white' },
      [endDate]: { endingDay: true, color: palette.blueLight, textColor: 'white' }
    };

    // const markedDates = startDate === endDate ? {
    //   [startDate]: { color: palette.blueLight, textColor: 'white'}
    // } : {
    //   [startDate]: { startingDay: true, color: palette.blueLight, textColor: 'white' },
    //   [endDate]: { endingDay: true, color: palette.blueLight, textColor: 'white' }
    // };
  
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