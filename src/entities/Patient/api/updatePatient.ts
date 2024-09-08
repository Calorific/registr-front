import { IPatientNew } from '@/entities/Patient/model/IPatientNew';
import axiosInstance from '@/app/axiosProvider/axiosProvider';

export const updatePatient = async (patient_id: string, values: IPatientNew) => {
  if (values.birth_date && typeof values.birth_date !== 'string') {
    values.birth_date = new Date(values.birth_date).toLocaleDateString();
  }
  if (values.dod && typeof values.dod !== 'string') {
    values.dod = new Date(values.dod).toLocaleDateString();
  }
  if (values.last_hospitalization_date && typeof values.last_hospitalization_date !== 'string') {
    values.last_hospitalization_date = new Date(values.last_hospitalization_date).toLocaleDateString();
  }
  return axiosInstance.patch('patients/' + patient_id, values).then(res => res.data);
};