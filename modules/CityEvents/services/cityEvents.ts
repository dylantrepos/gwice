import { SERVER_HOST } from '@env';
import axios from 'axios';
import { CityEventCardRequest, CityEventDetailsRequest } from '../types/Events';
import { RootState, store } from '../../../store/store';
import { useSelector } from 'react-redux';


type FetchLilleCulturalEvents = {
  categoryIdList?: number[];
  nextEventPageIds?: (number | string)[] | null;
  currentPeriod?: string | null;
  customPeriod?: {
    startDate: Date;
    endDate: Date;
  } | null;
  startDate?: Date | null;
  endDate?: Date | null;
  search?: string | null;
}


export const fetchCityEvents = async ({
  categoryIdList = [],
  nextEventPageIds = null,
  currentPeriod = null,
  customPeriod = null,
  startDate = null,
  endDate = null,
  search = null,
}: FetchLilleCulturalEvents): Promise<CityEventCardRequest> => {
  const address = `${SERVER_HOST}`;
  const cityName = store.getState().generalReducer.currentCity.cityName;
  
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
        period: currentPeriod !== 'custom' ? currentPeriod : null,
        startDate: customPeriod?.startDate ?? null,
        endDate: customPeriod?.endDate ?? null,
        search: (search && search.length > 0) ? search : null,
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
  const cityName = store.getState().generalReducer.currentCity.cityName;
  const address = `${SERVER_HOST}`;

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

