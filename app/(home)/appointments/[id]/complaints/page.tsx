import React from 'react';
import { AppointmentLayout } from '@/shared/ui/AppointmentLayout';
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
    <AppointmentLayout current="COMPLAINTS" name="Test">
      <ComplaintsPage appointmentId={params.id} />
    </AppointmentLayout>
  );
};

export default Page;