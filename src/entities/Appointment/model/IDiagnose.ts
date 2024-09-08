export interface IDiagnose {
  diagnose: string,
  classification_func_classes: 1 | 2 | 3 | 4,
  classification_adjacent_release: 'низкая' | 'умеренно-сниженная' | 'сохранная',
  classification_nc_stage: 'I' | 'IIа' | 'IIб' | 'III',

  [other: string]: unknown
}