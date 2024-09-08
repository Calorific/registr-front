import axiosInstance from '@/app/axiosProvider/axiosProvider';
import useSWR from 'swr';

export const getData = async ({ key, id }: { key: string, id: string }) => {
  return axiosInstance.get(key + id).then(res => res.data);
};

export const useGetPatient = (patientId: string) => {
  const { data, error, isLoading } = useSWR({ key: 'patients/', id: patientId }, getData);
  return { data, error, isLoading };
};

export const useGetPatientByAppointment = (appointmentId: string) => {
  const { data, error, isLoading } = useSWR({ key: 'patients/appointment/', id: appointmentId }, getData);
  return { data, error, isLoading };
};