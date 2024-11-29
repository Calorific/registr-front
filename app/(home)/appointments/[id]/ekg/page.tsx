import React from 'react';
import { AppointmentLayout } from '@/shared/ui/layout/AppointmentLayout';
import dynamic from 'next/dynamic';
import { Spin } from 'antd';

interface PageProps {
  params: {
    id: string;
  };
}

const Page = ({ params, }: PageProps) => {
  const EkgPage = dynamic(() => import('@/pages_/appointments/Ekg'), { ssr: false, loading: () => <Spin />});

  return (
    <AppointmentLayout appointmentId={params.id} current="EKG">
      <EkgPage appointmentId={params.id} />
    </AppointmentLayout>
  );
};

export default Page;