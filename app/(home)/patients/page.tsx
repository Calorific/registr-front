import React from 'react';
import PatientsPage from '@/pages_/Patients/PatientsPage';

interface PageProps {
  searchParams: {
    page: number;
  }
}

const Page = ({ searchParams }: PageProps) => {
  return (
    <>
      <PatientsPage page={searchParams.page} />
    </>
  );
};

export default Page;