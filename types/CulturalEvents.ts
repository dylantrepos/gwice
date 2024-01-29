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