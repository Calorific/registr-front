import { ITableData } from '../../../shared/ui/CustomTable';
import { IAppointmentTable } from '@/entities/Appointment/model/IAppointmentTable';

export interface IAppointmentTableData extends ITableData {
  data?: IAppointmentTable[];
}