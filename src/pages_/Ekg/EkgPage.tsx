import React from 'react';
import dynamic from 'next/dynamic';
import { AppointmentLayout } from '@/shared/ui/AppointmentLayout';

const EkgPage = ({ appointmentId }: { appointmentId: string }) => {
  const EkgForm = dynamic(() => import('@/widgets/Appointment/ui/EkgForm'), { ssr: false });

  return (
    <AppointmentLayout name="Test" current="EKG">
      <EkgForm appointmentId={appointmentId} />
    </AppointmentLayout>
  );
};

export default EkgPage;