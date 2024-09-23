import React from 'react';
import AppointmentNewPage from '@/pages_/AppointmentNew/AppointmentNewPage';

interface Props {
  searchParams: {
    status: string;
  };
}

const Page = ({ searchParams, }: Props) => {
  return <AppointmentNewPage status={searchParams.status} />;
};

export default Page;