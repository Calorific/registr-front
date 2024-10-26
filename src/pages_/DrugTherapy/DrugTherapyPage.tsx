import React from 'react';
import dynamic from 'next/dynamic';
import { AppointmentLayout } from '@/shared/ui/AppointmentLayout';

const DrugTherapyPage = ({ appointmentId }: { appointmentId: string }) => {
  const DrugTherapyForm = dynamic(() => import('@/widgets/Appointment/ui/DrugTherapyForm'), { ssr: false });

  return (
    <AppointmentLayout name="Test" current="DRUG_THERAPY">
      <DrugTherapyForm appointmentId={appointmentId} />
    </AppointmentLayout>
  );
};

export default DrugTherapyPage;