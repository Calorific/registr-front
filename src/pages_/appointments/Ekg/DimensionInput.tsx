import React, { FC, memo } from 'react';
import { IIntegerFields } from '@/entities/Appointment/model/IFormDataFields';
import { Form, FormInstance, InputNumber } from 'antd';
import { CrossIcon } from '@/shared/icons';

interface DimensionInputProps {
  field: IIntegerFields;
  form: FormInstance;
}

const _DimensionInput: FC<DimensionInputProps> = ({ field, form }) => {
  const first = Form.useWatch(field.name, form);
  const second = Form.useWatch(field.secondName, form);
  const required = !!first || !!second;

  return (
    <div className="flex gap-x-[8px] items-end">
      <Form.Item
        label={field.displayName}
        name={field.name}
        rules={[{ required, message: 'Это поле обязательно' }]}
      >
        <InputNumber type="number" className="w-full" placeholder="0.0" />
      </Form.Item>

      <CrossIcon className="mb-[17px]" />

      <Form.Item
        label=""
        name={field.secondName}
        rules={[{ required, message: 'Это поле обязательно' }]}
      >
        <InputNumber type="number" className="w-full" placeholder="0.0" />
      </Form.Item>
    </div>
  );
}

export const DimensionInput = memo(_DimensionInput);
