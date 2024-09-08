'use client';
import React from 'react';
import { useGetPatientByAppointment } from '@/entities/Patient/api/getPatient';
import PatientEdit from '@/entities/Patient/ui/PatientEdit';
import PatientDisplay from '@/entities/Patient/ui/PatientDisplay';

const GeneralDetailsForm = ({ appointmentId, status }: { appointmentId: string, status: string }) => {
  const { data, error, isLoading } = useGetPatientByAppointment(appointmentId);

  if (error?.request.status == 404) {
    return <div>{error.response.data.message}</div>;
  } else if (error) {
    return <div>Ошибка загрузки</div>;
  }
  if (isLoading) return <div>Загрузка</div>;

  return (
      <>
        {(status == 'edit')
            ? (<PatientEdit data={data} />)
            : (<PatientDisplay data={data} />)
        }
      </>
  );
};

export default GeneralDetailsForm;