import React from 'react';
import AppointmentsPage from '@/pages_/Appointments/AppointmentsPage';

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