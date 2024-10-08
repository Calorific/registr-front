'use client';
import React, { useEffect, useState } from 'react';
import { useGetAppointmentStatus } from '@/entities/Appointment/api/appointmentApi';
import { FormStatus } from '@/entities/Appointment/model/FormStatus';
import { useGetCurrentDrugTherapyData } from '@/entities/Appointment/api/drugTherapyApi';
import DrugTherapyEdit from '@/entities/Appointment/ui/DrugTherapyEdit';
import { Spin, Typography } from 'antd';

const DrugTherapyForm = ({ appointmentId }: { appointmentId: string }) => {
  const {
    currentData,
    error: currentDataError,
    isLoading: currentDataIsLoading,
  } = useGetCurrentDrugTherapyData(appointmentId);
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

      <DrugTherapyEdit status={status} setStatus={setStatus} appointmentId={appointmentId} data={currentData} />
    </>
  );
};

export default DrugTherapyForm;