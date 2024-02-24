import moment from "moment";
import { SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { fetchPeriodsAvailable } from "../../../services/date";
import { setPeriods } from "../../../reducers/eventReducer";
import { PERIODS } from '../../../types/Date';


type UseGetPeriod = {
  currentPeriod: string;
  periodsAvailable: string[];
  updatePeriod: (period: string) => void;
};


export const useGetPeriod = (
  period: string = PERIODS.ALWAYS): UseGetPeriod => {
  const { periods } = useSelector((state: RootState) => state.eventReducer); 
  const [periodsAvailable, setPeriodsAvailable] = useState<PERIODS[]>(periods);
  const [currentPeriod, setCurrentPeriod] = useState<string>(period);
  const dispatch = useDispatch();

  if (periods.length === 0) {
    const getPeriods = async () => {
      const fetchPeriod = await fetchPeriodsAvailable();
      setPeriodsAvailable(fetchPeriod);
      dispatch(setPeriods(fetchPeriod));
    }
    getPeriods();
  }


  const updatePeriod = (period: string) => {
    setCurrentPeriod(period ?? PERIODS.ALWAYS);
  }

  return { currentPeriod, updatePeriod, periodsAvailable};
}