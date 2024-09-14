import React from 'react';
import GeneralDetailsPage from '@/pages_/GeneralDetails/GeneralDetailsPage';

const Page = ({
                params,
                searchParams,
              }: {
  params: {
    id: string
  },
  searchParams: {
    status: string
  }
}) => {
  return (
      <>
        <GeneralDetailsPage status={searchParams.status} appointmentId={params.id} />
      </>
  );
};

export default Page;