import React from 'react';
import DrugTherapyPage from '@/pages_/DrugTherapy/DrugTherapyPage';

interface PageProps {
  params: {
    id: string
  }
}

const Page = ({ params, }: PageProps) => {
  return (
    <>
      <DrugTherapyPage appointmentId={params.id} />
    </>
  );
};

export default Page;