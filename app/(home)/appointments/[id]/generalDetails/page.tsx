import React from 'react';
import { AppointmentLayout } from '@/shared/ui/AppointmentLayout';
import dynamic from 'next/dynamic';
import { Spin } from 'antd';

interface PageProps {
  params: {
    id: string;
  };
}

const Page = ({ params, }: PageProps) => {
  const DetailsPage = dynamic(() => import('@/pages_/appointments/Details'), { ssr: false, loading: () => <Spin />});

  return (
    <AppointmentLayout appointmentId={params.id} current="DETAILS" showSaveButton>
      <DetailsPage appointmentId={params.id} />
    </AppointmentLayout>
  );
};

export default Page;