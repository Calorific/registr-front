import axiosInstance from '@/app/axiosProvider/axiosProvider';
import { AxiosError } from 'axios';
import useSWR from 'swr';
import { IDrugTherapyFields } from '@/entities/Appointment/model/IFormDataFields';

const getFields = async (key: string) => {
  return axiosInstance.get(key).then(res => res.data);
};

const getData = async ({ key, appointmentId }: { key: string, appointmentId: string }) => {
  return axiosInstance.get(key + appointmentId).then(res => res.data);
};

export const useGetDrugTherapyFields = (): {
  fields: IDrugTherapyFields[]
  error: AxiosError,
  isLoading: boolean
} => {
  const { data, error, isLoading } = useSWR(
      'appointments/block/purpose/fields',
      getFields,
  );
  return { fields: data, error, isLoading };
};

export const useGetCurrentDrugTherapyData = (appointmentId: string) => {
  const { data, error, isLoading } = useSWR({
        key: 'appointments/block/purpose/',
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


export const drugTherapyCreate = async (appointment_id: string, values: any) => {
  return axiosInstance.post('appointments/block/purpose/create', { appointment_id, ...values }).then(res => res.data);
};
export const drugTherapyUpdate = async (appointment_id: string, values: any) => {
  return axiosInstance.patch('appointments/block/purpose/update/' + appointment_id, values).then(res => res.data);
};