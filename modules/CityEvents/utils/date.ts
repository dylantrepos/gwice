import { addDays, endOfDay, endOfWeek, format, formatDistanceToNow, isAfter, isBefore, isWeekend, isWithinInterval } from "date-fns";
import { Timing } from "../types/Events";
import { fr } from 'date-fns/locale';

export type FilterDateItem = {
  id: number;
  label: string;
  value: string;
  translationKey: string;
}

export const filterDate: FilterDateItem[] = [
  {
    id: 0,
    label: 'Toujours',
    value: 'always',
    translationKey: 'screens.events.text.periodTitleAlways'
  },
  {
    id: 1,
    label: 'Aujourd\'hui',
    value: 'today',
    translationKey: 'screens.events.text.periodTitleToday'
  },
  {
    id: 2,
    label: 'Demain',
    value: 'tomorrow',
    translationKey: 'screens.events.text.periodTitleTomorrow'
  },
  {
    id: 3,
    label: 'Ce weekend',
    value: 'weekend',
    translationKey: 'screens.events.text.periodTitleWeekend'
  },
  {
    id: 4,
    label: 'Cette semaine',
    value: 'week',
    translationKey: 'screens.events.text.periodTitleWeek'
  },
  {
    id: 5,
    label: 'Choisir une date',
    value: 'choose',
    translationKey: ''
  },
]


const findClosestWeekendDate = (timings: Timing[]): Date | null => {
  let closestWeekendDate: Date | null = null;

  const now = new Date();
  const endOfNextWeek = endOfWeek(addDays(now, 7));

  for (const timing of timings) {
    const date = new Date(timing.begin);

    if (isWeekend(date) && isWithinInterval(date, { start: now, end: endOfNextWeek })) {
      if (closestWeekendDate === null || date < closestWeekendDate) {
        closestWeekendDate = date;
      }
    }
  }

  return closestWeekendDate;
}

const findClosestDate = (timings: Timing[], startDate: Date): Date | null => {
  let closestDate: Date | null = null;
  let smallestDifference: number | null = null;

  for (const timing of timings) {
    const date = new Date(timing.begin);
    const difference = Math.abs(date.getTime() - startDate.getTime());

    if (smallestDifference === null || difference < smallestDifference) {
      smallestDifference = difference;
      closestDate = date;
    }
  }

  return closestDate;
}

type FormatDateProps = {
  inputDateStart: Date;
  inputDateEnd: Date;
  selectedItemDate: FilterDateItem;
  timings: Timing[] | null;
  title?: string;
  startDate: Date;
}

export const formatDate = ({
  inputDateStart,
  inputDateEnd,
  selectedItemDate,
  timings,
  title,
  startDate
}: FormatDateProps): string => {
  const now = new Date();
  const endOfToday = endOfDay(now);
  const endOfTomorrow = endOfDay(addDays(now, 1));
  const endOfDayAfterTomorrow = endOfDay(addDays(now, 2));

  if (selectedItemDate.value === 'weekend' && timings) {
      const closestWeekendDate = findClosestWeekendDate(timings);
      if (closestWeekendDate) {
        return format(closestWeekendDate, 'eeee dd MMMM à HH:mm', { locale: fr });
      }
  }

  if (selectedItemDate.value === 'choose' && timings) {
      const closestDate = findClosestDate(timings, startDate);
      if (closestDate) {
        if (isBefore(inputDateStart, now) && isAfter(inputDateEnd, now)) {
          return `En ce moment jusqu'à ${format(inputDateEnd, 'HH:mm')}`;
        }
        
        if (isAfter(closestDate, now) && isBefore(closestDate, endOfToday)) {
          return `Dans ${formatDistanceToNow(closestDate, { locale: fr })}`;
        } else if (isAfter(closestDate, endOfToday) && isBefore(closestDate, endOfTomorrow)) {
          return `Demain à ${format(closestDate, 'HH:mm')}`;
        }
        return format(closestDate, 'eeee dd MMMM à HH:mm', { locale: fr });
      }
  }

  if (isBefore(inputDateStart, now) && isAfter(inputDateEnd, now)) {
    return `En ce moment jusqu'à ${format(inputDateEnd, 'HH:mm')}`;
  }

  if (isAfter(inputDateStart, now) && isBefore(inputDateStart, endOfToday)) {
    return `Dans ${formatDistanceToNow(inputDateStart, { locale: fr })}`;
  } else if (isAfter(inputDateStart, endOfToday) && isBefore(inputDateStart, endOfTomorrow)) {
    return `Demain à ${format(inputDateStart, 'HH:mm')}`;
  } else {
    return format(inputDateStart, 'eeee dd MMMM à HH:mm', { locale: fr });
  }
}