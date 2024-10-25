'use client';
import React from 'react';
import { useGetAppointmentStatus } from '@/entities/Appointment/api/appointmentApi';
import {
  complaintsCreate, complaintsUpdate,
  useGetComplaintsFields,
  useGetCurrentComplaintsData,
} from '@/entities/Appointment/api/complaintsApi';
import { Card, Checkbox, Col, Form, Input, InputNumber, message, Radio, Row, Space, Spin } from 'antd';
import { useSWRConfig } from 'swr';
import { IComplaints } from '@/entities/Appointment/model/IComplaints';
import SubmitButton from '@/shared/ui/Buttons/SubmitButton';
import { MassIndex } from '@/widgets/Appointment/ui/ComplaintsForm/MassIndex';

const ComplaintsForm = ({ appointmentId }: { appointmentId: string }) => {
  const [form] = Form.useForm();
  const { mutate } = useSWRConfig();
  const [messageApi, contextHolder] = message.useMessage();

  const { data, isLoading: currentDataIsLoading } = useGetCurrentComplaintsData(appointmentId);
  const { isLoading: statusIsLoading, error: statusError } = useGetAppointmentStatus(appointmentId);
  const { fields, error: fieldsError, isLoading: fieldsIsLoading } = useGetComplaintsFields();

  const formSubmitHandler = async (values: IComplaints) => {
    values['heart_failure_om'] = true;

    try {
      await form.validateFields();

      if (!data) {
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
        messageApi.success('Данные успешно обновлены');
      }

      return true;
    } catch (e: any) {
      messageApi.error(e?.response?.data?.message ?? 'Данные заполнены некорректно');
      return false;
    }
  };

  if (statusError) {
    return <div>{statusError?.message}</div>;
  }

  if (fieldsError) {
    return <div>{fieldsError?.message}</div>;
  }

  if (currentDataIsLoading || statusIsLoading || fieldsIsLoading) {
    return <Spin />;
  }

  return (
    <Form layout="vertical" form={form} initialValues={data} onFinish={formSubmitHandler}>
      {contextHolder}

      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Card title="Витальные показатели" className="h-full">
            <MassIndex form={form} />

            <Row gutter={[24, 14]}>
              <Col span={12}>
                <Form.Item
                  label="Систолическое АД"
                  name="systolic_bp"
                  rules={[{ required: true, message: 'Укажите систолическое АД' }]}
                >
                  <Input placeholder="Систолическое" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Диастолическое АД"
                  name="diastolic_bp"
                  rules={[{ required: true, message: 'Укажите диастолическое АД' }]}
                >
                  <Input placeholder="уд/мин" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="ЧСС"
                  name="heart_rate"
                  rules={[{ required: true, message: 'Укажите ЧСС' }]}
                >
                  <Input placeholder="Диастолическое" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Дистанция 6-минутной ходьбы"
                  name="six_min_walk_distance"
                  rules={[{ required: true, message: 'Укажите дистанцию 6-минутной ходьбы' }]}
                >
                  <Input placeholder="м" />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Жалобы" className="h-full">
            <div className="flex flex-wrap mb-[24px] [&>div:nth-child(3n-2)]:w-[196px] [&>div:nth-child(3n-1)]:w-[272px] [&>div:nth-child(3n)]:w-[102px]">
              {fields.complaints.map(field => (
                <Form.Item
                  key={field.name}
                  name={field.name}
                  valuePropName="checked"
                >
                  <Checkbox>{field.displayName}</Checkbox>
                </Form.Item>
              ))}
            </div>

            <Form.Item name="note" label="Примечание">
              <Input.TextArea rows={3} placeholder="Введите комментарий..." />
            </Form.Item>
          </Card>
        </Col>

        <Col span={24}>
          <Card title="Клиническое состояние">
            <Row gutter={[10, 5]}>
              {fields.conditions.map(field => (
                <Col span={6} key={field.name}>
                  <Form.Item
                    name={field.name}
                    valuePropName="checked"
                  >
                    <Checkbox>{field.displayName}</Checkbox>
                  </Form.Item>
                </Col>
              ))}
            </Row>

            <Form.Item className="mt-[24px]" name="other_symptoms" label="Примечание:">
              <Input.TextArea rows={3} placeholder="Введите комментарий..." />
            </Form.Item>
          </Card>
        </Col>
      </Row>

      <SubmitButton form={form}>
        Далее
      </SubmitButton>
    </Form>
  );
};

export default ComplaintsForm;