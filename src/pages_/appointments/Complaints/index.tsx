'use client';

import React, { useState } from 'react';
import { Card, Checkbox, Col, Form, Input, notification, Row, Spin } from 'antd';
import { MassIndex } from './MassIndex';
import { useSWRConfig } from 'swr';
import {
  complaintsCreate, complaintsUpdate,
  useGetComplaintsFields,
  useGetCurrentComplaintsData,
} from '@/entities/Appointment/api/complaintsApi';
import { IComplaints } from '@/entities/Appointment/model/IComplaints';
import { NavigationButtons } from '@/features/NavigationButtons';
import { useRouter } from 'next/navigation';

const ComplaintsPage = ({ appointmentId }: { appointmentId: string }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { mutate } = useSWRConfig();

  const { data, isLoading: currentDataIsLoading } = useGetCurrentComplaintsData(appointmentId);
  const { fields, error: fieldsError, isLoading: fieldsIsLoading } = useGetComplaintsFields();
  const [loading, setLoading] = useState<boolean>(false);

  const formSubmitHandler = async (values: IComplaints) => {
    setLoading(true);
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
      }

      router.push('labTests');
      return true;
    } catch (e: any) {
      setLoading(false);
      notification.error({ message: e?.response?.data?.message ?? 'Данные заполнены некорректно'});
      return false;
    }
  };

  if (fieldsError) {
    return <div>{fieldsError?.message}</div>;
  }

  if (currentDataIsLoading || fieldsIsLoading || loading) {
    return <Spin />;
  }

  return (
    <Form layout="vertical" form={form} initialValues={data} onFinish={formSubmitHandler}>

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

      <NavigationButtons form={form} prevRoute="diagnose" />
    </Form>
  )
};

export default ComplaintsPage;