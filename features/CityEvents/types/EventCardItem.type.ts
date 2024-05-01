import { type LucideIcon } from 'lucide-react-native';
import { type CategoryItem, type Timing } from './CityEvent';

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
