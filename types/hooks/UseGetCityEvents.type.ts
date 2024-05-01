import {
  type FetchNextPageOptions,
  type InfiniteData,
  type InfiniteQueryObserverResult
} from 'react-query';
import { type CityEventListReturn } from '../../features/CityEvents/types/CityEvent';
import { type TypeTitle } from '../../features/CityEvents/types/Constant';

export interface UseGetCityEventsResult {
  isLoading: boolean;
  isError: boolean;
  data: InfiniteData<CityEventListReturn | undefined> | undefined;
  hasNextPage: boolean | undefined;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<CityEventListReturn | undefined, unknown>>;
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
  activeTab: TypeTitle;
}
