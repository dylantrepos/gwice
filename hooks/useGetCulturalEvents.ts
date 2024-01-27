import { useQuery } from 'react-query';
import { CulturalEvents, WhenQuery } from '../types/CulturalEvents';
import { fetchCulturalEvents } from '../services/culturalEvents';

type UseGetCulturalEvents = {
  isLoading: boolean;
  isError: boolean;
  data: CulturalEvents | undefined;
  error: unknown
}

const useGetCulturalEvents = (
  city: string, 
  when: WhenQuery,
  refetchHome: boolean
): UseGetCulturalEvents => {
  const { isLoading, isError, data, error } = useQuery(
    ['culturalEvents', city, when, refetchHome], 
    () => fetchCulturalEvents(city, when),
  );

  return { isLoading, isError, data, error };
};

export default useGetCulturalEvents;
