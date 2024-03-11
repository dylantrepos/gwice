import { SERVER_HOST } from '@env';
import axios from 'axios';
import { store } from '../store/store';
import { type CityEventCardRequest, type CityEventDetailsRequest } from '../types/Events';

interface FetchLilleCulturalEvents {
  categoryIdList?: number[];
  nextEventPageIds?: Array<number | string> | null;
  currentPeriod?: string | null;
  customPeriod?: {
    startDate: Date;
    endDate: Date;
  } | null;
  startDate?: string | null;
  endDate?: string | null;
  search?: string | null;
}

export const fetchCityEvents = async ({
  categoryIdList = [],
  nextEventPageIds = null,
  currentPeriod = null,
  startDate = null,
  endDate = null,
  search = null
}: FetchLilleCulturalEvents): Promise<CityEventCardRequest | undefined> => {
  const address = `${SERVER_HOST}`;
  const cityName = store.getState().generalReducer.currentCity.cityName;

  try {
    const response = await axios.get(`${address}/events`, {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        cityName,
        categoryIdList: categoryIdList.join(','),
        nextEventPageIds,
        startDate: startDate ?? null,
        endDate: endDate ?? null,
        search: search && search.length > 0 ? search : null
      }
    });

    return response.data as CityEventCardRequest;
  } catch (error) {
    console.error('Error while fetching city events', error);
    return undefined;
  }
};

interface FetchCityEventDetailsProps {
  eventId: number;
}

export const fetchCityEventDetails = async ({
  eventId
}: FetchCityEventDetailsProps): Promise<CityEventDetailsRequest> => {
  const cityName = store.getState().generalReducer.currentCity.cityName;
  const address = `${SERVER_HOST}`;

  const response = await axios.get(`${address}/event`, {
    headers: {
      'Content-Type': 'application/json'
    },
    params: {
      cityName,
      eventId
    }
  });

  return response.data as CityEventDetailsRequest;
};
