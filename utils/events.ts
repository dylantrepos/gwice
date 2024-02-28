import { format, formatDistanceToNow, isBefore } from 'date-fns';
import { fr } from 'date-fns/locale';
import moment from 'moment';
import { Translation, useTranslation } from 'react-i18next';
import i18n from "i18next";

export type FilterDateItem = {
  id: number;
  label: string;
  value: string;
}

export const formatTitle = (title: string) => {
  const titleUpdate = title.split('-')[0];
  return titleUpdate[0].toUpperCase() + titleUpdate.slice(1);
}

type FormatDateProps = {
  nextDate: string;
  period: string;
}

export const formatDate = ({
  nextDate,
  period
}: FormatDateProps): string => {
  
  if (period === 'today') {
    return `Aujourd'hui à ${format(new Date(nextDate), 'HH:mm')}`;
  }
  if (period === 'tomorrow') {
    return `Demain à ${format(new Date(nextDate), 'HH:mm')}`;
  }

  const nextDateFormated = new Date(nextDate);
  const endOfToday = moment().endOf('day').toDate();
  const endOfTomorrow = moment(endOfToday).add(1, 'hours').add(1, 'day').endOf('day').toDate();

  if (isBefore(nextDateFormated, endOfToday)) {
    return `${i18n.t('period.in')} ${formatDistanceToNow(nextDateFormated, { locale: fr })}`;
  } 
  if (isBefore(nextDateFormated, endOfTomorrow)) {
    return `${i18n.t('period.tomorrowAt')} ${format(nextDateFormated, 'HH:mm')}`;
  }

  return format(new Date(nextDate), `eeee dd MMMM ${i18n.t('period.at')} HH:mm`, { locale: fr });
}