import { IPatientTable } from '@/entities/Patient/model/IPatientTable';
import { DEFAULT_TABLE_PAGE_SIZE, ITableParams } from '../../../shared/ui/CustomTable';
import axiosInstance from '@/app/axiosProvider/axiosProvider';
import { AxiosError, AxiosResponse } from 'axios';

export const getPatients = async (
    props: ITableParams = {
      currentPage: 1,
      filters: {},
      sortParams: null,
    },
): Promise<{ data: IPatientTable[], total: number }> => {
  try {
    const { data }: AxiosResponse<{
      data: IPatientTable[], total: number
    }> = await axiosInstance.get(
        'patients/', {
          params: {
            filters: props.filters,
            sortParams: props.sortParams,
            limit: DEFAULT_TABLE_PAGE_SIZE,
            offset: (props.currentPage - 1) * DEFAULT_TABLE_PAGE_SIZE,
          },
        });
    return data;
  } catch (e: AxiosError | any) {
    return { data: [], total: 0 };
  }

};