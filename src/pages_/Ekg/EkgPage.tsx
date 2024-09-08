import React from 'react';
import dynamic from 'next/dynamic';

const EkgPage = ({ appointmentId }: { appointmentId: string }) => {
  const EkgForm = dynamic(() => import('@/widgets/Appointment/ui/EkgForm'), { ssr: false });

  return (
      <>
        <EkgForm appointmentId={appointmentId} />
      </>
  );
};

export default EkgPage;