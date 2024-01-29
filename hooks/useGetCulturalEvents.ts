import { useQuery } from 'react-query';
import { CulturalEvent, CulturalEvents, WhenQuery } from '../types/CulturalEvents';
import { fetchCulturalEvents } from '../services/culturalEvents';
import { useEffect, useState } from 'react';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { getFormatedDateFromTimestamp } from '../utils/utils';

type UseGetCulturalEvents = {
  isLoading: boolean;
  isError: boolean;
  events: CulturalEvent[] | undefined;
  error: unknown
}

const useGetCulturalEvents = (
  city: string, 
  when: WhenQuery,
  refetchHome: boolean
): UseGetCulturalEvents => {
  const [events, setEvents] = useState<CulturalEvent[] | undefined>([]);
  const { isLoading, isError, data, error } = useQuery(
    ['culturalEvents', city, when, refetchHome], 
    () => fetchCulturalEvents(city, when),
  );

  useEffect(() => {
    // console.log('useGetCulturalEvents', data);
    if (data) {
      console.log('bef: ', data.events[0].date)
      
      const formatedDateData: CulturalEvent[] = data.events.map(event => {
        return {
          ...event,
          date: {
            start: event.date.start ? getFormatedDateFromTimestamp(event.date.start) : null,
            end: event.date.end ? getFormatedDateFromTimestamp(event.date.end) : null,
          }
        }
      });

      console.log('aff: ', formatedDateData[0].date)
      console.log('formated: ', formatedDateData)

      setEvents(formatedDateData);
    }

  }, [data]);

  return { isLoading, isError, events, error };
};

export default useGetCulturalEvents;
