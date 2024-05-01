import moment from 'moment';
import { PERIODS } from '../types/Date';

import {
  addDays,
  endOfDay,
  endOfWeek,
  format,
  formatDistanceToNow,
  isAfter,
  isBefore,
  isWeekend,
  isWithinInterval
} from 'date-fns';
import { fr } from 'date-fns/locale';
import { type Timing } from '../features/CityEvents/types/CityEvent';

export const getPeriod = (dateRange: PERIODS): { start: string; end: string; title: PERIODS } => {
  switch (dateRange) {
    case PERIODS.ALWAYS:
      return {
        start: moment().utc().add(2, 'hours').startOf('day').format('YYYY-MM-DDTHH:mm:ss'),
        end: moment().add(10, 'year').endOf('day').format('YYYY-MM-DDTHH:mm:ss'),
        title: PERIODS.ALWAYS
      };
    case PERIODS.TODAY:
      return {
        start: moment().startOf('day').format('YYYY-MM-DDTHH:mm:ss'),
        end: moment().endOf('day').format('YYYY-MM-DDTHH:mm:ss'),
        title: PERIODS.TODAY
      };
    case PERIODS.TOMORROW:
      return {
        start: moment().add(1, 'day').startOf('day').format('YYYY-MM-DDTHH:mm:ss'),
        end: moment().add(1, 'day').endOf('day').format('YYYY-MM-DDTHH:mm:ss'),
        title: PERIODS.TOMORROW
      };
    case PERIODS.WEEKEND:
      return {
        start: isAfter(
          moment().format('YYYY-MM-DDTHH:mm:ss'),
          moment.utc().isoWeekday(6).startOf('day').format('YYYY-MM-DDTHH:mm:ss')
        )
          ? moment().format('YYYY-MM-DDTHH:mm:ss')
          : moment.utc().isoWeekday(6).startOf('day').format('YYYY-MM-DDTHH:mm:ss'),
        end: moment.utc().isoWeekday(7).endOf('day').format('YYYY-MM-DDTHH:mm:ss'),
        title: PERIODS.WEEKEND
      };
    case PERIODS.WEEK:
      return {
        start: moment().utc().add(2, 'hour').format('YYYY-MM-DDTHH:mm:ss'),
        end: moment.utc().isoWeekday(7).endOf('day').format('YYYY-MM-DDTHH:mm:ss'),
        title: PERIODS.WEEK
      };
    default:
      return {
        start: moment().startOf('day').format('YYYY-MM-DDTHH:mm:ss'),
        end: moment().add(10, 'year').endOf('day').format('YYYY-MM-DDTHH:mm:ss'),
        title: PERIODS.ALWAYS
      };
  }
};

export const getFormattedDate = (start: string, end: string): string => {
  const startDate = moment.utc(start).format('DD/MM/YYYY');
  const endDate = moment.utc(end).format('DD/MM/YYYY');
  return startDate !== endDate ? `${startDate} - ${endDate}` : startDate;
};

export interface FilterDateItem {
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
    label: "Aujourd'hui",
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
  }
];

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
};

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
};

interface FormatDateProps {
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
};
