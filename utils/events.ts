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
    id: 0,
    label: 'Toujours',
    value: 'always',
  },
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