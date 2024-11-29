import React from 'react';
import dynamic from 'next/dynamic';
import { Spin } from 'antd';
import { AppointmentLayout } from '@/shared/ui/layout/AppointmentLayout';

interface PageProps {
  params: {
    id: string;
  };
}

const Page = ({ params, }: PageProps) => {
  const LabTestsPage = dynamic(() => import('@/pages_/appointments/LabTests'), { ssr: false, loading: () => <Spin />});

  return (
    <AppointmentLayout appointmentId={params.id} current="LAB_TESTS">
      <LabTestsPage appointmentId={params.id} />
    </AppointmentLayout>
  );
};

export default Page;