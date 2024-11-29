import React from 'react';
import { ChoosePatientLayout } from '@/shared/ui/layout/ChoosePatientLayout';
import dynamic from 'next/dynamic';
import { Spin } from 'antd';

interface Props {
  searchParams: {
    status: string;
  };
}

const Page = ({ searchParams, }: Props) => {
  const AppointmentNewPage = dynamic(() => import('@/pages_/appointments/New'), { ssr: false, loading: () => <Spin />});

  return (
    <ChoosePatientLayout>
      <AppointmentNewPage />
    </ChoosePatientLayout>
  );
};

export default Page;