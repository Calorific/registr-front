import React from 'react';
import { AppointmentLayout } from '@/shared/ui/layout/AppointmentLayout';
import dynamic from 'next/dynamic';
import { Spin } from 'antd';

interface PageProps {
  params: {
    id: string
  }
}

const Page = ({ params, }: PageProps) => {
  const ComplaintsPage = dynamic(() => import('@/pages_/appointments/Complaints'), { ssr: false, loading: () => <Spin />});

  return (
    <AppointmentLayout appointmentId={params.id} current="COMPLAINTS">
      <ComplaintsPage appointmentId={params.id} />
    </AppointmentLayout>
  );
};

export default Page;