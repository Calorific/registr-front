import useSWR from 'swr';
import axiosInstance from '@/app/axiosProvider/axiosProvider';

const getAppointmentStatus = async ({ key, appointmentId }: { key: string, appointmentId?: string }) => {
  return axiosInstance.get(key + appointmentId).then(res => res.data);
};

export const useGetAppointmentStatus = (appointmentId?: string) => {
  const { data, error, isLoading } = useSWR({
    key: 'appointments/status/',
    appointmentId,
  }, getAppointmentStatus);
  return { appointmentStatus: data, error, isLoading };
};

