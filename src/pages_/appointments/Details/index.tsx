'use client';

import { FC } from 'react';
import { Col, Collapse, Row, Spin } from 'antd';
import { useGetAppointment, useGetAppointmentFields } from '@/entities/Appointment/api/appointmentApi';
import { useGetPatientByAppointment } from '@/entities/Patient/api/getPatient';
import { PatientCard } from '@/pages_/appointments/Details/show/PatientCard';
import { DiagnoseShow } from '@/pages_/appointments/Details/show/DiagnoseShow';
import { ComplaintsShow } from '@/pages_/appointments/Details/show/ComplaintsShow';
import { LabTestsShow } from '@/pages_/appointments/Details/show/LabTestsShow';
import { EkgShow } from '@/pages_/appointments/Details/show/EkgShow';
import { DrugTherapyShow } from '@/pages_/appointments/Details/show/DrugTherapyShow';

interface DetailsPageProps {
  appointmentId: string;
}

const DetailsPage: FC<DetailsPageProps> = ({ appointmentId }) => {
  const { data, isLoading, error } = useGetAppointment(appointmentId);
  const { fields, isLoading: fieldsLoading, error: fieldsError } = useGetAppointmentFields();

  const e = error?.message ?? fieldsError?.message;
  if (isLoading || fieldsLoading) {
    return <Spin />
  }

  if (e) {
    return e;
  }

  console.log(data)

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <PatientCard data={data.patient} />
      </Col>

      <Col span={24}>
        <Collapse
          items={[{
            label: 'Диагноз',
            children: <DiagnoseShow data={data?.block_diagnose} fields={fields?.diagnose ?? []} />
          }]}
        />
      </Col>

      <Col span={24}>
        <Collapse
          items={[{
            label: 'Жалобы',
            children: (
              <ComplaintsShow
                data={{ ...data?.block_complaint, ...data?.block_clinical_condition}}
                fields={{ complaints: fields.complaints, conditions: fields.clinical_condition }}
              />
            )
          }]}
        />
      </Col>

      <Col span={24}>
        <Collapse
          items={[{
            label: 'Лабораторные тесты',
            children: (
              <LabTestsShow
                data={data?.block_laboratory_test}
                fields={fields.laboratory_test}
              />
            )
          }]}
        />
      </Col>

      <Col span={24}>
        <Collapse
          items={[{
            label: 'ЭКГ и ЭХО-КГ',
            children: (
              <EkgShow
                data={data?.block_ekg}
                fields={fields.ekg}
              />
            )
          }]}
        />
      </Col>

      <Col span={24}>
        <Collapse
          items={[{
            label: 'Лекарственная терапия',
            children: (
              <DrugTherapyShow
                data={data?.purposes?.[0]?.medicine_prescriptions}
              />
            )
          }]}
        />
      </Col>
    </Row>
  )
}

export default DetailsPage;
