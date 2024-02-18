import { InfiniteData, useInfiniteQuery, useQuery } from 'react-query';
import { CityEventCardRequest, CityEventDetailsRequest } from '../types/Events';
import { fetchCityEventDetails, fetchCityEvents } from '../services/cityEvents';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

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
  isFetching: boolean;
  isFetchingNextPage: boolean;
  isRefetching: boolean;
}

type UseGetCityEventsProps = {
  refetchCityEventHome: boolean;
  categoryIdList?: number[];
  startDate?: Date | null;
  endDate?: Date | null;
  key: string;
}

export const useGetCityEvents = ({
  refetchCityEventHome,
  categoryIdList = [],
  startDate = null,
  endDate = null,
  key
}: UseGetCityEventsProps): UseGetCityEvents => {
  const { searchValue } = useSelector((state: RootState) => state.eventReducer);  

  const { 
    isLoading, 
    isError, 
    data: events, 
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    isRefetching,
  } = useInfiniteQuery(
    [
      key, 
      refetchCityEventHome, 
      categoryIdList, 
      startDate, 
      endDate,
      searchValue,
    ], 
    ({pageParam: nextEventPageIds = null}) => fetchCityEvents({ 
        categoryIdList, 
        nextEventPageIds,
        startDate,
        endDate,
        search: searchValue,
    }),
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

  return { 
    isLoading, 
    isError, 
    events, 
    hasNextPage, 
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    isRefetching,
  };
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