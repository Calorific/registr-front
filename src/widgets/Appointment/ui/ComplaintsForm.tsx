'use client';
import React, { useEffect, useState } from 'react';
import { useGetAppointmentStatus } from '@/entities/Appointment/api/appointmentApi';
import { FormStatus } from '@/entities/Appointment/model/FormStatus';
import { useGetCurrentComplaintsData } from '@/entities/Appointment/api/complaintsApi';
import ComplaintsEdit from '@/entities/Appointment/ui/ComplaintsEdit';
import { Spin } from 'antd';

const ComplaintsForm = ({ appointmentId }: { appointmentId: string }) => {
  const { data, error: currentDataError, isLoading: currentDataIsLoading } = useGetCurrentComplaintsData(appointmentId);
  const { appointmentStatus, isLoading: statusIsLoading, error: statusError } = useGetAppointmentStatus(appointmentId);
  const [status, setStatus] = useState<FormStatus>('create');
  useEffect(() => {
    if (data && appointmentStatus == 'completed') {
      setStatus('display');
    } else if (data) {
      setStatus('edit');
    } else if (currentDataError?.response?.data?.error_code === 404) {
      setStatus('create');
    }
  }, [data, appointmentStatus, currentDataError]);

  if (statusError) return <div>Ошибка загрузки</div>;
  if (currentDataIsLoading || statusIsLoading) return <Spin />;
  return (
    <>
      <ComplaintsEdit status={status} setStatus={setStatus} appointmentId={appointmentId} data={data} />
    </>
  );
};

export default ComplaintsForm;