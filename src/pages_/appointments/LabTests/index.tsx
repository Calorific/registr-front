'use client';

import React, { useState } from 'react';
import { Card, Col, Form, Input, notification, Row, Spin } from 'antd';
import { useSWRConfig } from 'swr';
import {
  labTestsCreate,
  labTestsUpdate,
  useGetCurrentLabTestsData,
  useGetLabTestsFields,
} from '@/entities/Appointment/api/labTestsApi';
import { dateFormatConverter } from '@/shared/helpers/dateFormatConverter';
import { HormonalBloodField } from '@/pages_/appointments/LabTests/HormonalBloodField';
import { FieldCard } from '@/pages_/appointments/LabTests/FieldCard';
import { NavigationButtons } from '@/features/NavigationButtons';
import { useRouter } from 'next/navigation';

const LabTestsPage = ({ appointmentId }: { appointmentId: string }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { mutate } = useSWRConfig();

  const { currentData, isLoading: currentDataIsLoading, } = useGetCurrentLabTestsData(appointmentId);
  const { fields, error: fieldsError, isLoading: fieldsIsLoading } = useGetLabTestsFields();
  const [loading, setLoading] = useState<boolean>(false);

  const formSubmitHandler = async (values: any) => {
    setLoading(true);
    try {
      await form.validateFields();

      for (let key in values) {
        if (key.endsWith('date')) {
          values[key] = dateFormatConverter(values[key]);
        }
      }

      if (currentData) {
        await labTestsUpdate(appointmentId, values);
      } else {
        await labTestsCreate(appointmentId, values);
        await mutate({
          key: 'appointments/block/laboratory_test/',
          appointmentId,
        });
      }

      router.push('ekg');
      return true;
    } catch (e: any) {
      setLoading(false);
      notification.error({ message: e?.response?.data?.message ?? 'Данные заполнены некорректно' });
      return false;
    }
  };

  if (fieldsError) {
    return <div>{fieldsError?.message ?? 'Что-то пошло не так...'}</div>;
  }

  if (currentDataIsLoading || fieldsIsLoading) {
    return <Spin />;
  }

  return (
    <Form layout="vertical" form={form} initialValues={currentData} onFinish={formSubmitHandler}>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <div className="flex flex-col gap-y-[24px]">
            <Card title="Анализ крови">
              <Row gutter={[24, 24]}>
                {fields.hormonal_blood_analysis.map((field, i) => (
                  <HormonalBloodField form={form} field={field} key={i} />
                ))}
              </Row>
            </Card>

            <FieldCard
              title="Общий анализ крови"
              fields={fields.general_blood_analysis}
              gutter={[24, 24]}
              form={form}
              fieldType="number"
            />
          </div>
        </Col>

        <Col span={12}>
          <FieldCard
            title="Биохимический анализ крови"
            fields={fields.blood_chemistry}
            gutter={[24, 6]}
            form={form}
            fieldType="number"
            className="h-full"
          />
        </Col>

        <Col span={24}>
          <FieldCard
            title="Общий анализ мочи"
            fields={fields.general_urine_analysis}
            gutter={[24, 24]}
            form={form}
            fieldType="string"
          />
        </Col>

        <Col span={24}>
          <Form.Item
            name="note"
            label="Примечание:"
            rules={[{ max: 1000, message: 'Примечание не должно превышать 1000 символов', }]}
          >
            <Input.TextArea rows={3} placeholder="Введите комментарий..." />
          </Form.Item>
        </Col>
      </Row>

      <NavigationButtons form={form} prevRoute="complaints" />
    </Form>
  );
};

export default LabTestsPage;