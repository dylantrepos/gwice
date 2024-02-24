import axios from "axios";
import { PERIODS } from "../types/Date";
import { SERVER_HOST } from "@env";

export const fetchPeriodsAvailable = async (): Promise<PERIODS[]> => {
  const address = `${SERVER_HOST}`;

  const response = await axios.get(`${address}/periods`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data.periods as PERIODS[];
}
