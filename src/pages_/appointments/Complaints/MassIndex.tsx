import React, { FC, memo } from 'react';
import { Form, FormInstance, InputNumber } from 'antd';

interface MassIndexProps {
  form: FormInstance;
}

const _MassIndex: FC<MassIndexProps> = ({ form }) => {

  const height: number = Form.useWatch('height', form);
  const weight: number = Form.useWatch('weight', form);

  const bmi = ((weight || 0) / Math.pow(((height || 1) / 100), 2)).toFixed(1);

  return (
    <div className="flex gap-x-[24px] mb-[14px]">
      <Form.Item
        label="Рост"
        name="height"
        rules={[{ required: true, message: 'Укажите рост' }]}
        className="w-[222px] shrink-0 grow-0"
      >
        <InputNumber placeholder="СМ" type="number" className="w-full" />
      </Form.Item>

      <Form.Item
        label="Вес"
        name="weight"
        rules={[{ required: true, message: 'Укажите вес' }]}
        className="w-[222px] shrink-0 grow-0"
      >
        <InputNumber placeholder="кг" type="number" className="w-full" />
      </Form.Item>

      <div>
        <p className="text-[14px] text-[#797979]">
          ИМТ
        </p>

        <div className="grow-[1] border border-solid border-blue rounded-full py-[10px] px-[23px] text-blue h-[42px]">
          {+bmi ? bmi.padStart(4, '0') : '-'}
        </div>
      </div>
    </div>
  );
}

export const MassIndex = memo(_MassIndex);
