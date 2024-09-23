import React from 'react';
import GeneralDetailsPage from '@/pages_/GeneralDetails/GeneralDetailsPage';

interface Props {
  params: {
    id: string
  },
  searchParams: {
    status: string
  }
}

const Page = ({ params, searchParams }: Props) => {
  return (
    <>
      <GeneralDetailsPage status={searchParams.status} appointmentId={params.id} />
    </>
  );
};

export default Page;