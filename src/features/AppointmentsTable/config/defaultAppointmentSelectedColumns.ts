'use client';
import { isWindowDefined } from 'swr/_internal';

export const defaultAppointmentSelectedColumns = () => {
  if (isWindowDefined) {
    const appointmentsSelectedColumns = localStorage.getItem('appointmentsSelectedColumns');
    if (appointmentsSelectedColumns) {
      return appointmentsSelectedColumns.split(',');
    }
  }
  return ['id', 'full_name', 'date'];
};