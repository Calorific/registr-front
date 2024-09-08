export interface IDrugTherapy {
  [key: string]: {
    isActive: boolean,
    medicine_prescription_id: number,
    dosa: string,
    note: string
  };
}