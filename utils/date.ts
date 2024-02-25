import moment from "moment";
import { PERIODS } from "../types/Date";


export const getPeriod = (dateRange: PERIODS): { start: Date; end: Date; title: PERIODS; } =>  {
  switch (dateRange) {
    case PERIODS.ALWAYS:
      return {
        start: moment.utc().add(1, 'hour').toDate(),
        end: moment.utc().add(5, 'year').endOf('day').toDate(),
        title: PERIODS.ALWAYS,
      };
    case PERIODS.TODAY:
      return {
        start: moment.utc().add(1, 'hour').toDate(),
        end: moment.utc().add(1, 'hour').endOf('day').toDate(),
        title: PERIODS.TODAY,
      };
    case PERIODS.TOMORROW:
      return {
        start: moment.utc().add(1, 'day').startOf('day').toDate(),
        end: moment.utc().add(1, 'day').endOf('day').toDate(),
        title: PERIODS.TOMORROW,
      };
    case PERIODS.WEEKEND:
      return {
        start: moment.utc().isoWeekday(6).startOf('day').toDate(),
        end: moment.utc().isoWeekday(7).endOf('day').toDate(),
        title: PERIODS.WEEKEND,
      };
    case PERIODS.WEEK:
      return {
        start: moment.utc().add(1, 'hours').toDate(),
        end: moment.utc().isoWeekday(7).endOf('day').toDate(),
        title: PERIODS.WEEK,
      };
    default:
      return {
        start: moment.utc().add(1, 'hour').toDate(),
        end: moment.utc().add(5, 'year').endOf('day').toDate(),
        title: PERIODS.ALWAYS,
      };
  }
};