'use client';
import React from 'react';
import { useGetAppointmentStatus } from '@/entities/Appointment/api/appointmentApi';
import { useGetCurrentLabTestsData, useGetLabTestsFields } from '@/entities/Appointment/api/labTestsApi';
import { Card, Col, Form, notification, Row, Spin, Typography } from 'antd';
import { IComplaints } from '@/entities/Appointment/model/IComplaints';
import { complaintsCreate, complaintsUpdate } from '@/entities/Appointment/api/complaintsApi';
import { useSWRConfig } from 'swr';

const LabTestsForm = ({ appointmentId }: { appointmentId: string }) => {
  const [form] = Form.useForm();
  const { mutate } = useSWRConfig();

  const {
    currentData,
    error: currentDataError,
    isLoading: currentDataIsLoading,
  } = useGetCurrentLabTestsData(appointmentId);
  const { appointmentStatus, isLoading: statusIsLoading, error: statusError } = useGetAppointmentStatus(appointmentId);
  const { fields, error: fieldsError, isLoading: fieldsIsLoading } = useGetLabTestsFields();
  console.log(fields)
  const formSubmitHandler = async (values: IComplaints) => {
    values['heart_failure_om'] = true;

    try {
      await form.validateFields();


      if (!currentData) {
        await complaintsCreate(appointmentId, values);
        await mutate({
          key: 'appointments/block/complaint/',
          appointmentId,
        });
        await mutate({
          key: 'appointments/block/clinical_condition/',
          appointmentId,
        });
      } else {
        await complaintsUpdate(appointmentId, values);
        notification.success({ message: 'Данные успешно обновлены' });
      }

      return true;
    } catch (e: any) {
      notification.error({ message: e?.response?.data?.message ?? 'Данные заполнены некорректно'
    });
      return false;
    }
  };

  if (statusError) {
    return <div>{statusError?.message ?? 'Что-то пошло не так...'}</div>;
  }

  if (fieldsError) {
    return <div>{fieldsError?.message ?? 'Что-то пошло не так...'}</div>;
  }

  if (currentDataIsLoading || statusIsLoading || fieldsIsLoading) {
    return <Spin />;
  }

  return (
    <Form layout="vertical" form={form} initialValues={currentData} onFinish={formSubmitHandler}>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <div className="flex flex-col gap-y-[24px]">
            <Card title="Анализ крови">
              <Row gutter={[24, 24]}>
                <Col span={12}>

                </Col>

                <Col span={12}>

                </Col>

                <Col span={12}>

                </Col>

                <Col span={12}>

                </Col>
              </Row>
            </Card>

            <Card title="Общий анализ крови">

            </Card>
          </div>
        </Col>

        <Col span={12}>
          <Card title="Биохимический анализ крови" className="h-full">

          </Card>
        </Col>

        <Col span={24}>
          <Card title="Общий анализ мочи">

          </Card>
        </Col>
      </Row>
    </Form>
  );
};

export default LabTestsForm;