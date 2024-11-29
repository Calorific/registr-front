'use client';

import { useGetPatient } from '@/entities/Patient/api/getPatient';
import React, { FC, useState } from 'react';
import { Card, notification } from 'antd';
import { PatientCard } from '@/entities/Patient/ui/PatientCard';
import { CalendarIcon } from '@/shared/icons';
import Link from 'next/link';
import { initAppointment } from '@/entities/Patient/api/initAppointment';
import { useRouter } from 'next/navigation';
import ButtonNew from '@/shared/ui/Buttons/ButtonNew';

interface Props {
  id: string;
}

const PatientPage: FC<Props> = ({ id }) => {
  const router = useRouter();
  const { data, isLoading: isDataLoading, error } = useGetPatient(id);

  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = async () => {
    setLoading(true);

    try {
      const appointmentId = await initAppointment(id);
      router.push(`/appointments/${appointmentId}/diagnose`);
    } catch (e: any) {
      notification.error({ message: e.message });
      setLoading(false);
    }
  };

  if (error) {
    return <p>{error?.message ?? 'Что-то пошло не так, попробуйте позже...'}</p>
  }

  const allLoading = isDataLoading || loading;

  return (
    <>
      <div className="flex justify-end mt-[-62px] mb-[30px]">
        <ButtonNew onClick={handleClick}>
          Новый прием
        </ButtonNew>
      </div>

      <PatientCard data={data ?? {}} showNote loading={allLoading} />

      <Card title="История приемов" extra={<CalendarIcon />} loading={allLoading}>
        <div className="flex mb-[6px]">
          <p className="text-[12px] text-[#B4B4B4] w-[275px] grow-0 shrink-0">
            ID:
          </p>

          <p className="text-[12px] text-[#B4B4B4]">
            Дата приема:
          </p>
        </div>

        <div className="flex flex-col gap-y-[12px]">
          {data?.appointment_histories?.map((appointment: { id: string; date: string; }, i: number) => (
            <Link
              href={'/appointments/' + appointment.id}
              key={i}
              className="py-[7px] px-[14px] flex justify-between items-center bg-[#F9F9F9] rounded-full transition-colors border border-solid border-transparent hover:border-blue"
            >
              <div className="flex items-center h-full">
                <p className="text-[16px] w-[261px] grow-0 shrink-0">
                  {appointment.id}
                </p>

                <p className="text-[16px]">
                  {appointment.date}
                </p>
              </div>

              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M28 14C28 21.732 21.732 28 14 28C6.26801 28 1.35938e-06 21.732 6.8343e-07 14C7.47816e-09 6.26802 6.26801 3.80722e-06 14 3.13127e-06C21.732 2.45532e-06 28 6.26801 28 14Z" fill="#F9F9F9" />
                <g filter="url(#filter0_d_714_57021)">
                  <path d="M12 19L16.9293 14.0707C16.9683 14.0317 16.9683 13.9683 16.9293 13.9293L12 9" stroke="#7D7D7D" strokeWidth="1.5" strokeLinecap="round" />
                </g>
                <defs>
                  <filter id="filter0_d_714_57021" x="7.25" y="8.25" width="14.4585" height="19.5" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_714_57021" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_714_57021" result="shape" />
                  </filter>
                </defs>
              </svg>
            </Link>
          ))}
        </div>
      </Card>
    </>
  );
}

export default PatientPage;