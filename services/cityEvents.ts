import { SERVER_HOST } from '@env';
import axios from 'axios';
import { AllEvents, CityEventCard, CityEventCardRequest, CityEventDetails, CityEventDetailsRequest, CulturalEvents, EventsCategory, WhenQuery } from '../types/Events';
import { store } from '../store/store';

export const fetchCulturalEvents = async (city: string, when: WhenQuery): Promise<CulturalEvents> => {
  const address = `${SERVER_HOST}`;


  console.log('[Request] fetchCulturalEvents');
  const response = await axios.get(`${address}/events/cultural`, {
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      city,
      when
    }
  });

  if (typeof response.data === 'object' && response.data !== null) {
    return response.data as CulturalEvents;
  } else {
    throw new Error('Received data is not of type Weather');
  }
}

type FetchLilleCulturalEvents = {
  categoryIdList: number[];
}



export const fetchCityEvents = async ({
  categoryIdList = [],
}: FetchLilleCulturalEvents): Promise<CityEventCardRequest> => {
  const address = `${SERVER_HOST}`;
  const cityName = store.getState().general.currentCity.cityName;

  console.log(`adress: ${address}/events`);
  const response = await axios.get(
    `${address}/events`, 
    {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        cityName,
        categoryIdList: categoryIdList.join(',')
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

// export const fetchLilleCulturalEvents = async ({
//   categoriesId = [],
// }: FetchLilleCulturalEvents): Promise<CulturalEventCardRequest> => {
//   const address = `${SERVER_HOST}`;

//   const URL = `https://api.openagenda.com/v2/agendas/89904399/events?key=b139873be49e4eaf8802204829301bb2&includeLabels=true&includeFields[]=uid&includeFields[]=title&includeFields[]=location.city&includeFields[]=image.base&includeFields[]=image.filename&includeFields[]=categories-metropolitaines&includeFields[]=firstTiming.begin&includeFields[]=description&includeFields[]=lastTiming.end${categoriesId.map((category) => `&categories-metropolitaines[]=${category}`)}`

//   // console.log('[Request] fetchCulturalEvents : ', category);
//   const response = await axios.get(URL, {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   // console.log('[Response] fetchLilleCulturalEvents - ', response.data);
//   return response.data as CulturalEventCardRequest;
// }


//   // console.log('[Response] fetchLilleCulturalEvents - ', response.data);
//   return response.data.events[0] as LilleCulturalEvent;
// }

// export const fetchLilleAllCulturalEvents = async (
//   city: string,
//   when: WhenQuery,
// ): Promise<AllEvents> => {
//   const address = `${SERVER_HOST}`;

//   console.log('[Request] fetchLilleAllCulturalEvents');

//   const categoryId = eventsCategory['sport'];

//   const response = await axios.get(`https://api.openagenda.com/v2/agendas/89904399/events`, {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     params: {
//       key: 'b139873be49e4eaf8802204829301bb2',
//       detailed: 1,
//       city,
//       ['categories-metropolitaines[]']: categoryId
//     }
//   });
  
//   console.log('res : ', [{
//     title: 'Sport',
//     events: response.data,
//   }]);

//   // console.log('[Response] fetchLilleCulturalEvents - ', response.data);
//   return [{
//     title: 'Sport',
//     data: response.data,
//   }];
// }

// export const fetchLilleAllCulturalEvents = async (
//   city: string,
//   when: WhenQuery,
// ): Promise<AllEvents> => {
//   const address = `${SERVER_HOST}`;

//   console.log('[Request] fetchLilleAllCulturalEvents');

//   const response = await axios.get(`${address}/events/cultural`, {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     params: {
//       city,
//       when,
//       all: true,
//     }
//   });
  
//   // console.log('[Response] fetchLilleCulturalEvents - ', response.data);
//   return response.data.events as AllEvents ?? [];
// }