export type AlertState = {
  alertClass: 'alert-success' | 'alert-error' | 'alert-info' | 'alert-warning';
  alertIcon:
    | 'bi-x-circle-fill'
    | 'bi-check-circle-fill'
    | 'bi-exclamation-triangle-fill'
    | 'bi-info-circle-fill';
  message: string;
};
