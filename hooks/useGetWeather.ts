import { useQuery } from 'react-query';
import { SERVER_HOST, SERVER_PORT } from '@env';

type UseGetWeather = {
  isLoading: boolean;
  isError: boolean;
  data: any;
  error: unknown
}

type UseGetWeatherResponse = {
  message: string;
}

const useGetWeather = (): UseGetWeather => {
  const { isLoading, isError, data, error } = useQuery(
    'weather', 
    async () => { 
      const address = `${SERVER_HOST}`
      console.log('address : ', `${address}/check`);
      const response = await fetch(`${address}/check`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });


      if (!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.status} ${response.statusText}`);
      }

      return response.json() as Promise<UseGetWeatherResponse>;
    }
    );

  if (isLoading) {
    // Handle loading state
    console.log({isLoading});
  }

  if (isError) {
    // Handle error state
    console.log({error});
  }

  if (data) {
    console.log(data.message);
  }

  return { isLoading, isError, data, error };
};

export default useGetWeather;
