import { SERVER_HOST } from '@env';
import { OpenMeteoData } from '../types/Weather';
import axios from 'axios';
import { store } from '../store/store';

export const fetchWeather = async (city: string): Promise<OpenMeteoData> => {
  const address = `${SERVER_HOST}`;

  console.log('[Request] fetchWeather');
  const response = await axios.get(`${address}/weather`, {
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      city
    }
  });

  if (typeof response.data === 'object' && response.data !== null) {
    return response.data as OpenMeteoData;
  } else {
    throw new Error('Received data is not of type Weather');
  }
}