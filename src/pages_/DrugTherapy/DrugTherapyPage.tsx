import React from 'react';
import dynamic from 'next/dynamic';

const DrugTherapyPage = ({ appointmentId }: { appointmentId: string }) => {
  const DrugTherapyForm = dynamic(() => import('@/widgets/Appointment/ui/DrugTherapyForm'), { ssr: false });

  return (
    <>
      <DrugTherapyForm appointmentId={appointmentId} />
    </>
  );
};

export default DrugTherapyPage;