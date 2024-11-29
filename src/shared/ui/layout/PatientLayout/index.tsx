import React, { FC, ReactNode } from 'react';
import Link from 'next/link';
import { PatientBack } from './PatientBack';

interface AppointmentLayoutProps {
  children: ReactNode;
  id: string;
}

export const PatientLayout: FC<AppointmentLayoutProps> = ({ children, id }) => {

  return (
    <div className="pt-[61px]">
      <PatientBack id={id} />

      <div className="flex justify-between">
        <div className="flex gap-x-[15px] items-center mb-[40px]">
          <Link href="/appointments" className="text-dark text-[14px] leading-[22px]">
            Пациенты
          </Link>

          <div className="w-[1px] h-[19px] bg-gray"></div>

          <p className="text-dark text-[14px] leading-[22px]">
            {id}
          </p>
        </div>
      </div>

      {children}
    </div>
  );
};