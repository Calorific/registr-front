import axiosInstance from '@/app/axiosProvider/axiosProvider';
import useSWR, { KeyedMutator } from 'swr';
import { IPatientTable } from '@/entities/Patient/model/IPatientTable';
import { AxiosError } from 'axios';

export const getPatientsByName = async ({ key, full_name }: { key: string, full_name: string }) => {
  return axiosInstance.get(key, { params: { filters: { full_name: [full_name] } } }).then(res => res.data);
};

export const useGetPatientsByName = (full_name: string): {
  patients: { data: IPatientTable[], total: number },
  isLoading: boolean,
  error: AxiosError,
  mutate: KeyedMutator<any>
} => {
  const { data, isLoading, error, mutate } = useSWR({ key: 'patients/', full_name }, getPatientsByName);
  return { patients: data, isLoading, error, mutate };
};