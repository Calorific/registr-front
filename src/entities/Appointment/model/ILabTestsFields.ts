import { ITextDateFields } from '@/entities/Appointment/model/IFormDataFields';

export interface ILabTestsFields {
  hormonal_blood_analysis: ITextDateFields[],
  general_blood_analysis: ITextDateFields[],
  blood_chemistry: ITextDateFields[],
  general_urine_analysis: ITextDateFields[]
}