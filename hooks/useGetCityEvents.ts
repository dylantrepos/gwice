import { InfiniteData, useInfiniteQuery, useQuery } from 'react-query';
import { AllEvents, CityEventCard, CityEventCardRequest, CityEventDetails, CityEventDetailsRequest, EventsCategory, WhenQuery } from '../types/Events';
import { fetchCityEventDetails, fetchCityEvents } from '../services/cityEvents';

/*
 * Get City Events 
 */

type UseGetCityEvents = {
  isLoading: boolean;
  isError: boolean;
  events: InfiniteData<CityEventCardRequest> | undefined;
  category?: string;
  hasNextPage?: boolean;
  fetchNextPage: () => void;
}

type UseGetCityEventsProps = {
  refetchCityEventHome: boolean;
  categoryIdList?: number[];
}

export const useGetCityEvents = ({
  refetchCityEventHome,
  categoryIdList = [],
}: UseGetCityEventsProps): UseGetCityEvents => {

  const { 
    isLoading, 
    isError, 
    data: events, 
    hasNextPage,
    fetchNextPage
  } = useInfiniteQuery(
    [`cityEvents`, refetchCityEventHome, categoryIdList], 
    ({pageParam: nextEventPageIds = null}) => fetchCityEvents({ categoryIdList, nextEventPageIds }),
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.after) {
          return lastPage.after;
        }
        return undefined;
      },
    }
  );

  return { isLoading, isError, events, hasNextPage, fetchNextPage};


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
