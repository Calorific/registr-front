'use client';
import React, { useEffect, useState } from 'react';
import { useGetCurrentDiagnoseData, useGetPreviousDiagnoseData } from '@/entities/Appointment/api/diagnoseApi';
import { FormStatus } from '@/entities/Appointment/model/FormStatus';
import { useGetAppointmentStatus } from '@/entities/Appointment/api/appointmentApi';
import DiagnoseEdit from '@/entities/Appointment/ui/DiagnoseEdit';
import { Spin, Typography } from 'antd';

const DiagnoseForm = ({ appointmentId }: { appointmentId: string }) => {
  const {
    currentData,
    error: currentDataError,
    isLoading: currentDataIsLoading,
  } = useGetCurrentDiagnoseData(appointmentId);

  const {
    previousData,
    error: previousDataError,
    isLoading: previousDataIsLoading,
  } = useGetPreviousDiagnoseData(appointmentId);

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
      <Typography.Title>
        Прием пациента
      </Typography.Title>

      <DiagnoseEdit status={status} appointmentId={appointmentId} data={currentData} setStatus={setStatus} />
    </>
  );
};

export default DiagnoseForm;