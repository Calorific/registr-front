import React, { FC, memo } from 'react';
import { IIntegerFields } from '@/entities/Appointment/model/IFormDataFields';
import { Form, FormInstance, InputNumber } from 'antd';

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

      <svg className="grow-0 shrink-0 mb-[17px]" width="8" height="7" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.19517 3.41697L0.98994 0.946655C0.663044 0.580464 0.922972 0 1.41385 0C1.57906 0 1.7361 0.0719074 1.84404 0.196988L4 2.69526L6.14972 0.195569C6.25649 0.0714151 6.4121 0 6.57585 0C7.06137 0 7.31846 0.574132 6.99513 0.936329L4.78068 3.41697L7.15099 6.05508C7.47857 6.41966 7.21982 7 6.72969 7C6.56529 7 6.40901 6.92857 6.30142 6.80426L4 4.14507L1.68143 6.80674C1.57447 6.92952 1.41961 7 1.25678 7C0.770421 7 0.512758 6.425 0.836456 6.06201L3.19517 3.41697Z" fill="#797979" />
      </svg>

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
