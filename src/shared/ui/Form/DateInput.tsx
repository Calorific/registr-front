import React, { FC, memo, useMemo } from 'react';
import MaskedInput from 'antd-mask-input';
import { DatePicker, Form } from 'antd';

interface DateInputProps {
  required?: boolean;
  label: string;
  name: string;
  initialValue?: string;
  type?: 'DEFAULT' | 'MASKED';
}

const _DateInput: FC<DateInputProps> = ({ required = true, label, name, initialValue, type = 'DEFAULT' }) => {

  const rules = useMemo(() => {
    if (required) {
      return [
        { required: true, message: 'Введите дату последней госпитализации', },
        { pattern: new RegExp(/^\d\d\.\d\d.\d\d\d\d$/), message: "Введите корректную дату" },
      ];
    }

    return [{ pattern: new RegExp(/^(\d\d\.\d\d.\d\d\d\d|__\.__\.____)$/), message: "Введите корректную дату" }];
  }, [required]);

  return (
    <Form.Item
      label={label}
      name={name}
      rules={rules}
      initialValue={initialValue}
    >
      {type === 'DEFAULT' ? <DatePicker /> : <MaskedInput mask="00.00.0000" />}
    </Form.Item>

  );
}

export const DateInput = memo(_DateInput);
