import React, { FC, memo } from 'react';

interface PointProps {
  name: string;
}

const _Point: FC<PointProps> = ({ name, }) => {

  return (
    <div className="flex gap-x-[12px] items-center text-[#232323] text-[16px]">
      <svg className="mt-[4px]" width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="6" height="6" rx="3" fill="#7EB0C6" />
      </svg>
      {name}
    </div>
  );
}

export const Point = memo(_Point);
