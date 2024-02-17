import moment from "moment";

export const getDateRange = (period: string) => {
  let start: moment.Moment = moment.utc().add(1, 'hour').startOf('day');
  let end: moment.Moment = moment.utc().add(1, 'hour').endOf('day');

  switch (period) {
    case 'always':
      start = moment.utc().add(1, 'hour');
      end = moment.utc().add(10, 'year').endOf('day');
      break;
    case 'today':
      start = moment.utc().add(1, 'hour');
      end = moment.utc().add(1, 'hour').endOf('day');
      break;
    case 'tomorrow':
      start = moment.utc().add(1, 'day').startOf('day');
      end = moment.utc().add(1, 'day').endOf('day');
      break;
    case 'weekend':
      start = moment.utc().isoWeekday(6).startOf('day');
      end = moment.utc().isoWeekday(7).endOf('day');
      break;
    case 'week':
      start = moment.utc().add(1, 'hours');
      end = moment.utc().isoWeekday(7).endOf('day');
      break;
  }

  return {
    start: start.toDate(),
    end: end.toDate()
  };
}