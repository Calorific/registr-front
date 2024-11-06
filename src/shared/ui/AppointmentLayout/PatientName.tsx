'use client';

import React, { FC, memo } from 'react';
import { useGetPatientByAppointment } from '@/entities/Patient/api/getPatient';
import Link from 'next/link';

interface PatientNameProps {
  appointmentId: string;
}

const _PatientName: FC<PatientNameProps> = ({ appointmentId, }) => {
  const { data, error, isLoading } = useGetPatientByAppointment(appointmentId);

  const nameText = isLoading ? 'Загрузка...' : error ? 'Ошибка загрузки' : `${data.name} ${data.last_name} ${data.patronymic}`;

  return (
    <Link href={`/patients/${data.id}`} className="text-dark text-[16px] leading-[22px] font-bold">
      {nameText}
    </Link>
  );
}

export const PatientName = memo(_PatientName);

export default PatientName;
