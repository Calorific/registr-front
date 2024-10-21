import React from 'react';
import DiagnosePage from '@/pages_/Diagnose/DiagnosePage';
import { AppointmentLayout } from '@/shared/ui/AppointmentLayout';

interface PageProps {
  params: {
    id: string;
  };
}

const Page = ({ params }: PageProps) => {
  return (
    <AppointmentLayout current="DIAGNOSE" name="Test">
      <DiagnosePage appointmentId={params.id} />
    </AppointmentLayout>
  );
};

export default Page;