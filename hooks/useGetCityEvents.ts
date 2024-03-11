import { useInfiniteQuery, useQuery, type InfiniteData } from 'react-query';
import { fetchCityEventDetails, fetchCityEvents } from '../services/cityEvents';
import { type CityEventCardRequest, type CityEventDetailsRequest } from '../types/Events';

/*
 * Get City Events
 */

interface UseGetCityEvents {
  isLoading: boolean;
  isError: boolean;
  events: InfiniteData<CityEventCardRequest | undefined> | undefined;
  category?: string;
  hasNextPage?: boolean;
  fetchNextPage: () => void;
  isFetching: boolean;
  isFetchingNextPage: boolean;
  isRefetching: boolean;
}

interface UseGetCityEventsProps {
  refetchCityEventHome: boolean;
  categoryIdList?: number[];
  search?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  key: string;
}

export const useGetCityEvents = ({
  refetchCityEventHome,
  categoryIdList = [],
  startDate = null,
  endDate = null,
  search = null,
  key
}: UseGetCityEventsProps): UseGetCityEvents => {
  const {
    isLoading,
    isError,
    data: events,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    isRefetching
  } = useInfiniteQuery(
    [key, refetchCityEventHome, categoryIdList, startDate, endDate, search],
    async ({ pageParam: nextEventPageIds = null }) =>
      await fetchCityEvents({
        categoryIdList,
        nextEventPageIds,
        startDate,
        endDate,
        search
      }),
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage?.after) {
          return lastPage.after;
        }
        return undefined;
      }
    }
  );

  return {
    isLoading,
    isError,
    events,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    isRefetching
  };
};

/*
 * Get City Details
 */
interface UseGetCityEventDetailsProps {
  eventId: number;
}

interface UseGetCityEventDetails {
  isLoading: boolean;
  isError: boolean;
  events: CityEventDetailsRequest | undefined;
  category?: string;
}

export const useGetCityEventDetails = ({
  eventId
}: UseGetCityEventDetailsProps): UseGetCityEventDetails => {
  const {
    isLoading,
    isError,
    data: events,
    error
  } = useQuery(
    [`event-details-${eventId}`, eventId],
    async () => await fetchCityEventDetails({ eventId })
  );
  return { isLoading, isError, events };
};
