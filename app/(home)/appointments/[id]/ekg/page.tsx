import React from 'react';
import EkgPage from '@/pages_/Ekg/EkgPage';

interface PageProps {
  params: {
    id: string;
  }
}

const Page = ({ params, }: PageProps) => {
  return (
    <>
      <EkgPage appointmentId={params.id} />
    </>
  );
};

export default Page;