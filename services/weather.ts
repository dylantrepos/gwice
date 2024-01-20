import { SERVER_HOST } from '@env';
import { Weather } from '../types/Weather';
import axios from 'axios';
import { RootState, store } from '../store/store';
import { useSelector } from 'react-redux';

export const fetchWeather = async (city: string): Promise<Weather> => {
  const address = `${SERVER_HOST}`;
  const { laps, range } = store.getState().general.weatherSettings;

  const response = await axios.get(`${address}/weather`, {
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      city,
      laps,
      range
    }
  });

  if (typeof response.data === 'object' && response.data !== null) {
    return response.data as Weather;
  } else {
    throw new Error('Received data is not of type Weather');
  }
}