'use client';
import React, { useEffect, useState } from 'react';
import { useGetCurrentDiagnoseData, useGetPreviousDiagnoseData } from '@/entities/Appointment/api/diagnoseApi';
import { FormStatus } from '@/entities/Appointment/model/FormStatus';
import { useGetAppointmentStatus } from '@/entities/Appointment/api/appointmentApi';
import DiagnoseEdit from '@/entities/Appointment/ui/DiagnoseEdit';
import DiagnoseCreate from '@/entities/Appointment/ui/DiagnoseCreate';
import { Spin } from 'antd';

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
  const [status, setStatus] = useState<FormStatus>();
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
        {(status == 'display')
            ? (<DiagnoseEdit appointmentId={appointmentId} data={currentData} setStatus={setStatus} />)
            : (status == 'edit')
                ? (<DiagnoseEdit setStatus={setStatus} appointmentId={appointmentId} data={currentData} />)
                : (<DiagnoseCreate setStatus={setStatus} appointmentId={appointmentId} data={previousData} />)
        }
      </>
  );
};

export default DiagnoseForm;