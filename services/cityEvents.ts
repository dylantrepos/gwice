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

  console.log({
    startDate,
    endDate,
  });

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

  const test = response.data.events.find((event: any) => event.uid === 16608328);

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
  const URL = `https://api.openagenda.com/v2/agendas/89904399/events?key=b139873be49e4eaf8802204829301bb2&includeLabels=true&detailed=1`;

  console.log('[Request] fetchCityEventDetails : ', `${address}/event`);
  console.log('[Request] fetchCityEventDetails Id : ', `${eventId}`);

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

  console.log('[Response] fetchLilleCulturalEvents - ', response.data);

  return response.data as CityEventDetailsRequest;
}

