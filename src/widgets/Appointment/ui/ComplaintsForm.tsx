'use client';
import React, { useEffect, useState } from 'react';
import { useGetAppointmentStatus } from '@/entities/Appointment/api/appointmentApi';
import { FormStatus } from '@/entities/Appointment/model/FormStatus';
import { useGetCurrentComplaintsData } from '@/entities/Appointment/api/complaintsApi';
import ComplaintsCreate from '@/entities/Appointment/ui/ComplaintsCreate';
import ComplaintsEdit from '@/entities/Appointment/ui/ComplaintsEdit';
import { Spin } from 'antd';

const ComplaintsForm = ({ appointmentId }: { appointmentId: string }) => {
  const { data, error: currentDataError, isLoading: currentDataIsLoading } = useGetCurrentComplaintsData(appointmentId);
  const { appointmentStatus, isLoading: statusIsLoading, error: statusError } = useGetAppointmentStatus(appointmentId);
  const [status, setStatus] = useState<FormStatus>();
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
        {(status == 'display')
            ? (<ComplaintsEdit appointmentId={appointmentId} data={data} setStatus={setStatus} />)
            : (status == 'edit')
                ? (<ComplaintsEdit setStatus={setStatus} appointmentId={appointmentId} data={data} />)
                : (<ComplaintsCreate setStatus={setStatus} appointmentId={appointmentId} />)
        }
      </>
  );
};

export default ComplaintsForm;