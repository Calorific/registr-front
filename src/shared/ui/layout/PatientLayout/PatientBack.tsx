'use client';

import React, { FC, memo } from 'react';
import Link from 'next/link';
import { useGetPatient } from '@/entities/Patient/api/getPatient';

interface PatientNameProps {
  id: string;
}

const _PatientBack: FC<PatientNameProps> = ({ id, }) => {
  const { data, error, isLoading } = useGetPatient(id);

  const nameText = isLoading ? 'Загрузка...' : error ? 'Ошибка загрузки' : `${data.last_name ?? ''} ${data.name ?? ''} ${data.patronymic ?? ''}`;

  return (
    <Link href="/appointments">
      <div className="flex gap-x-[14px] items-center mb-[24px]">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 14C0 6.26801 6.26801 0 14 0C21.732 0 28 6.26801 28 14C28 21.732 21.732 28 14 28C6.26801 28 0 21.732 0 14Z" fill="#E7EEF1" />
          <path d="M15.8277 10.181L12.2543 13.6968C12.2101 13.7404 12.2101 13.8117 12.2543 13.8552L15.8277 17.3711" stroke="black" strokeWidth="1.66627" strokeLinecap="round" />
        </svg>
        <div className="text-[24px] leading-[33px] font-bold text-dark">
          {nameText}
        </div>
      </div>
    </Link>
  );
}

export const PatientBack = memo(_PatientBack);

