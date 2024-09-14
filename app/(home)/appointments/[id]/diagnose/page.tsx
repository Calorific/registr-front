import React from 'react';
import DiagnosePage from '@/pages_/Diagnose/DiagnosePage';

interface PageProps {
  params: {
    id: string
  }
}

const Page = ({ params }: PageProps) => {
  return (
    <>
      <DiagnosePage appointmentId={params.id} />
    </>
  );
};

export default Page;