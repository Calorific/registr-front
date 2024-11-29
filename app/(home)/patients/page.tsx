import React from 'react';
import dynamic from 'next/dynamic';
import { Spin } from 'antd';

interface Props {
  searchParams: {
    page: number;
  };
}

const Page = ({ searchParams }: Props) => {
  const PatientsPage = dynamic(() => import('@/pages_/patients'), { ssr: false, loading: () => <Spin />});

  return (
    <>
      <PatientsPage page={searchParams.page} />
    </>
  );
};

export default Page;