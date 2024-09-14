import axiosInstance from '@/app/axiosProvider/axiosProvider';
import { AxiosError } from 'axios';
import useSWR from 'swr';
import { IBooleanFields } from '@/entities/Appointment/model/IFormDataFields';

const getFields = async (key: string) => {
  return axiosInstance.get(key).then(res => res.data);
};

const getData = async ({ key, appointmentId }: { key: string, appointmentId: string }) => {
  return axiosInstance.get(key + appointmentId).then(res => res.data);
};

export const useGetComplaintsFields = (): {
  fields: {
    complaints: IBooleanFields[],
    conditions: IBooleanFields[]
  }
  error: AxiosError,
  isLoading: boolean
} => {
  const { data: complaints, error: complaintsError, isLoading: complaintsIsLoading } = useSWR(
      'appointments/block/complaint/fields',
      getFields,
  );
  const { data: conditions, error: conditionsError, isLoading: conditionsIsLoading } = useSWR(
      'appointments/block/clinical_condition/fields',
      getFields,
  );
  return {
    fields: { complaints, conditions },
    error: complaintsError || conditionsError,
    isLoading: complaintsIsLoading || conditionsIsLoading,
  };
};

export const useGetCurrentComplaintsData = (appointmentId: string) => {

  const { data: complaints, error: complaintsError, isLoading: complaintsIsLoading } = useSWR(
      { key: 'appointments/block/complaint/', appointmentId },
      getData,
      {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        shouldRetryOnError: (err => !(err?.response?.data?.error_code === 404)),
      },
  );
  const { data: conditions, error: conditionsError, isLoading: conditionsIsLoading } = useSWR(
      { key: 'appointments/block/clinical_condition/', appointmentId },
      getData,
      {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        shouldRetryOnError: (err => !(err?.response?.data?.error_code === 404)),
      },
  );
  return {
    data: (complaints && conditions) ? { ...complaints, ...conditions } : null,
    error: complaintsError || conditionsError,
    isLoading: complaintsIsLoading || conditionsIsLoading,
  };

};


export const complaintsCreate = async (appointment_id: string, values: any) => {
  return axiosInstance.post('appointments/block/complaint/create_with_condition/', { appointment_id, ...values }).then(res => res.data);
};
export const complaintsUpdate = async (appointment_id: string, values: any) => {
  return axiosInstance.patch('appointments/block/complaint/update/' + appointment_id, values).then(res => res.data);
};