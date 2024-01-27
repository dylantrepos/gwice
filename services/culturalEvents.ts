import { SERVER_HOST } from '@env';
import axios from 'axios';
import { CulturalEvents, WhenQuery } from '../types/CulturalEvents';

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