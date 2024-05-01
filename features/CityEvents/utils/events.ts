import { formatDistance } from 'date-fns';
import { enGB, fr } from 'date-fns/locale';
import { type TFunction } from 'i18next';
import {
  Award,
  BadgePercent,
  Bike,
  BookHeart,
  Briefcase,
  Brush,
  Clapperboard,
  Drama,
  Guitar,
  HeartPulse,
  Hotel,
  Leaf,
  MapIcon,
  MessageSquareText,
  Mic2,
  Palette,
  PartyPopper,
  School2,
  Shirt,
  Sparkle,
  Theater
} from 'lucide-react-native';
import moment from 'moment';
import i18n from '../../../localization/i18n';
import { formatDate } from '../../../utils/events';
import { type CategoryItem } from '../types/CityEvent';

export const allEventsCategoryLille: CategoryItem[] = [
  {
    title: 'atelier',
    id: 3,
    iconElt: Palette,
    translationKey: 'eventsCategory.workshop'
  },
  {
    title: 'braderie-brocante',
    id: 4,
    iconElt: BadgePercent,
    translationKey: 'eventsCategory.sale'
  },
  {
    title: 'ceremonie',
    id: 5,
    iconElt: Award,
    translationKey: 'eventsCategory.ceremony'
  },
  {
    title: 'cinema',
    id: 6,
    iconElt: Clapperboard,
    translationKey: 'eventsCategory.cinema'
  },
  {
    title: 'conference-rencontre',
    id: 7,
    iconElt: Mic2,
    translationKey: 'eventsCategory.conference'
  },
  {
    title: 'conseil-municipal',
    id: 8,
    iconElt: Hotel,
    translationKey: 'eventsCategory.municipalCouncil'
  },
  {
    title: 'danse',
    id: 9,
    iconElt: Sparkle,
    translationKey: 'eventsCategory.dance'
  },
  {
    title: 'developpement-durable',
    id: 10,
    iconElt: Leaf,
    translationKey: 'eventsCategory.sustainableDevelopment'
  },
  {
    title: 'emploi',
    id: 11,
    iconElt: Briefcase,
    translationKey: 'eventsCategory.employment'
  },
  {
    title: 'exposition',
    id: 12,
    iconElt: Brush,
    translationKey: 'eventsCategory.exhibition'
  },
  {
    title: 'fete-festival',
    id: 13,
    iconElt: PartyPopper,
    translationKey: 'eventsCategory.festival'
  },
  {
    title: 'formation',
    id: 14,
    iconElt: School2,
    translationKey: 'eventsCategory.training'
  },
  {
    title: 'lecture',
    id: 15,
    iconElt: BookHeart,
    translationKey: 'eventsCategory.lecture'
  },
  {
    title: 'mode',
    id: 16,
    iconElt: Shirt,
    translationKey: 'eventsCategory.fashion'
  },
  {
    title: 'musique',
    id: 17,
    iconElt: Guitar,
    translationKey: 'eventsCategory.music'
  },
  {
    title: 'reunion-publique',
    id: 18,
    iconElt: MessageSquareText,
    translationKey: 'eventsCategory.publicMeeting'
  },
  {
    title: 'sante',
    id: 19,
    iconElt: HeartPulse,
    translationKey: 'eventsCategory.health'
  },
  {
    title: 'spectacle',
    id: 20,
    iconElt: Theater,
    translationKey: 'eventsCategory.show'
  },
  {
    title: 'sport',
    id: 21,
    iconElt: Bike,
    translationKey: 'eventsCategory.sport'
  },
  {
    title: 'theatre',
    id: 22,
    iconElt: Drama,
    translationKey: 'eventsCategory.theater'
  },
  {
    title: 'visite-balade',
    id: 23,
    iconElt: MapIcon,
    translationKey: 'eventsCategory.visit'
  }
];

export const formatTitle = (title: string): string => {
  const titleUpdate = title.split('-')[0];
  return titleUpdate[0].toUpperCase() + titleUpdate.slice(1);
};

export const getNextTimingFormatted = (
  begin: string,
  end: string,
  period: string,
  t: TFunction<'translation', undefined>
): string => {
  const startTime = moment(begin).utc().add(2, 'hour');
  const endTime = moment(end).utc().add(2, 'hour');
  const now = moment().utc().add(2, 'hour');

  if (now.isBetween(startTime, endTime)) {
    let untilEnd = moment(endTime)
      .utc()
      .format(i18n.language === 'fr' ? 'HH:mm' : 'h:mm a');
    if (i18n.language === 'fr') {
      untilEnd = untilEnd.replace(':', 'h').replace('h00', 'h');
    } else {
      untilEnd = untilEnd.replace(':00', '');
    }

    return `${t('period.until')} ${untilEnd}`;
  } else if (startTime.isAfter(now) && startTime.isSame(now, 'day')) {
    const untilStart = formatDistance(startTime.toDate(), now.toDate(), {
      locale: i18n.language === 'fr' ? fr : enGB
    });
    return `${t('period.in')} ${untilStart}`;
  } else {
    return formatDate({ nextDate: begin, period });
  }
};
