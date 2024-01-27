export type CulturalEvent = {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
  link: string;
  page: string;
}

export type CulturalEvents = {
  events: CulturalEvent[];
}

export type WhenQuery = 'today' | 'week' | 'weekend' | 'month' | 'default';