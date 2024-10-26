import React, { FC, memo, useMemo } from 'react';
import MaskedInput from 'antd-mask-input';
import { DatePicker, Form } from 'antd';
import { Dayjs } from 'dayjs';

interface DateInputProps {
  required?: boolean;
  label?: string;
  name: string;
  initialValue?: string | Dayjs;
  type?: 'DEFAULT' | 'MASKED';
}

const _DateInput: FC<DateInputProps> = ({ required = true, label, name, initialValue, type = 'MASKED' }) => {

  const rules = useMemo(() => {
    if (required && type === 'MASKED') {
      return [
        { required: true, message: 'Введите дату', },
        { pattern: new RegExp(/^\d\d\.\d\d\.\d\d\d\d$/), message: 'Введите корректную дату' },
      ];
    }

    if (required && type === 'DEFAULT') {
      return [
        { required: true, message: 'Введите дату', },
      ];
    }

    if (type === 'MASKED') {
      return [{ pattern: new RegExp(/^(\d\d\.\d\d.\d\d\d\d|__\.__\.____)$/), message: 'Введите корректную дату' }];
    }

    return [];
  }, [required, type]);

  return (
    <Form.Item
      label={label}
      name={name}
      rules={rules}
      initialValue={(!initialValue || Number.isNaN(+initialValue)) ? undefined : initialValue}
    >
      {type === 'DEFAULT' ? <DatePicker inputReadOnly format="DD.MM.YYYY" /> : <MaskedInput mask="00.00.0000" />}
    </Form.Item>

  );
}

export const DateInput = memo(_DateInput);
