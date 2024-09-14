import React from 'react';
import dynamic from 'next/dynamic';

const DiagnosePage = ({ appointmentId }: { appointmentId: string }) => {
  const DiagnoseForm = dynamic(() => import('@/widgets/Appointment/ui/DiagnoseForm'), { ssr: false });
  return (
    <>
      <DiagnoseForm appointmentId={appointmentId} />
    </>
  );
};

export default DiagnosePage;