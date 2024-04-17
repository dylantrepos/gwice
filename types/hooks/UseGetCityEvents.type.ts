import { type InfiniteData } from 'react-query';
import { type CityEventCardRequest } from '../../features/CityEvents/types/Events';

export interface UseGetCityEvents {
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

export interface UseGetCityEventsProps {
  refetchCityEventHome: boolean;
  categoryIdList?: number[];
  search?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  key: string;
}
