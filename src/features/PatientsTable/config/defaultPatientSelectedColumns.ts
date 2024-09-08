'use client';
import { isWindowDefined } from 'swr/_internal';

export const defaultPatientSelectedColumns = () => {
  if (isWindowDefined) {
    const patientsSelectedColumns = localStorage.getItem('patientsSelectedColumns');
    if (patientsSelectedColumns) {
      return patientsSelectedColumns.split(',');
    }
  }
  return ['id', 'full_name', 'gender', 'age', 'location', 'district', 'address'];
};