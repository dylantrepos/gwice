export enum StatusId {
  Refused = -1,
  PendingModeration = 0,
  ReadyToPublish = 1,
  Published = 2
}

export enum StatusTitle {
  Refused = 'refused',
  PendingModeration = 'pending moderation',
  ReadyToPublish = 'ready to publish',
  Published = 'published'
}

export enum StateId {
  Scheduled = 1,
  Rescheduled = 2,
  MovedOnline = 3,
  Postponed = 4,
  Complete = 5,
  Canceled = 6
}

export enum StateTitle {
  Scheduled = 'scheduled',
  Rescheduled = 'rescheduled',
  MovedOnline = 'moved online',
  Postponed = 'postponed',
  Complete = 'complete',
  Canceled = 'canceled'
}

export enum TypeTitle {
  Coming = 'coming',
  Current = 'current',
  Favorite = 'favorite',
  All = 'all'
}
