'use client';

import React, { useState } from 'react';
import { Card, Checkbox, Col, Form, Input, notification, Row } from 'antd';
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
import { formatInteger } from '@/shared/ui/Form';

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
    values['bmi'] = ((values.weight || 0) / Math.pow(((values.height || 1) / 100), 2)).toFixed(1);

    try {
      await form.validateFields();
    } catch (e: any) {
      if (e?.errorFields?.length > 0) {
        notification.error(e?.errorFields?.[0]?.errors?.[0] ?? 'Данные заполнены некорректно');
        setLoading(false);
        return false;
      }
    }

    try {
      if (!data) {
        await complaintsCreate(appointmentId, values);
      } else {
        await complaintsUpdate(appointmentId, values);
      }

      await mutate({
        key: 'appointments/block/complaint/',
        appointmentId,
      });

      await mutate({
        key: 'appointments/block/clinical_condition/',
        appointmentId,
      });

      await mutate({
        key: 'appointments/',
        appointmentId,
      });

      router.push('labTests');
      return true;
    } catch (e: any) {
      setLoading(false);
      notification.error({ message: e?.message ?? 'Данные заполнены некорректно'});
      return false;
    }
  };

  if (fieldsError) {
    return <div>{fieldsError?.message}</div>;
  }

  const allLoading = currentDataIsLoading || fieldsIsLoading || loading;

  return (
    <Form layout="vertical" form={form} initialValues={data} onFinish={formSubmitHandler}>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Card title="Витальные показатели" className="h-full" loading={allLoading}>
            <MassIndex form={form} />

            <Row gutter={[24, 14]}>
              <Col span={12}>
                <Form.Item
                  label="Систолическое АД"
                  name="systolic_bp"
                  rules={[{ required: true, message: 'Укажите систолическое АД' }]}
                  normalize={formatInteger}
                >
                  <Input placeholder="Систолическое" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Диастолическое АД"
                  name="diastolic_bp"
                  rules={[{ required: true, message: 'Укажите диастолическое АД' }]}
                  normalize={formatInteger}
                >
                  <Input placeholder="Диастолическое" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="ЧСС"
                  name="heart_rate"
                  rules={[{ required: true, message: 'Укажите ЧСС' }]}
                  normalize={formatInteger}
                >
                  <Input placeholder="уд/мин" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Дистанция 6-минутной ходьбы"
                  name="six_min_walk_distance"
                  rules={[{ max: 40, message: 'Значение не может превышать 40 символов', },]}
                >
                  <Input placeholder="м" />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Жалобы" className="h-full" loading={allLoading}>
            <div className="flex flex-wrap mb-[24px] [&>div:nth-child(3n-2)]:w-[196px] [&>div:nth-child(3n-1)]:w-[270px] [&>div:nth-child(3n)]:w-[102px]">
              {fields?.complaints?.map(field => (
                <Form.Item
                  key={field.name}
                  name={field.name}
                  valuePropName="checked"
                >
                  <Checkbox>{field.displayName}</Checkbox>
                </Form.Item>
              ))}
            </div>

            <Form.Item name="note" label="Примечание:" rules={[{ max: 300, message: 'Значение не должно превышать 300 символов' }]}>
              <Input.TextArea rows={3} placeholder="Введите комментарий..." />
            </Form.Item>
          </Card>
        </Col>

        <Col span={24}>
          <Card title="Клиническое состояние" loading={allLoading}>
            <Row gutter={[10, 5]}>
              {fields?.conditions?.map(field => (
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

            <Form.Item
              className="mt-[24px]"
              name="other_symptoms"
              label="Примечание:"
              rules={[{ max: 1000, message: 'Примечание не должно превышать 1000 символов' }]}
            >
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