import axiosInstance from '@/app/axiosProvider/axiosProvider';

export const initAppointment = async (patient_id: string, date?: string) => {
  return axiosInstance.post('appointments/initialize', { patient_id, date }).then(res => res.data);
};