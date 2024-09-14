import React from 'react';
import dynamic from 'next/dynamic';

const ComplaintsPage = ({ appointmentId }: { appointmentId: string }) => {
  const ComplaintsForm = dynamic(() => import('@/widgets/Appointment/ui/ComplaintsForm'), { ssr: false });

  return (
    <>
      <ComplaintsForm appointmentId={appointmentId} />
    </>
  );
};

export default ComplaintsPage;