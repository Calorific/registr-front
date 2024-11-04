import React, { FC, memo } from 'react';
import { ITextDateFields } from '@/entities/Appointment/model/IFormDataFields';
import { Col, Form, FormInstance, InputNumber } from 'antd';
import { DateInput } from '@/shared/ui/Form/DateInput';

interface HormonalBloodFieldProps {
  field: ITextDateFields;
  form: FormInstance;
}

const _HormonalBloodField: FC<HormonalBloodFieldProps> = ({ field, form }) => {
  const value = Form.useWatch(field.textName, form);

  return (
    <>
      <Col span={12}>
        <Form.Item
          name={field.textName}
          label={field.displayName}
        >
          <InputNumber type="number" placeholder="0.0" />
        </Form.Item>
      </Col>

      <Col span={12}>
        <DateInput label="Дата проведения анализа" name={field.dateName} required={!!value} />
      </Col>
    </>
  );
}

export const HormonalBloodField = memo(_HormonalBloodField);
