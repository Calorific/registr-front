import React, { FC, ReactNode } from 'react';
import Link from 'next/link';
import { PatientName } from './PatientName';
import { Button } from 'antd';

type Name = 'DIAGNOSE' | 'COMPLAINTS' | 'LAB_TESTS' | 'EKG' | 'DRUG_THERAPY' | 'DETAILS';

interface AppointmentLayoutProps {
  children: ReactNode;
  appointmentId: string;
  current: Name;
  showSaveButton?: boolean;
}


export const AppointmentLayout: FC<AppointmentLayoutProps> = ({ children, appointmentId, current, showSaveButton, }) => {

  return (
    <div className="pt-[61px]">
      <div className="flex justify-between">
        <div className="flex gap-x-[15px] items-center mb-[40px]">
          <Link href="/appointments" className="text-dark text-[16px] leading-[22px] font-bold">
            Приемы
          </Link>

          <div className="w-[1px] h-[19px] bg-gray"></div>

          <PatientName appointmentId={appointmentId} />

          <div className="w-[1px] h-[19px] bg-gray"></div>

          <p className="text-dark text-[16px] leading-[22px] font-bold">
            Новый прием
          </p>
        </div>

        {showSaveButton && (
          <Link href="/appointments">
            <Button type="primary">
              Сохранить и завершить прием
            </Button>
          </Link>
        )}
      </div>


      <div className="bg-white rounded-[20px]">
        <div
            className="pt-[19px] px-[24px] mb-[24px] border-b border-solid border-[#E8E8E8] flex gap-x-[24px] items-center">
          <Link href="diagnose"
                className={'w-[115px] text-center pb-[19px] text-[16px] leading-[22px] text-[#7D7D7D] ' + (current === 'DIAGNOSE' ? 'font-bold border-b border-solid border-blue' : '')}>
            Диагноз
          </Link>
          <Link href="complaints"
                className={'w-[113px] text-center pb-[19px] text-[16px] leading-[22px] text-[#7D7D7D] ' + (current === 'COMPLAINTS' ? 'font-bold border-b border-solid border-blue' : '')}>
            Жалобы
          </Link>
          <Link href="labTests" className={'w-[221px] text-center pb-[19px] text-[16px] leading-[22px] text-[#7D7D7D] ' + (current === 'LAB_TESTS' ? 'font-bold border-b border-solid border-blue' : '')}>
            Лабораторные тесты
          </Link>
          <Link href="ekg" className={'w-[154px] text-center pb-[19px] text-[16px] leading-[22px] text-[#7D7D7D] ' + (current === 'EKG' ? 'font-bold border-b border-solid border-blue' : '')}>
            ЭКГ и ЭХО-КГ
          </Link>
          <Link href="drugTherapy" className={'w-[246px] text-center pb-[19px] text-[16px] leading-[22px] text-[#7D7D7D] ' + (current === 'DRUG_THERAPY' ? 'font-bold border-b border-solid border-blue' : '')}>
            Лекарственная терапия
          </Link>
          <Link href="generalDetails" className={'w-[188px] text-center pb-[19px] text-[16px] leading-[22px] text-[#7D7D7D] ' + (current === 'DETAILS' ? 'font-bold border-b border-solid border-blue' : '')}>
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