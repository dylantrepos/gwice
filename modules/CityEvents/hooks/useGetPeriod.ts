import moment from "moment";
import { SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";

type UseGetPeriodProps = {
  period?: string;
};

type UseGetPeriod = {
  currentPeriod: {
    start: Date;
    end: Date;
    title: string;
  };
  allPeriods: string[];
  updatePeriod: (period: string) => void;
};

type Period = {
    start: Date;
    end: Date;
    title: string;
};

const Periods: Record<string, Period> = {
  'always': {
    start: moment.utc().add(1, 'hour').toDate(),
    end: moment.utc().add(5, 'year').endOf('day').toDate(),
    title: 'always',
  },
  'today': {
    start: moment.utc().add(1, 'hour').toDate(),
    end: moment.utc().add(1, 'hour').endOf('day').toDate(),
    title: 'today',
  },
  'tomorrow': {
    start: moment.utc().add(1, 'day').startOf('day').toDate(),
    end: moment.utc().add(1, 'day').endOf('day').toDate(),
    title: 'tomorrow',
  },
  'weekend': {
    start: moment.utc().isoWeekday(6).startOf('day').toDate(),
    end: moment.utc().isoWeekday(7).endOf('day').toDate(),
    title: 'weekend',
  },
  'week': {
    start: moment.utc().add(1, 'hours').toDate(),
    end: moment.utc().isoWeekday(7).endOf('day').toDate(),
    title: 'week',
  },
};

export const useGetPeriod = ({
  period = 'always'
}: UseGetPeriodProps): UseGetPeriod  => {
  const { t } = useTranslation();
  
  const [currentPeriod, setCurrentPeriod] = useState<Period>(Periods[period as string ?? 'always']);

  const updatePeriod = (period: string) => {
    const periodObj = Periods[period as string];
    setCurrentPeriod(periodObj ?? Periods['always']);
  }

  return { currentPeriod, updatePeriod, allPeriods: Object.keys(Periods)};
}