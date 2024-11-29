import React from 'react';
import dynamic from 'next/dynamic';
import { Spin } from 'antd';

interface Props {
  searchParams: {
    page: number;
  };
}

const Page = ({ searchParams }: Props) => {
  const AppointmentsPage = dynamic(() => import('@/pages_/appointments'), { ssr: false, loading: () => <Spin />});

  return (
    <>
      <AppointmentsPage page={searchParams.page} />
    </>
  );
};

export default Page;