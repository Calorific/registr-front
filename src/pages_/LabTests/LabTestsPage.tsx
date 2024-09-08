import React from 'react';
import dynamic from 'next/dynamic';

const LabTestsPage = ({ appointmentId }: { appointmentId: string }) => {
  const LabTestsForm = dynamic(() => import('@/widgets/Appointment/ui/LabTestsForm'), { ssr: false });

  return (
      <>
        <LabTestsForm appointmentId={appointmentId} />
      </>
  );
};

export default LabTestsPage;