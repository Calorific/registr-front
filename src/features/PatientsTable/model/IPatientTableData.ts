import { ITableData } from '../../../shared/ui/CustomTable';
import { IPatientTable } from '@/entities/Patient/model/IPatientTable';

export interface IPatientTableData extends ITableData {
  data?: IPatientTable[];
}