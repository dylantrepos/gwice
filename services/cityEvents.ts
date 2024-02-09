import { SERVER_HOST } from '@env';
import axios from 'axios';
import { CityEventCardRequest, CityEventDetailsRequest } from '../types/Events';
import { store } from '../store/store';


type FetchLilleCulturalEvents = {
  categoryIdList: number[];
  nextEventPageIds?: (number | string)[] | null;
  startDate?: Date | null;
  endDate?: Date | null;
}



export const fetchCityEvents = async ({
  categoryIdList = [],
  nextEventPageIds = null,
  startDate = null,
  endDate = null,
}: FetchLilleCulturalEvents): Promise<CityEventCardRequest> => {
  const address = `${SERVER_HOST}`;
  const cityName = store.getState().general.currentCity.cityName;

  const response = await axios.get(
    `${address}/events`, 
    {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        cityName,
        categoryIdList: categoryIdList.join(','),
        nextEventPageIds,
        startDate: startDate ?? null,
        endDate: endDate ?? null,
      }
    },
  );

  return response.data as CityEventCardRequest;
}

type FetchCityEventDetailsProps = {
  eventId: number;
}

export const fetchCityEventDetails = async ({
  eventId,
}: FetchCityEventDetailsProps): Promise<CityEventDetailsRequest> => {
  const cityName = store.getState().general.currentCity.cityName;
  const address = `${SERVER_HOST}`;

  // console.log('[Request] fetchCulturalEvents : ', category);
  const response = await axios.get(`${address}/event`, {
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      cityName,
      eventId,
    }
  });

  return response.data as CityEventDetailsRequest;
}

