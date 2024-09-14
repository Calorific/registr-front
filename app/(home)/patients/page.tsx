import React from 'react';
import PatientsPage from '@/pages_/Patients/PatientsPage';

const Page = ({ searchParams }: {
  searchParams: {
    page: number
  }
}) => {
  return (
      <>
        <PatientsPage page={searchParams.page} />
      </>
  );
};

export default Page;