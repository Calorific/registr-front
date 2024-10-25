import React from 'react';
import dynamic from 'next/dynamic';
import { AppointmentLayout } from '@/shared/ui/AppointmentLayout';

const LabTestsPage = ({ appointmentId }: { appointmentId: string }) => {
  const LabTestsForm = dynamic(() => import('@/widgets/Appointment/ui/LabTestsForm'), { ssr: false });

  return (
    <AppointmentLayout name="Test" current="LAB_TESTS">
      <LabTestsForm appointmentId={appointmentId} />
    </AppointmentLayout>
  );
};

export default LabTestsPage;