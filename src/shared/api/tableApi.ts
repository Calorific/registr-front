import { DEFAULT_TABLE_PAGE_SIZE, ITableParams } from '../ui/CustomTable';
import axiosInstance from '@/app/axiosProvider/axiosProvider';
import { AxiosResponse } from 'axios';
import useSWR from 'swr';
import { IAppointmentTableData } from '@/features/AppointmentsTable/model/IAppointmentTableData';
import { IPatientTableData } from '@/features/PatientsTable/model/IPatientTableData';

const getTableData = async ({ key, tableParams }: { key: string, tableParams: ITableParams }) => {
  return await axiosInstance.get(
      key, {
        params: {
          filters: tableParams.filters,
          sortParams: tableParams.sortParams,
          limit: DEFAULT_TABLE_PAGE_SIZE,
          offset: (tableParams.currentPage - 1) * DEFAULT_TABLE_PAGE_SIZE,
        },
      })
      .then((res: AxiosResponse<{
        data: any, total: number
      }>) => ({ data: res.data.data, total: res.data.total }));
};

export const useGetAppointments = (tableParams: ITableParams): {
  data: IAppointmentTableData | undefined,
  error: any,
  isLoading: boolean
} => {
  const { data, error, isLoading } = useSWR({
    key: 'appointments',
    tableParams,
  }, getTableData);
  return { data, error, isLoading };
};

export const useGetPatients = (tableParams: ITableParams): {
  data: IPatientTableData | undefined,
  error: any,
  isLoading: boolean
} => {
  const { data, error, isLoading } = useSWR({
    key: 'patients/',
    tableParams,
  }, getTableData);
  return { data, error, isLoading };
};