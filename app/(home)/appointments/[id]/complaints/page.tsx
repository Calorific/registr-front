import React from 'react';
import ComplaintsPage from '@/pages_/Complaints/ComplaintsPage';
import { AppointmentLayout } from '@/shared/ui/AppointmentLayout';

interface PageProps {
  params: {
    id: string
  }
}

const Page = ({ params, }: PageProps) => {
  return (
    <AppointmentLayout current="COMPLAINTS" name="Test">
      <ComplaintsPage appointmentId={params.id} />
    </AppointmentLayout>
  );
};

export default Page;