import { useQuery } from 'react-query';
import { SERVER_HOST, SERVER_PORT } from '@env';
import { Weather } from '../types/Weather';
import { fetchWeather } from '../services/weather';

type UseGetWeather = {
  isLoading: boolean;
  isError: boolean;
  data: Weather | undefined;
  error: unknown
}

const useGetWeather = (city: string): UseGetWeather => {
  const { isLoading, isError, data, error } = useQuery(
    'weather', 
    () => fetchWeather(city),
  );

  return { isLoading, isError, data, error };
};

export default useGetWeather;
