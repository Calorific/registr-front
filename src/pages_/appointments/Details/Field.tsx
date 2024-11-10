import React, { FC, memo } from 'react';

interface FieldProps {
  name: string;
  value?: string;
  variant?: 'INLINE' | 'DEFAULT';
}

const _Field: FC<FieldProps> = ({ name, value, variant }) => {
  if (variant === 'INLINE') {
    return (
      <div className="flex gap-x-[8px]">
        <p className="text-[16px] text-[#797979]">
          {name}:
        </p>
        <p className="text-[16px] text-[#232323]">
          {value ?? '-'}
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-[14px] text-[#B4B4B4]">
        {name}
      </p>
      <p className="text-[16px] text-[#232323] mt-[-5px]">
        {value ?? '-'}
      </p>
    </div>
  );
}

export const Field = memo(_Field);
