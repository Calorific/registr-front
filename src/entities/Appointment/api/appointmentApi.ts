import useSWR from 'swr';
import axiosInstance from '@/app/axiosProvider/axiosProvider';

const getAppointmentStatus = async ({ key, appointmentId }: { key: string, appointmentId?: string }) => {
  return axiosInstance.get(key + appointmentId).then(res => res.data);
};

const getFields = async (url: string) => {
  return axiosInstance.get(url).then(res => res.data);
};

export const useGetAppointmentStatus = (appointmentId?: string) => {
  const { data, error, isLoading } = useSWR({
    key: 'appointments/status/',
    appointmentId,
  }, getAppointmentStatus);
  return { appointmentStatus: data, error, isLoading };
};

export const useGetAppointment = (appointmentId?: string) => {
  const { data, error, isLoading } = useSWR({
    key: 'appointments/',
    appointmentId,
  }, getAppointmentStatus, {
    shouldRetryOnError: (err => !(err.response.data.error_code === 404)),
  });
  return { data, error, isLoading };
};

export const useGetAppointmentFields = () => {
  const { data, error, isLoading } = useSWR(
  'appointments/fields/',
  getFields
  );
  return { fields: data, error, isLoading };
};
