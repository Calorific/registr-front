import React from 'react';
import dynamic from 'next/dynamic';

const PatientsPage = ({ page }: { page: number }) => {
  const PatientsList = dynamic(() => import('@/widgets/PatientsList/ui/PatientsList'), {
    ssr: false,
    loading: () => <div>Загрузка...</div>,
  });

  return (
    <>
      <PatientsList page={page} />
    </>
  );
};

export default PatientsPage;