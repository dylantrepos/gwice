import { useQuery } from 'react-query';
import { LilleCulturalEvent, WhenQuery } from '../types/CulturalEvents';
import { fetchLilleCulturalEvents } from '../services/culturalEvents';

type UseGetCulturalEvents = {
  isLoading: boolean;
  isError: boolean;
  events: LilleCulturalEvent[] | undefined;
  error: unknown
}

const useGetCulturalEvents = (
  city: string, 
  when: WhenQuery,
  refetchHome: boolean
): UseGetCulturalEvents => {
  const { isLoading, isError, data: events, error } = useQuery(
    ['culturalEvents', city, when, refetchHome], 
    () => fetchLilleCulturalEvents(city, when),
  );

  return { isLoading, isError, events, error };
};

export default useGetCulturalEvents;
