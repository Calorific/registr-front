import axiosInstance from '@/app/axiosProvider/axiosProvider';
import { AxiosError } from 'axios';
import useSWR from 'swr';
import { ILabTestsFields } from '@/entities/Appointment/model/ILabTestsFields';

const getFields = async (key: string) => {
  return axiosInstance.get(key).then(res => res.data);
};

const getData = async ({ key, appointmentId }: { key: string, appointmentId: string }) => {
  return axiosInstance.get(key + appointmentId).then(res => res.data);
};

export const useGetLabTestsFields = (): {
  fields: ILabTestsFields
  error: AxiosError,
  isLoading: boolean
} => {
  const { data, error, isLoading } = useSWR(
      'appointments/block/laboratory_test/fields',
      getFields,
  );
  return { fields: data, error, isLoading };
};

export const useGetCurrentLabTestsData = (appointmentId: string) => {
  const { data, error, isLoading } = useSWR({
        key: 'appointments/block/laboratory_test/',
        appointmentId,
      },
      getData,
      {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        shouldRetryOnError: (err => !(err.response.data.error_code === 404)),
      },
  );
  return { currentData: data, error, isLoading };
};


export const labTestsCreate = async (appointment_id: string, values: any) => {
  return axiosInstance.post('appointments/block/laboratory_test/create', { appointment_id, ...values }).then(res => res.data);
};
export const labTestsUpdate = async (appointment_id: string, values: any) => {
  return axiosInstance.patch('appointments/block/laboratory_test/update/' + appointment_id, values).then(res => res.data);
};