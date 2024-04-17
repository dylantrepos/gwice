import { useInfiniteQuery, useQuery } from 'react-query';
import {
  fetchCityEventDetails,
  fetchCityEventListTest
} from '../features/CityEvents/services/cityEvents';
import {
  type UseGetCityEventDetails,
  type UseGetCityEventDetailsProps
} from '../features/CityEvents/types/EventTest';
import {
  type UseGetCityEvents,
  type UseGetCityEventsProps
} from '../types/hooks/UseGetCityEvents.type';

/*
 * Get City Events
 */

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
    error,
    data: events,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    isRefetching
  } = useInfiniteQuery(
    [key, refetchCityEventHome, categoryIdList, startDate, endDate, search],
    async ({ pageParam: nextEventPageIds = null }) =>
      await fetchCityEventListTest({
        categoryIdList,
        nextEventPageIds,
        startDate,
        endDate,
        search
      }),
    {
      refetchOnWindowFocus: false,
      retry: 0,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage?.nextPage) {
          return lastPage.nextPage;
        }
        return undefined;
      }
    }
  );

  return {
    isLoading,
    isError,
    error,
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

export const useGetCityEventDetails = ({
  eventId
}: UseGetCityEventDetailsProps): UseGetCityEventDetails => {
  const { isLoading, isError, data } = useQuery(
    [`event-details-${eventId}`, eventId],
    async () => await fetchCityEventDetails({ eventId })
  );
  return { isLoading, isError, data };
};
