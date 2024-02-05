import { useQuery } from 'react-query';
import { AllEvents, CityEventCard, CityEventCardRequest, CityEventDetails, CityEventDetailsRequest, EventsCategory, WhenQuery } from '../types/Events';
import { fetchCityEventDetails, fetchCityEvents } from '../services/cityEvents';

type UseGetCityEvents = {
  isLoading: boolean;
  isError: boolean;
  events: CityEventCardRequest | undefined;
  category?: string;
}

type UseGetCityEventDetails = {
  isLoading: boolean;
  isError: boolean;
  events: CityEventDetailsRequest | undefined;
  category?: string;
}

type UseGetCityEventsProps = {
  refetchCityEventHome: boolean;
  categoryIdList?: number[];
}

export const useGetCityEvents = ({
  refetchCityEventHome,
  categoryIdList = [],
}: UseGetCityEventsProps): UseGetCityEvents => {

  const { isLoading, isError, data: events, error } = useQuery(
    [`cityEvents`, refetchCityEventHome, categoryIdList], 
    () => fetchCityEvents({
      categoryIdList
    }),
  );

  return { isLoading, isError, events };


};

export const useGetCityEventDetail = (
  eventId: number,
): UseGetCityEventDetails => {

  const { isLoading, isError, data: events, error } = useQuery(
    [`event-details-${eventId}`, eventId], 
    () => fetchCityEventDetails({eventId}),
  );
  return { isLoading, isError, events };
};
