import { EventsCategory, ListCategoryItem, Timing } from '../types/Events';
import { Award, BadgePercent, Bike, BookHeart, Briefcase, Brush, ChevronRight, Clapperboard, Drama, Guitar, HeartPulse, Hotel, Leaf, LucideIcon, MapPin, MessageSquareText, Mic2, Palette, PartyPopper, Popcorn, School, School2, Shirt, Sparkle, Theater, Ticket } from "lucide-react-native";
import { format, formatDistanceToNow, isAfter, isBefore, endOfDay, addDays, isWithinInterval, endOfWeek, startOfWeek, isWeekend } from 'date-fns';
import { fr } from 'date-fns/locale';

export const eventsCategory: Record<EventsCategory, number> = {
  "atelier": 3,
  "braderie-brocante": 4,
  "ceremonie": 5,
  "cinema": 6,
  "conference-rencontre": 7,
  "conseil-municipal": 8,
  "danse": 9,
  "developpement-durable": 10,
  "emploi": 11,
  "exposition": 12,
  "fete-festival": 13,
  "formation": 14,
  "lecture": 15,
  "mode": 16,
  "musique": 17,
  "reunion-publique": 18,
  "sante": 19,
  "spectacle": 20,
  "sport": 21,
  "theatre": 22,
  "visite-balade": 23,
  "aucune": 28,
}

export const eventsCategoryLille: ListCategoryItem[] = [
  {
    title: "fete-festival",
    id: 13,
    iconName: 'guitar',
    iconElt: PartyPopper
  },
  {
    title: "visite-balade",
    id: 23,
    iconName: 'guitar',
    iconElt: MapPin
  },
  {
    title: "musique",
    id: 17,
    iconName: 'guitar',
    iconElt: Guitar
  },
  {
    title: "sport",
    id: 21,
    iconName: 'guitar',
    iconElt: Bike
  },
  {
    title: "cinema",
    id: 6,
    iconName: 'guitar',
    iconElt: Clapperboard
  },
  {
    title: "atelier",
    id: 3,
    iconName: 'guitar',
    iconElt: Palette
  },
  {
    title: "braderie-brocante",
    id: 4,
    iconName: 'guitar',
    iconElt: BadgePercent
  },
  {
    title: "spectacle",
    id: 20,
    iconName: 'guitar',
    iconElt: Theater
  },
  {
    title: "exposition",
    id: 12,
    iconName: 'guitar',
    iconElt: Brush
  },
  {
    title: "voir plus",
    id: 28,
    iconName: 'guitar',
    iconElt: ChevronRight
  },
];

export const allEventsCategoryLille: ListCategoryItem[] = [
  {
    title: "atelier",
    id: 3,
    iconName: 'guitar',
    iconElt: Palette
  },
  {
    title: "braderie-brocante",
    id: 4,
    iconName: 'guitar',
    iconElt: BadgePercent
  },
  {
    title: "ceremonie",
    id: 5,
    iconName: 'guitar',
    iconElt: Award
  },
  {
    title: "cinema",
    id: 6,
    iconName: 'guitar',
    iconElt: Clapperboard
  },
  {
    title: "conference-rencontre",
    id: 7,
    iconName: 'guitar',
    iconElt: Mic2
  },
  {
    title: "conseil-municipal",
    id: 8,
    iconName: 'guitar',
    iconElt: Hotel
  },
  {
    title: "danse",
    id: 9,
    iconName: 'guitar',
    iconElt: Sparkle
  },
  {
    title: "developpement-durable",
    id: 10,
    iconName: 'guitar',
    iconElt: Leaf
  },
  {
    title: "emploi",
    id: 11,
    iconName: 'guitar',
    iconElt: Briefcase
  },
  {
    title: "exposition",
    id: 12,
    iconName: 'guitar',
    iconElt: Brush
  },
  {
    title: "fete-festival",
    id: 13,
    iconName: 'guitar',
    iconElt: PartyPopper
  },
  {
    title: "formation",
    id: 14,
    iconName: 'guitar',
    iconElt: School2
  },
  {
    title: "lecture",
    id: 15,
    iconName: 'guitar',
    iconElt: BookHeart
  },
  {
    title: "mode",
    id: 16,
    iconName: 'guitar',
    iconElt: Shirt
  },
  {
    title: "musique",
    id: 17,
    iconName: 'guitar',
    iconElt: Guitar
  },
  {
    title: "reunion-publique",
    id: 18,
    iconName: 'guitar',
    iconElt: MessageSquareText
  },
  {
    title: "sante",
    id: 19,
    iconName: 'guitar',
    iconElt: HeartPulse
  },
  {
    title: "spectacle",
    id: 20,
    iconName: 'guitar',
    iconElt: Theater
  },
  {
    title: "sport",
    id: 21,
    iconName: 'guitar',
    iconElt: Bike
  },
  {
    title: "theatre",
    id: 22,
    iconName: 'guitar',
    iconElt: Drama
  },
  {
    title: "visite-balade",
    id: 23,
    iconName: 'guitar',
    iconElt: MapPin
  },
  {
    title: "aucune",
    id: 28,
    iconName: 'guitar',
    iconElt: ChevronRight
  },
];

export type FilterDateItem = {
  id: number;
  label: string;
  value: string;
}

export const filterDate: FilterDateItem[] = [
  {
    id: 1,
    label: 'Aujourd\'hui',
    value: 'today',
  },
  {
    id: 2,
    label: 'Demain',
    value: 'tomorrow',
  },
  {
    id: 3,
    label: 'Ce weekend',
    value: 'weekend',
  },
  {
    id: 4,
    label: 'Cette semaine',
    value: 'week',
  },
  {
    id: 5,
    label: 'Choisir une date',
    value: 'choose',
  },
]

export const formatTitle = (title: string) => {
  const titleUpdate = title.split('-')[0];
  return titleUpdate[0].toUpperCase() + titleUpdate.slice(1);
}

const findClosestWeekendDate = (timings: Timing[]): Date | null => {
  let closestWeekendDate: Date | null = null;

  const now = new Date();
  const startOfNextWeek = startOfWeek(addDays(now, 7));
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

type FormatDateProps = {
  inputDate: Date;
  selectedItemDate: FilterDateItem;
  timings: Timing[] | null;
  title: string;
}

export const formatDate = ({
  inputDate,
  selectedItemDate,
  timings,
  title,
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

  if (isAfter(inputDate, now) && isBefore(inputDate, endOfToday)) {
    return `Dans ${formatDistanceToNow(inputDate, { locale: fr })}`;
  } else if (isAfter(inputDate, endOfToday) && isBefore(inputDate, endOfTomorrow)) {
    return `Demain à ${format(inputDate, 'HH:mm')}`;
  } else if (isAfter(inputDate, endOfTomorrow) && isBefore(inputDate, endOfDayAfterTomorrow)) {
    return `Après-demain à ${format(inputDate, 'HH:mm')}`;
  } else {
    return format(inputDate, 'eeee dd MMMM à HH:mm', { locale: fr });
  }
}