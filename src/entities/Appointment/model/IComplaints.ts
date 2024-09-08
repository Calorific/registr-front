export interface IComplaints {
  note: string,
  height: number,
  weight: number,
  bmi: string,
  systolic_bp: number,
  diastolic_bp: number,
  heart_rate: number,
  six_min_walk_distance: number,
  other_symptoms: string

  [other: string]: unknown
}
