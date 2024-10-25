import axiosInstance from '@/app/axiosProvider/axiosProvider';
import useSWR from 'swr';
import { IBooleanTextFields } from '@/entities/Appointment/model/IFormDataFields';
import { AxiosError } from 'axios';

const getDiagnoseFields = async (key: string) => {
  return axiosInstance.get(key).then(res => res.data);
};

const getDiagnoseData = async ({ key, appointmentId }: { key: string, appointmentId?: string }) => {
  return axiosInstance.get(key + appointmentId).then(res => res.data);
};

export const useGetDiagnoseFields = (): {
  fields: IBooleanTextFields[],
  error: AxiosError,
  isLoading: boolean
} => {
  const { data, error, isLoading } = useSWR(
    'appointments/block/diagnose/fields',
    getDiagnoseFields,
  );
  return { fields: data, error, isLoading };
};

export const useGetCurrentDiagnoseData = (appointmentId?: string) => {
  const { data, error, isLoading } = useSWR({
      key: 'appointments/block/diagnose/',
      appointmentId,
    },
    getDiagnoseData,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      shouldRetryOnError: (err => !(err.response.data.error_code === 404)),
    },
  );
  return { currentData: data, error, isLoading };
};

export const useGetPreviousDiagnoseData = (appointmentId?: string) => {
  const { data, error, isLoading } = useSWR({
        key: 'appointments/block/diagnose/previous/',
        appointmentId,
      },
      getDiagnoseData,
      {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        shouldRetryOnError: (err => !(err.response.data.error_code === 404)),
      },
  );
  return { previousData: data, error, isLoading };
};

export const diagnoseCreate = async (appointment_id: string, values: any) => {
  return axiosInstance.post('appointments/block/diagnose/create', { appointment_id, ...values }).then(res => res.data);
};
export const diagnoseUpdate = async (appointment_id: string, values: any) => {
  return axiosInstance.patch('appointments/block/diagnose/update/' + appointment_id, values).then(res => res.data);
};