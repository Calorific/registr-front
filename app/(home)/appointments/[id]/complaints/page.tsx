import React from 'react';
import ComplaintsPage from '@/pages_/Complaints/ComplaintsPage';

interface PageProps {
  params: {
    id: string
  }
}

const Page = ({ params, }: PageProps) => {
  return (
    <>
      <ComplaintsPage appointmentId={params.id} />
    </>
  );
};

export default Page;