import { IPatientNew } from '@/entities/Patient/model/IPatientNew';
import axiosInstance from '@/app/axiosProvider/axiosProvider';
import { dateFormatConverter } from '@/shared/helpers/dateFormatConverter';

export const createPatient = async (values: IPatientNew) => {
  if (values.birth_date) {
    values.birth_date = dateFormatConverter(values.birth_date) as any;
  }
  if (values.dod) {
    values.dod = dateFormatConverter(values.dod);
  }
  if (values.last_hospitalization_date) {
    values.last_hospitalization_date = dateFormatConverter(values.last_hospitalization_date);
  }
  return axiosInstance.post('patients/', values).then(res => res.data);
};