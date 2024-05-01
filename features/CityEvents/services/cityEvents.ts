import { SERVER_HOST } from '@env';
import axios, { type AxiosError } from 'axios';
import { store } from '../../../store/store';
import { type ErrorResponse } from '../../../types/Request';
import {
  type CityEventListReturn,
  type CityEventReturn,
  type FetchCityEventDetailsTestProps,
  type FetchLilleCulturalEventsTest
} from '../types/CityEvent';
import { TypeTitle } from '../types/Constant';

export const fetchCityEventDetails = async ({
  eventId
}: FetchCityEventDetailsTestProps): Promise<CityEventReturn | undefined> => {
  const cityName = store.getState().generalReducer.currentCity.cityName;

  try {
    const response = await axios.get(`${SERVER_HOST}/city-event-details`, {
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
      console.error('[cityEvent] Error : ', axiosError.response.data.error);
      throw Error(axiosError.response.data.error);
    }
  }
};

export const fetchCityEventListTest = async ({
  categoryIdList = [],
  activeTab = TypeTitle.Coming,
  nextEventPageIds = null,
  currentPeriod = null,
  startDate = null,
  endDate = null,
  search = null
}: FetchLilleCulturalEventsTest): Promise<CityEventListReturn | undefined> => {
  const address = `${SERVER_HOST}`;
  const cityName = store.getState().generalReducer.currentCity.cityName;
  // const period = store.getState().eventReducer.periods;
  console.log({
    categoryIdList,
    activeTab,
    nextEventPageIds,
    currentPeriod,
    startDate,
    endDate,
    search
  });
  // const dateRange = getPeriod(period);

  try {
    const response = await axios.get(`${address}/city-events`, {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        type: activeTab,
        cityName,
        categoryId: categoryIdList.join(','),
        page: nextEventPageIds,
        from: startDate ?? null,
        to: endDate ?? null,
        search: search && search.length > 0 ? search : null
      }
    });

    return response.data as CityEventListReturn;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response) {
      console.error('[cityEvent] Error : ', axiosError.response.data.error);
      throw Error(axiosError.response.data.error);
    }
  }
};
