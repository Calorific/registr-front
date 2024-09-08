import React from 'react';
import dynamic from 'next/dynamic';

export const PatientPage = ({ patientId, status }: { patientId: string, status: string }) => {
  const PatientInfo = dynamic(() => import('@/widgets/PatientInfo/ui/PatientInfo'), { ssr: false });
  return (
      <>
        <PatientInfo patientId={patientId} status={status} />
      </>
  );
};

export default PatientPage;