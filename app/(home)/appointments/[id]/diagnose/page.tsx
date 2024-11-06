import React from 'react';
import { AppointmentLayout } from '@/shared/ui/AppointmentLayout';
import dynamic from 'next/dynamic';
import { Spin } from 'antd';

interface PageProps {
  params: {
    id: string;
  };
}

const Page = ({ params }: PageProps) => {
  const DiagnosePage = dynamic(() => import('@/pages_/appointments/Diagnose'), { ssr: false, loading: () => <Spin />});

  return (
    <AppointmentLayout appointmentId={params.id} current="DIAGNOSE">
      <DiagnosePage appointmentId={params.id} />
    </AppointmentLayout>
  );
};

export default Page;