export interface IDrugTherapy {
  [key: string]: {
    isActive: boolean,
    drug_id: number,
    dosa: string,
    note: string
  };
}