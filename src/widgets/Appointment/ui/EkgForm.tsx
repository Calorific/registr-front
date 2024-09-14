'use client';
import React, { useEffect, useState } from 'react';
import { useGetAppointmentStatus } from '@/entities/Appointment/api/appointmentApi';
import { FormStatus } from '@/entities/Appointment/model/FormStatus';
import EkgEdit from '@/entities/Appointment/ui/EkgEdit';
import EkgCreate from '@/entities/Appointment/ui/EkgCreate';
import { Spin } from 'antd';
import { useGetCurrentEkgData } from '@/entities/Appointment/api/ekgsApi';

const EkgForm = ({ appointmentId }: { appointmentId: string }) => {
  const { currentData, error: currentDataError, isLoading: currentDataIsLoading } = useGetCurrentEkgData(appointmentId);
  const { appointmentStatus, isLoading: statusIsLoading, error: statusError } = useGetAppointmentStatus(appointmentId);
  const [status, setStatus] = useState<FormStatus>('create');
  useEffect(() => {
    if (currentData && appointmentStatus == 'completed') {
      setStatus('display');
    } else if (currentData) {
      setStatus('edit');
    } else if (currentDataError?.response?.data?.error_code === 404) {
      setStatus('create');
    }
  }, [currentData, appointmentStatus, currentDataError]);

  if (statusError) return <div>Ошибка загрузки</div>;
  if (currentDataIsLoading || statusIsLoading) return <Spin />;
  return (
    <>
      <EkgEdit status={status} setStatus={setStatus} appointmentId={appointmentId} data={currentData} />
    </>
  );
};

export default EkgForm;