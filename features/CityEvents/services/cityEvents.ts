import { SERVER_HOST } from '@env';
import axios, { type AxiosError } from 'axios';
import { store } from '../../../store/store';
import { type ErrorResponse } from '../../../types/Request';
import {
  type CityEventListReturn,
  type CityEventReturn,
  type FetchCityEventDetailsTestProps,
  type FetchLilleCulturalEventsTest
} from '../types/EventTest';

export const fetchCityEventDetails = async ({
  eventId
}: FetchCityEventDetailsTestProps): Promise<CityEventReturn | undefined> => {
  const cityName = store.getState().generalReducer.currentCity.cityName;

  try {
    console.log('url & params : ', cityName, eventId);
    const response = await axios.get(`${SERVER_HOST}/events-test`, {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        cityName,
        eventId
      }
    });

    return response.data as CityEventReturn;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response) {
      console.error('[cityEvent] Error : ', axiosError.response.data.message);
      throw Error(axiosError.response.data.message);
    }
  }
};

export const fetchCityEventListTest = async ({
  categoryIdList = [],
  nextEventPageIds = null,
  currentPeriod = null,
  startDate = null,
  endDate = null,
  search = null
}: FetchLilleCulturalEventsTest): Promise<CityEventListReturn | undefined> => {
  const address = `${SERVER_HOST}`;
  const cityName = store.getState().generalReducer.currentCity.cityName;
  console.log('nextEventPageIds : ', nextEventPageIds);

  try {
    console.log('request : ', {
      adress: `${address}/events-all-test`,
      params: {
        cityName,
        categoryId: categoryIdList.join(','),
        page: nextEventPageIds,
        from: startDate ?? null,
        to: endDate ?? null
        // search: search && search.length > 0 ? search : null
      }
    });

    const response = await axios.get(`${address}/events-all-test`, {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        cityName,
        categoryId: categoryIdList.join(','),
        page: nextEventPageIds,
        from: startDate ?? null,
        to: endDate ?? null
        // search: search && search.length > 0 ? search : null
      }
    });

    console.log('request url : ', response.config.params);

    return response.data as CityEventListReturn;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response) {
      console.error('[cityEvent] Error : ', axiosError.response.data.message);
      throw Error(axiosError.response.data.message);
    }
  }
};
