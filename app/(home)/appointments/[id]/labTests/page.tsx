import React from 'react';
import LabTestsPage from '@/pages_/LabTests/LabTestsPage';

interface PageProps {
  params: {
    id: string
  }
}

const Page = ({ params, }: PageProps) => {
  return (
    <>
      <LabTestsPage appointmentId={params.id} />
    </>
  );
};

export default Page;