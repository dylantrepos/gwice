import { useQuery } from 'react-query';
import { AllEvents, CityEventCard, CityEventCardRequest, CityEventDetails, CityEventDetailsRequest, EventsCategory, WhenQuery } from '../types/Events';
import { fetchCityEventDetails, fetchCityEvents } from '../services/cityEvents';

/*
 * Get City Events 
 */

type UseGetCityEvents = {
  isLoading: boolean;
  isError: boolean;
  events: CityEventCardRequest | undefined;
  category?: string;
}

type UseGetCityEventsProps = {
  refetchCityEventHome: boolean;
  categoryIdList?: number[];
  nextEventPageIds?: (number | string)[] | null;
}

export const useGetCityEvents = ({
  refetchCityEventHome,
  categoryIdList = [],
  nextEventPageIds = null,
}: UseGetCityEventsProps): UseGetCityEvents => {

  const { isLoading, isError, data: events, error } = useQuery(
    [`cityEvents`, refetchCityEventHome, categoryIdList, nextEventPageIds], 
    () => fetchCityEvents({
      categoryIdList,
      nextEventPageIds,
    }),
  );

  return { isLoading, isError, events };


};


/*
 * Get City Details 
 */
type UseGetCityEventDetailsProps = {
  eventId: number;
};

type UseGetCityEventDetails = {
  isLoading: boolean;
  isError: boolean;
  events: CityEventDetailsRequest | undefined;
  category?: string;
}

export const useGetCityEventDetails = ({
  eventId,
}: UseGetCityEventDetailsProps): UseGetCityEventDetails => {

  const { isLoading, isError, data: events, error } = useQuery(
    [`event-details-${eventId}`, eventId], 
    () => fetchCityEventDetails({eventId}),
  );
  return { isLoading, isError, events };
};
