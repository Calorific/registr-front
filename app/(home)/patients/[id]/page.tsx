import React from 'react';
import PatientPage from '@/pages_/Patient/PatientPage';

interface PageProps {
  params: {
    id: string
  };
  searchParams: {
    status: string
  };
}

const Page = ({ params, searchParams, }: PageProps) => {
  return (
    <>
      <PatientPage patientId={params.id} status={searchParams.status} />
    </>
  );
};

export default Page;