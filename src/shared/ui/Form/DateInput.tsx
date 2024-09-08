import React, { FC, memo } from 'react';
import MaskedInput from 'antd-mask-input';

interface DateInputProps {
  value?: any;
  onChange?: any;
}

const _DateInput: FC<DateInputProps> = ({ value, onChange, }) => {

  return (
    <MaskedInput value={value} onChange={onChange} mask="00.00.0000" />
  );
}

export const DateInput = memo(_DateInput);
