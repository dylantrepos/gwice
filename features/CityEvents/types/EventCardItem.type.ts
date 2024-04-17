import { type LucideIcon } from 'lucide-react-native';
import { type CategoryItem } from './Events';
import { type Timing } from './EventTest';

export interface SmallEventCardProps {
  handlePress: () => void;
  imageUrl: string;
  firstCategory: CategoryItem;
  CategoryIconElt: LucideIcon;
  withTagText: boolean;
  title: string;
  nextTiming: Timing;
  timingEvent: string;
}
