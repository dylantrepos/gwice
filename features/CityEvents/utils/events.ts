import {
  Award,
  BadgePercent,
  Bike,
  BookHeart,
  Briefcase,
  Brush,
  ChevronRight,
  Clapperboard,
  Drama,
  Guitar,
  HeartPulse,
  Hotel,
  Leaf,
  MapPin,
  MessageSquareText,
  Mic2,
  Palette,
  PartyPopper,
  School2,
  Shirt,
  Sparkle,
  Theater
} from 'lucide-react-native';
import { type CategoryItem } from '../types/Events';

export const eventsCategory: Record<string, number> = {
  atelier: 3,
  'braderie-brocante': 4,
  ceremonie: 5,
  cinema: 6,
  'conference-rencontre': 7,
  'conseil-municipal': 8,
  danse: 9,
  'developpement-durable': 10,
  emploi: 11,
  exposition: 12,
  'fete-festival': 13,
  formation: 14,
  lecture: 15,
  mode: 16,
  musique: 17,
  'reunion-publique': 18,
  sante: 19,
  spectacle: 20,
  sport: 21,
  theatre: 22,
  'visite-balade': 23,
  aucune: 28
};

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
    iconElt: MapPin,
    translationKey: 'eventsCategory.visit'
  },
  {
    title: 'voir plus',
    id: 28,
    iconElt: ChevronRight,
    translationKey: 'eventsCategory.seeMore'
  }
];

const eventsCategoryShort = [
  'fete-festival',
  'visite-balade',
  'musique',
  'sport',
  'cinema',
  'atelier',
  'braderie-brocante',
  'spectacle',
  'exposition',
  'voir plus'
];

export const eventsCategoryLille = allEventsCategoryLille.filter((item) =>
  eventsCategoryShort.includes(item.title)
);

export const formatTitle = (title: string): string => {
  const titleUpdate = title.split('-')[0];
  return titleUpdate[0].toUpperCase() + titleUpdate.slice(1);
};
