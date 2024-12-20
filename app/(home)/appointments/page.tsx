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
      <h2 className="font-bold text-[24px] mt-[58px] mb-[26px]">
        Список приемов 1
      </h2>

      <AppointmentsPage page={searchParams.page} />
    </>
  );
};

export default Page;
