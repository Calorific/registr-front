import React from 'react';
import AppointmentsPage from '@/pages_/appointments';

const Page = ({ searchParams }: {
  searchParams: {
    page: number
  }
}) => {
  return (
    <>
      <AppointmentsPage page={searchParams.page} />
    </>
  );
};

export default Page;