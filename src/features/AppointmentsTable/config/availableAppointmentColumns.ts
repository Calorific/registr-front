import { IAvailableColumns } from '../../../shared/ui/CustomTable';

export const availableAppointmentColumns: IAvailableColumns[] = [
  {
    title: 'ID',
    value: 'id',
    disabled: true,
  },
  {
    title: 'ФИО',
    value: 'full_name',
    disabled: true,
  },
  {
    title: 'Дата',
    value: 'date',
  },
];