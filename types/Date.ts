export type PeriodDetails = {
  start: Date;
  end: Date;
  title: PERIODS;
};

export enum PERIODS {
  ALWAYS = 'always',
  TODAY = 'today',
  TOMORROW = 'tomorrow',
  WEEKEND = 'weekend',
  WEEK = 'week',
}