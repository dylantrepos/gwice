import { useQuery } from 'react-query';
import { OpenMeteoData, WeatherSettings } from '../types/Weather';
import { fetchWeather } from '../services/weather';

type UseGetWeather = {
  isLoading: boolean;
  isError: boolean;
  data: OpenMeteoData | undefined;
  error: unknown
}
const useGetWeather = (
  city: string, 
  settings: WeatherSettings, 
  refetchHome: boolean
): UseGetWeather => {
  const { isLoading, isError, data, error } = useQuery(
    ['weather', city, settings, refetchHome], 
    () => fetchWeather(city),
  );

  return { isLoading, isError, data, error };
};

export default useGetWeather;
