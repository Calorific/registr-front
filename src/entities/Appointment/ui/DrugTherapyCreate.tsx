'use client';
import React, { Dispatch, useState } from 'react';
import { Card, Checkbox, Col, Form, Input, message, Row, Select, Space, Spin } from 'antd';

import SubmitButton from '@/shared/ui/Buttons/SubmitButton';
import { drugTherapyCreate, useGetDrugTherapyFields } from '@/entities/Appointment/api/drugTherapyApi';
import { IDrugTherapyFields } from '@/entities/Appointment/model/IFormDataFields';
import { IDrugTherapy } from '@/entities/Appointment/model/IDrugTherapy';
import { FormStatus } from '@/entities/Appointment/model/FormStatus';
import { useSWRConfig } from 'swr';

const DrugTherapyCreate = ({ setStatus, appointmentId }: {
  setStatus: Dispatch<FormStatus>,
  appointmentId: string
}) => {
  const { mutate } = useSWRConfig();
  const [form] = Form.useForm();
  const { fields, error: fieldsError, isLoading: fieldsIsLoading } = useGetDrugTherapyFields();
  const [messageApi, contextHolder] = message.useMessage();

  const formSubmitHandler = async (values: IDrugTherapy) => {
    try {
      const data: {
        medicine_prescriptions: {
          medicine_prescription_id: number,
          dosa: string,
          note: string
        }[]
      } = { medicine_prescriptions: [] };
      for (const key in values) {
        if (values[key]?.isActive) {
          data.medicine_prescriptions.push({
            dosa: values[key].dosa,
            medicine_prescription_id: values[key].medicine_prescription_id,
            note: values[key].note,
          });
        }
      }
      await drugTherapyCreate(appointmentId, data);
      await mutate({
        key: 'appointments/block/purpose/',
        appointmentId,
      });
      setStatus('edit');
    } catch (e: any) {
      messageApi.error(e.message);
    }
  };
  if (fieldsError) return <div>Ошибка загрузки</div>;
  if (fieldsIsLoading) return <Spin></Spin>;

  return (
    <Form
      form={form}
      layout={'inline'}
      onFinish={formSubmitHandler}
    >
      <Card
        title={'Лекарственная терапия'}
        extra={
          <Form.Item>
            <SubmitButton form={form}>
              Сохранить
            </SubmitButton>
          </Form.Item>
        }
      >
        {contextHolder}
        <Card title={'Лекарственная терапия'}>
          <Row gutter={[32, 16]}>
            {fields.map(field => (
              <DrugTherapyField key={field.displayName} field={field} />
            ))}
          </Row>
          <span>Примечание:</span>
          <Form.Item style={{ width: '100%' }} name={'note'}>
            <Input.TextArea />
          </Form.Item>
        </Card>

      </Card>
    </Form>
  );
};


const DrugTherapyField = ({ field }: { field: IDrugTherapyFields }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <Form.List name={field.displayName} key={field.displayName}>
      {() =>
          <Col span={24}>
            <Row gutter={32}>
              <Col span={6}>
                <Form.Item
                  name={'isActive'}
                  valuePropName={'checked'}
                  initialValue={false}
                >
                  <Checkbox
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                  >{field.displayName}</Checkbox>
                </Form.Item>
              </Col>
              <Col>
                <Space>
                  <Form.Item
                    style={{ width: 200 }}
                    name={'medicine_prescription_id'}
                    rules={[{ required: isActive }]}
                  >
                    <Select
                      options={field.medicine_prescriptions.map(data => ({
                        label: data.displayName,
                        value: data.id,
                      }))}
                      disabled={!isActive}
                    />
                  </Form.Item>
                  <Form.Item
                    name={'dosa'}
                    label={'Доза'}
                    rules={[{ required: isActive }]}
                  >
                    <Input disabled={!isActive} style={{ width: 150 }} />
                  </Form.Item>
                  <Form.Item
                    name={'note'}
                    label={'Примечание'}
                  >
                    <Input disabled={!isActive} />
                  </Form.Item>
                </Space>
              </Col>
            </Row>
          </Col>
      }
    </Form.List>
  );
};


export default DrugTherapyCreate;