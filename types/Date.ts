export interface PeriodDetails {
  start: Date;
  end: Date;
  title: PERIODS;
}

export enum PERIODS {
  ALWAYS = 'always',
  TODAY = 'today',
  TOMORROW = 'tomorrow',
  WEEKEND = 'weekend',
  WEEK = 'week',
  CUSTOM = 'custom'
}

export interface PickDateRange {
  startDate: string;
  endDate: string;
}
