import { LucideIcon } from "lucide-react-native";

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

interface Location {
  address: string;
  city: string;
  latitude: number;
  name: string;
  longitude: number;
}


export interface CategoryOption {
  id: number;
  value: string;
  label: {
    fr: string;
    en: string;
  };
  info: null | string;
  display: boolean;
}

export interface CityEventDetailsRequest {
  total: number;
  events: CityEventDetails[];
  sort: string;
  after: string[];
}

export interface CityEventDetails {
  longDescription: { [key: string]: string };
  country: { [key: string]: string };
  interetintercommunal: number[];
  featured: boolean;
  private: number;
  keywords: {};
  accessibility: { [key: string]: boolean };
  dateRange: { [key: string]: string };
  timezone: string;
  imageCredits: string | null;
  originAgenda: {
    uid: number;
    image: string;
    title: string;
  };
  description: { [key: string]: string };
  title: { [key: string]: string };
  onlineAccessLink: string | null;
  createdAt: string;
  uid: number;
  draft: number;
  timings: {
    begin: string;
    end: string;
  }[];
  firstTiming: {
    begin: string;
    end: string;
  };
  links: Record<'link', string>[];
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
    variants: {
      filename: string;
      size: {
        width: number;
        height: number;
      };
      type: string;
    }[];
    base: string;
  };
  attendanceMode: number;
  sourceAgendas: {
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
  }[];
  label: [];
  creatorUid: number;
  recurringevent: [];
  lastTiming: {
    begin: string;
    end: string;
  };
  registration: {
    type: string;
    value: string;
  }[];
  category: CategoryOption[];
  location: {
    disqualifiedDuplicates: null;
    access: {};
    city: string;
    timezone: string;
    postalCode: string;
    latitude: number;
    imageCredits: string | null;
    description: {};
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
  conditions: { [key: string]: string };
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

interface Category {
  id: number;
  label: {
    fr: string;
    en: string;
  };
}

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



export interface CityEventCard {
    image: Image;
    uid: number;
    firstTiming: Timing;
    lastTiming: Timing;
    location: Location;
    title: Title;
    description?: { [key: string]: string };
    nextTiming: Timing;
    timings: Timing[];
    "categories-metropolitaines": Category[];
};

export interface CityEventCardRequest {
  total: number;
  events: CityEventCard[];
  sort: string;
  after: string[];
}

export type EventsCategory = 
  "atelier" |
  "braderie-brocante" |
  "ceremonie" |
  "cinema" |
  "conference-rencontre" |
  "conseil-municipal" |
  "danse" |
  "developpement-durable" |
  "emploi" |
  "exposition" |
  "fete-festival" |
  "formation" |
  "lecture" |
  "mode" |
  "musique" |
  "reunion-publique" |
  "sante" |
  "spectacle" |
  "sport" |
  "theatre" |
  "visite-balade" |
  "aucune";

  export type AllEvents = {
    title: string,
    data: {
      total: number,
      events: CityEventDetails[],
      sort: string,
      after: string[],
    }
  }[];

  export type ListCategoryItem = {
    id: number;
    title: string;
    iconName: string;
    iconElt?: LucideIcon | undefined;
    translationKey?: string;
  };
  