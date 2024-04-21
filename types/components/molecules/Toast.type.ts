export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info'
}

export enum ToastPosition {
  TOP = 'top',
  BOTTOM = 'bottom'
}

export interface ToastContent {
  id: number;
  message: string;
  position: ToastPosition;
  type: ToastType;
}
