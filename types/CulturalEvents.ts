export type CulturalEvent = {
  id: string;
  title: string | null;
  date: {
    start: string | null;
    end: string | null;
  }
  description: string | null;
  price: string | null;
  image: string | null;
  location: {
    name: string | null;
    address: string | null;
  };
  website: string | null; 
  contact?: {
    email: string | null;
    phone: string | null;
  };
  access?: string | null | {
    public?: string | null;
    transport?: Record<string, string>
  };
  page: string | null; 
}

export type CulturalEvents = {
  events: CulturalEvent[];
}

export type WhenQuery = 'today' | 'week' | 'weekend' | 'month' | 'default';
interface ImageVariant {
  filename: string;
  size: {
    width: number;
    height: number;
  };
  type: string;
}

interface Image {
  filename: string;
  size: {
    width: number;
    height: number;
  };
  variants: ImageVariant[];
  base: string;
}

interface DateRange {
  ar: string;
  de: string;
  en: string;
  it: string;
  fr: string;
  es: string;
}

interface OriginAgenda {
  uid: number;
  image: string;
  title: string;
}

interface Timing {
  end: string;
  begin: string;
}

interface Location {
  address: string;
  city: string;
  latitude: number;
  name: string;
  longitude: number;
}

export interface LilleCulturalEvent {
  image: Image;
  interetintercommunal: number[];
  featured: boolean;
  attendanceMode: number;
  keywords: Record<string, unknown>;
  dateRange: DateRange;
  imageCredits: null;
  originAgenda: OriginAgenda;
  description: Record<string, string>;
  label: string[];
  title: Record<string, string>;
  onlineAccessLink: null;
  uid: number;
  recurringevent: any[];
  lastTiming: Timing;
  firstTiming: Timing;
  location: Location;
  "categories-metropolitaines": number[];
  slug: string;
  status: number;
  nextTiming: Timing;
}