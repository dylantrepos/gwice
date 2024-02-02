import { useQuery } from 'react-query';
import { AllEvents, CulturalEventCard, CulturalEventCardRequest, EventsCategory, LilleCulturalEvent, WhenQuery } from '../types/CulturalEvents';
import { fetchLilleAllCulturalEvents, fetchLilleCulturalEvent, fetchLilleCulturalEvents } from '../services/culturalEvents';

type UseGetCulturalEvents = {
  isLoading: boolean;
  isError: boolean;
  events: CulturalEventCardRequest | undefined;
  category?: string;
}

type UseGetCulturalEvent = {
  isLoading: boolean;
  isError: boolean;
  events: LilleCulturalEvent | undefined;
  category?: string;
}

type ResponseEvent = {
  title: string;
  isLoading: boolean;
  isError: boolean;
  events: LilleCulturalEvent[] | undefined;
}

type UseGetAllCulturalEvents = {
  isLoading: boolean;
  isError: boolean;
  events: AllEvents | undefined;
};

export const useGetCulturalEvents = (
  refetchHome: boolean,
  categories?: number,
): UseGetCulturalEvents => {

  const { isLoading, isError, data: events, error } = useQuery(
    [`culturalEvents-${categories}`, refetchHome], 
    () => fetchLilleCulturalEvents(categories),
  );

  return { isLoading, isError, events };


};

export const useGetCulturalEvent = (
  uid: string,
): UseGetCulturalEvent => {

  const { isLoading, isError, data: events, error } = useQuery(
    [`culturalEvents-event`, uid], 
    () => fetchLilleCulturalEvent(uid),
  );
  return { isLoading, isError, events };
};

export const useGetCulturalEventsByCategory = (
  city: string, 
  when: WhenQuery,
  refetchHome: boolean,
): UseGetAllCulturalEvents => {


  const { isLoading, isError, data: events } = useQuery(
    [`culturalEvents-allCategory`, city, when, refetchHome], 
    () => fetchLilleAllCulturalEvents(city, when),
  );

  console.log('[events] : ', events);

  return { isLoading, isError, events };
};
