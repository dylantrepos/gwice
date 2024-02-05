import { EventsCategory, ListCategoryItem } from "../types/Events";
import { Award, BadgePercent, Bike, BookHeart, Briefcase, Brush, ChevronRight, Clapperboard, Drama, Guitar, HeartPulse, Hotel, Leaf, LucideIcon, MapPin, MessageSquareText, Mic2, Palette, PartyPopper, Popcorn, School, School2, Shirt, Sparkle, Theater, Ticket } from "lucide-react-native";

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

export const formatTitle = (title: string) => {
  const titleUpdate = title.split('-')[0];
  return titleUpdate[0].toUpperCase() + titleUpdate.slice(1);
}