export enum StatusId {
  Refused = -1,
  PendingModeration = 0,
  ReadyToPublish = 1,
  Published = 2
}

export enum StatusTitle {
  Refused = 'refused',
  PendingModeration = 'pending moderation',
  ReadyToPublish = 'ready to publish',
  Published = 'published'
}

export enum StateId {
  Scheduled = 1,
  Rescheduled = 2,
  MovedOnline = 3,
  Postponed = 4,
  Complete = 5,
  Canceled = 6
}

export enum StateTitle {
  Scheduled = 'scheduled',
  Rescheduled = 'rescheduled',
  MovedOnline = 'moved online',
  Postponed = 'postponed',
  Complete = 'complete',
  Canceled = 'canceled'
}

export interface Timing {
  begin: string;
  end: string;
}

interface Category {
  id: number;
  title: string;
  open_agenda_id: number;
}

export interface CityEventReturn {
  id: number;
  title: string;
  short_description: string;
  long_description: string;
  price: string | null;
  image_url: string;
  minimum_age: number;
  status: number;
  state: number;
  nextTiming: Timing;
  location: {
    adress: string | null;
    city: string | null;
    postal_code: string | null;
  };
  registration: {
    link: string | null;
    email: string | null;
    phone: string | null;
  };
  category: Category[];
  openAgenda: {
    uid: string | null;
    creator_uid: string | null;
    open_agenda_created_at: Date | null;
    open_agenda_updated_at: Date | null;
  } | null;
  timings: Timing[];
  createdAt: string;
  updatedAt: string;
}

export interface CityEventListReturn {
  total: number;
  events: CityEventReturn[];
  nextPage: number | null;
}

export interface FetchCityEventDetailsTestProps {
  eventId: number;
}

export interface FetchLilleCulturalEventsTest {
  categoryIdList?: number[];
  nextEventPageIds?: Array<number | string> | null;
  currentPeriod?: string | null;
  customPeriod?: {
    startDate: Date;
    endDate: Date;
  } | null;
  startDate?: string | null;
  endDate?: string | null;
  search?: string | null;
}

/*
 * Get City Details
 */
export interface UseGetCityEventDetailsProps {
  eventId: number;
}

export interface UseGetCityEventDetails {
  isLoading: boolean;
  isError: boolean;
  data: CityEventReturn | undefined;
  category?: string;
}
