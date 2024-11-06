export interface IBooleanFields {
  name: string;
  displayName: string;
}

export interface IBooleanTextFields {
  booleanName: string;
  displayName: string;
  textName: string;
}

export interface ITextDateFields {
  textName: string;
  displayName: string;
  dateName: string;
}

export interface IIntegerFields {
  name: string;
  displayName: string;
  secondName?: string;
}

export interface IDrugTherapyFields {
  displayName: string;
  medicine_prescriptions: {
    id: number;
    displayName: string;
    description: string;
  }[];
}

export interface xx {
  appointment_id: number;
  medicine_prescriptions: {
    id: number;
    dose: string;
    note: string;
  }[];
}
