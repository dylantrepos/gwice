import { useQuery } from 'react-query';
import { SERVER_HOST, SERVER_PORT } from '@env';
import { Weather, WeatherSettings } from '../types/Weather';
import { fetchWeather } from '../services/weather';

type UseGetWeather = {
  isLoading: boolean;
  isError: boolean;
  data: Weather | undefined;
  error: unknown
}

const useGetWeather = (city: string, settings: WeatherSettings): UseGetWeather => {
  console.log('settings update : ', settings);
  const { isLoading, isError, data, error } = useQuery(
    ['weather', city, settings], 
    () => fetchWeather(city),
  );

  return { isLoading, isError, data, error };
};

export default useGetWeather;
