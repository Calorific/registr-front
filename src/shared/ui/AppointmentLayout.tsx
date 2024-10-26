import React, { ReactNode } from 'react';
import Link from 'next/link';

type Name = 'DIAGNOSE' | 'COMPLAINTS' | 'LAB_TESTS' | 'EKG' | 'DRUG_THERAPY' | '';

export const AppointmentLayout = ({ children, name, current }: { children: ReactNode, name: string, current: Name }) => {
  return (
    <div className="pt-[61px]">
      <Link href="/appointments">
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

      <div className="flex gap-x-[15px] items-center mb-[40px]">
        <Link href="/appointments" className="text-dark text-[14px] leading-[19px]">
          Приемы
        </Link>
        <div className="w-[1px] h-[19px] bg-gray"></div>
        <Link href="/appointments" className="text-dark text-[14px] leading-[19px]">
          {name}
        </Link>
        <div className="w-[1px] h-[19px] bg-gray"></div>
        <p className="text-dark text-[14px] leading-[19px]">
          Новый прием
        </p>
      </div>

      <div className="bg-white rounded-[20px]">
        <div className="pt-[19px] px-[24px] mb-[24px] border-b border-solid border-[#E8E8E8] flex gap-x-[24px] items-center">
          <Link href="diagnose" className={'w-[115px] text-center pb-[19px] text-[16px] leading-[22px] text-[#7D7D7D] ' + (current === 'DIAGNOSE' ? 'font-bold border-b border-solid border-blue' : '')}>
            Диагноз
          </Link>
          <Link href="labTests" className={'w-[221px] text-center pb-[19px] text-[16px] leading-[22px] text-[#7D7D7D] ' + (current === 'LAB_TESTS' ? 'font-bold border-b border-solid border-blue' : '')}>
            Лабораторные тесты
          </Link>
          <Link href="complaints" className={'w-[113px] text-center pb-[19px] text-[16px] leading-[22px] text-[#7D7D7D] ' + (current === 'COMPLAINTS' ? 'font-bold border-b border-solid border-blue' : '')}>
            Жалобы
          </Link>
          <Link href={'ekg'} className={'w-[154px] text-center pb-[19px] text-[16px] leading-[22px] text-[#7D7D7D] ' + (current === 'EKG' ? 'font-bold border-b border-solid border-blue' : '')}>
            ЭКГ и ЭХО-КГ
          </Link>
          <Link href={'drugTherapy'} className={'w-[246px] text-center pb-[19px] text-[16px] leading-[22px] text-[#7D7D7D] ' + (current === 'DRUG_THERAPY' ? 'font-bold border-b border-solid border-blue' : '')}>
            Лекарственная терапия
          </Link>
          <Link href={'/'} className={'w-[188px] text-center pb-[19px] text-[16px] leading-[22px] text-[#7D7D7D] ' + (current === '' ? 'font-bold border-b border-solid border-blue' : '')}>
            Общие сведения
          </Link>
        </div>
        <div className="p-[24px] pt-0">
          {children}
        </div>

      </div>
    </div>
  );
};