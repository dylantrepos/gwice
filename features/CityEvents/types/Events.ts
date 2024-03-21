import { type LucideIcon } from 'lucide-react-native';

interface Image {
  filename: string;
  size: {
    width: number;
    height: number;
  };
  variants: ImageVariant[];
  base: string;
}

interface ImageVariant {
  filename: string;
  size: {
    width: number;
    height: number;
  };
  type: string;
}

interface Location {
  address: string;
  city: string;
  latitude: number;
  name: string;
  longitude: number;
}

interface CategoryOption {
  id: number;
  value: string;
  label: {
    fr: string;
    en: string;
  };
  info: null | string;
  display: boolean;
}

type Description = Record<string, string>;

export interface CityEventDetailsRequest {
  total: number;
  events: CityEventDetails[];
  sort: string;
  after: string[];
}

export interface Timing {
  end: string;
  begin: string;
}

interface Location {
  city: string;
}

interface Title {
  fr: string;
}

interface Category {
  id: number;
  label: {
    fr: string;
    en: string;
  };
}

export interface CategoryItem {
  title: string;
  id: number;
  iconElt: LucideIcon;
  translationKey: string;
}

export interface CityEventCard {
  image: Image;
  uid: number;
  lastTiming: Timing;
  timings: Timing[];
  firstTiming: Timing;
  description: Description;
  location: Location;
  title: Title;
  'categories-metropolitaines': Category[];
  nextTiming: Timing;
  nextDate: string;
}

export interface CityEventDetails {
  longDescription: Record<string, string>;
  country: Record<string, string>;
  interetintercommunal: number[];
  featured: boolean;
  private: number;
  keywords: Record<string, unknown>;
  accessibility: Record<string, boolean>;
  dateRange: Record<string, string>;
  timezone: string;
  imageCredits: string | null;
  originAgenda: {
    uid: number;
    image: string;
    title: string;
  };
  description: Record<string, string>;
  title: Record<string, string>;
  onlineAccessLink: string | null;
  createdAt: string;
  uid: number;
  draft: number;
  timings: Array<{
    begin: string;
    end: string;
  }>;
  firstTiming: {
    begin: string;
    end: string;
  };
  links: Array<Record<'link', string>>;
  state: number;
  'categories-metropolitaines': CategoryOption[];
  slug: string;
  updatedAt: string;
  addMethod: string;
  image: {
    filename: string;
    size: {
      width: number;
      height: number;
    };
    variants: Array<{
      filename: string;
      size: {
        width: number;
        height: number;
      };
      type: string;
    }>;
    base: string;
  };
  attendanceMode: number;
  sourceAgendas: Array<{
    image: string;
    private: number;
    indexed: number;
    locationSetUid: number | null;
    official: number;
    description: string;
    title: string;
    url: string | null;
    _agg: string;
    uid: number;
    createdAt: string;
    officializedAt: string;
    slug: string;
    updatedAt: string;
  }>;
  label: [];
  creatorUid: number;
  recurringevent: [];
  lastTiming: {
    begin: string;
    end: string;
  };
  registration: Array<{
    type: string;
    value: string;
  }>;
  category: CategoryOption[];
  location: {
    disqualifiedDuplicates: null;
    access: Record<string, unknown>;
    city: string;
    timezone: string;
    postalCode: string;
    latitude: number;
    imageCredits: string | null;
    description: Record<string, unknown>;
    setUid: number | null;
    uid: number;
    createdAt: string;
    duplicateCandidates: null;
    countryCode: string;
    adminLevel5: null;
    links: [];
    state: number;
    extId: null;
    department: string;
    slug: string;
    email: string | null;
    longitude: number;
    updatedAt: string;
    image: null;
    website: string | null;
    address: string;
    adminLevel3: string;
    agendaUid: number;
    adminLevel4: string;
    adminLevel1: string;
    adminLevel2: string;
    mergedIn: null;
    _agg: string;
    tags: null;
    insee: string;
    phone: string | null;
    district: null;
    name: string;
    region: string;
  };
  ownerUid: number;
  conditions: Record<string, string>;
  age: {
    min: number | null;
    max: number | null;
  };
  status: number;
  nextTiming: {
    begin: string;
    end: string;
  };
}

export interface CityEventCardRequest {
  total: number;
  events: CityEventCard[];
  sort: string;
  after: string[];
}
