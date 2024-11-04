import { ITextDateFields } from '@/entities/Appointment/model/IFormDataFields';

export interface LabTestFields {
  fields: ITextDateFields[];
  dateName: string ;
}

export interface ILabTestsFields {
  hormonal_blood_analysis: ITextDateFields[];
  general_blood_analysis: LabTestFields;
  blood_chemistry: LabTestFields;
  general_urine_analysis: LabTestFields;
}