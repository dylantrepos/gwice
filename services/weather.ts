import { SERVER_HOST } from '@env';
import { Weather } from '../types/Weather';

export const fetchWeather = async (city: string): Promise<Weather> => {
  const address = `${SERVER_HOST}`
  const response = await fetch(`${address}/${city}/weather`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch weather data: ${response.status} ${response.statusText}`);
  }

  return response.json();
}