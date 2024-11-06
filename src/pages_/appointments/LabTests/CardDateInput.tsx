import React, { FC, memo } from 'react';
import { Form, FormInstance } from 'antd';
import { DateInput } from '@/shared/ui/Form/DateInput';
import { LabTestFields } from '@/entities/Appointment/model/ILabTestsFields';

interface CardDateInputProps {
  form: FormInstance;
  fields: LabTestFields['fields'];
  name: string;
}

const _CardDateInput: FC<CardDateInputProps> = ({ form, fields, name, }) => {
  const values: any = Form.useWatch([], form);

  return (
    <DateInput name={name} required={fields.some(f => !!values?.[f.textName])} />
  );
}

export const CardDateInput = memo(_CardDateInput);
