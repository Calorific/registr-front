import React, { FC, memo, useMemo } from 'react';
import MaskedInput from 'antd-mask-input';
import { DatePicker, Form } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

interface DateInputProps {
  required?: boolean;
  label?: string;
  name: string;
  initialValue?: string | Dayjs;
  type?: 'DEFAULT' | 'MASKED';
  layout?: 'vertical' | 'horizontal';
}

const validDateRule = {
  message: 'Введите корректную дату',
  validator: (_: any, value: string) => {
    if (!value || value === '__.__.____') {
      return Promise.resolve();
    }

    const date = dayjs(value, 'DD-MM-YYYY');

    if (!Number.isNaN(date) && date < dayjs() && date > dayjs().subtract(100, 'y')) {
      return Promise.resolve();
    } else {
      return Promise.reject('Введите корректную дату');
    }
  },
};

const _DateInput: FC<DateInputProps> = ({ required = true, label, name, initialValue, type = 'MASKED', layout }) => {
  const rules = useMemo(() => {
    if (required && type === 'MASKED') {
      return [
        { required: true, message: 'Введите дату', },
        validDateRule,
      ];
    }

    if (required && type === 'DEFAULT') {
      return [
        { required: true, message: 'Введите дату', },
      ];
    }

    if (type === 'MASKED') {
      return [validDateRule];
    }

    return [];
  }, [required, type]);

  return (
    <Form.Item
      label={label}
      name={name}
      rules={rules}
      initialValue={initialValue}
      layout={layout}
    >
      {type === 'DEFAULT' ? <DatePicker inputReadOnly format="DD.MM.YYYY" /> : <MaskedInput mask="00.00.0000" />}
    </Form.Item>

  );
}

export const DateInput = memo(_DateInput);
