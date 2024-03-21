import { format, formatDistanceToNow, isBefore } from 'date-fns';
import { enGB, fr } from 'date-fns/locale';
import i18n from 'i18next';
import moment from 'moment';
import { type Timing } from '../features/CityEvents/types/Events';

export interface FilterDateItem {
  id: number;
  label: string;
  value: string;
}

export const formatTitle = (title: string): string => {
  const titleUpdate = title.split('-')[0];
  return titleUpdate[0].toUpperCase() + titleUpdate.slice(1);
};

interface FormatDateProps {
  nextDate: string;
  timings: Timing[];
  period: string;
}

export const formatDate = ({ nextDate, timings, period }: FormatDateProps): string => {
  if (period === 'today') {
    switch (i18n.language) {
      case 'fr':
        return `${i18n.t('period.in')} ${formatDistanceToNow(nextDate, { locale: fr })}`;
      default:
        return `${i18n.t('period.in')} ${formatDistanceToNow(nextDate, { locale: enGB })}`;
    }
  }

  if (period === 'tomorrow') {
    return `${i18n.t('period.tomorrowAt')} ${format(new Date(nextDate), 'HH:mm')}`;
  }

  const nextDateFormated = new Date(nextDate);
  const endOfToday = moment().endOf('day').toDate();
  const endOfTomorrow = moment(endOfToday).add(1, 'day').endOf('day').toDate();

  if (isBefore(nextDateFormated, endOfToday)) {
    switch (i18n.language) {
      case 'fr':
        return `${i18n.t('period.in')} ${formatDistanceToNow(nextDateFormated, { locale: fr })}`;
      default:
        return `${i18n.t('period.in')} ${formatDistanceToNow(nextDateFormated, { locale: enGB })}`;
    }
  }
  if (isBefore(nextDateFormated, endOfTomorrow)) {
    return `${i18n.t('period.tomorrowAt')} ${format(nextDateFormated, 'HH:mm')}`;
  }

  switch (i18n.language) {
    case 'fr':
      return format(new Date(nextDate), 'PPPPp', { locale: fr });
    default:
      return `${format(new Date(nextDate), 'PPPP', { locale: enGB })} at ${format(new Date(nextDate), 'hh:mm aa', { locale: enGB })}`;
  }
};
