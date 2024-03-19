import { useQuery } from 'react-query';
import { fetchWeather } from '../features/Weather/services/weather';
import { type OpenMeteoData, type WeatherSettings } from '../features/Weather/types/Weather';

interface UseGetWeather {
  isLoading: boolean;
  isError: boolean;
  data: OpenMeteoData | undefined;
  error: unknown;
}
const useGetWeather = (
  city: string,
  settings: WeatherSettings,
  refetchHome: boolean
): UseGetWeather => {
  const { isLoading, isError, data, error } = useQuery(
    ['weather', city, settings, refetchHome],
    async () => await fetchWeather(city)
  );

  return { isLoading, isError, data, error };
};

export default useGetWeather;
