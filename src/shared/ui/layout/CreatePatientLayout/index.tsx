import React, { FC, ReactNode } from 'react';
import Link from 'next/link';

interface AppointmentLayoutProps {
  children: ReactNode;
}

export const CreatePatientLayout: FC<AppointmentLayoutProps> = ({ children, }) => {

  return (
    <div className="pt-[61px]">
      <Link href="/appointments/new">
        <div className="flex gap-x-[14px] items-center mb-[24px]">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 14C0 6.26801 6.26801 0 14 0C21.732 0 28 6.26801 28 14C28 21.732 21.732 28 14 28C6.26801 28 0 21.732 0 14Z" fill="#E7EEF1" />
            <path d="M15.8277 10.181L12.2543 13.6968C12.2101 13.7404 12.2101 13.8117 12.2543 13.8552L15.8277 17.3711" stroke="black" strokeWidth="1.66627" strokeLinecap="round" />
          </svg>
          <div className="text-[24px] leading-[33px] font-bold text-dark">
            Назад
          </div>
        </div>
      </Link>

      <div className="flex justify-between">
        <div className="flex gap-x-[15px] items-center mb-[40px]">
          <Link href="/patients" className="text-dark text-[14px] leading-[22px]">
            Пациенты
          </Link>

          <div className="w-[1px] h-[19px] bg-gray"></div>

          <p className="text-dark text-[14px] leading-[22px]">
            Новый пациент
          </p>
        </div>
      </div>

      {children}
    </div>
  );
};