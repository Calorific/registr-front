import React from 'react';
import dynamic from 'next/dynamic';

const GeneralDetailsPage = ({ appointmentId, status }: { appointmentId: string, status: string }) => {
  const GeneralDetailsForm = dynamic(() => import('@/widgets/Appointment/ui/GeneralDetailsForm'), { ssr: false });
  return (
      <>
        <GeneralDetailsForm appointmentId={appointmentId} status={status} />
      </>
  );
};

export default GeneralDetailsPage;