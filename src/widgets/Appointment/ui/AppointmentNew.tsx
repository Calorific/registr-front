import React from 'react';
import dynamic from 'next/dynamic';

const AppointmentNew = ({ status }: { status: string }) => {
  const PatientCreate = dynamic(() => import('@/entities/Patient/ui/PatientCreate'), { ssr: false });
  const PatientChoose = dynamic(() => import('@/entities/Patient/ui/PatientChoose'), { ssr: false });
  return (
    <>
      {(status == 'create')
        ? <PatientCreate />
        : <PatientChoose />
      }
    </>
  );
};

export default AppointmentNew;