'use client';
import React, { Dispatch } from 'react';
import { Card, Checkbox, Col, Form, Input, InputNumber, message, Row, Space, Spin } from 'antd';
import { FormStatus } from '@/entities/Appointment/model/FormStatus';
import SubmitButton from '@/shared/ui/Buttons/SubmitButton';
import { complaintsCreate, useGetComplaintsFields } from '@/entities/Appointment/api/complaintsApi';
import { IComplaints } from '@/entities/Appointment/model/IComplaints';
import { useSWRConfig } from 'swr';

const ComplaintsCreate = ({ setStatus, appointmentId }: { setStatus: Dispatch<FormStatus>, appointmentId: string }) => {
  const { mutate } = useSWRConfig();
  const [form] = Form.useForm();
  const { fields, error: fieldsError, isLoading: fieldsIsLoading } = useGetComplaintsFields();
  const [messageApi, contextHolder] = message.useMessage();
  const weight = Form.useWatch('weight', form);
  const height = Form.useWatch('height', form);

  const formSubmitHandler = async (values: IComplaints) => {
    try {
      values.bmi = (weight / Math.pow((height / 100), 2)).toFixed(2);
      await complaintsCreate(appointmentId, values);
      await mutate({
        key: 'appointments/block/complaint/',
        appointmentId,
      });
      await mutate({
        key: 'appointments/block/clinical_condition/',
        appointmentId,
      });
      setStatus('edit');
    } catch (e: any) {
      messageApi.error(e.message);
    }
  };
  if (fieldsError) return <div>Ошибка загрузки</div>;
  if (fieldsIsLoading) return <Spin />;

  return (
      <Form
          form={form}
          layout={'inline'}
          onFinish={formSubmitHandler}
      >
        <Card
            title={'Жалобы'}
            extra={
              <Form.Item>
                <SubmitButton form={form}>
                  Сохранить
                </SubmitButton>
              </Form.Item>
            }
        >
          {contextHolder}
          <Row gutter={32}>
            <Col>
              <Space direction={'vertical'} size={'middle'}>
                <Card>
                  <Space direction={'vertical'} size={'middle'} style={{ display: 'flex' }}>
                    <Form.Item
                        label={'Рост'}
                        name={'height'}
                        rules={[{ required: true, message: 'Укажите рост' }]}
                    >
                      <InputNumber />
                    </Form.Item>
                    <Form.Item
                        label={'Вес'}
                        name={'weight'}
                        rules={[{ required: true, message: 'Укажите вес' }]}
                    >
                      <InputNumber />
                    </Form.Item>
                    ИМТ: {((parseFloat(weight) > 0) && (parseFloat(height) > 0)) ? parseFloat((weight / Math.pow((height / 100), 2)).toFixed(2)) : ''}
                    <Form.Item
                        label={'Систолическое АД'}
                        name={'systolic_bp'}
                        rules={[{ required: true, message: 'Укажите систолическое АД' }]}
                    >
                      <InputNumber />
                    </Form.Item>
                    <Form.Item
                        label={'Диастолическое АД'}
                        name={'diastolic_bp'}
                        rules={[{ required: true, message: 'Укажите диастолическое АД' }]}
                    >
                      <InputNumber />
                    </Form.Item>
                    <Form.Item
                        label={'ЧСС'}
                        name={'heart_rate'}
                        rules={[{ required: true, message: 'Укажите ЧСС' }]}
                    >
                      <InputNumber />
                    </Form.Item>
                    <Form.Item
                        label={'Дистанция 6-минутной ходьбы'}
                        name={'six_min_walk_distance'}
                        rules={[{ required: true, message: 'Укажите дистанцию 6-минутной ходьбы' }]}
                    >
                      <InputNumber />
                    </Form.Item>
                  </Space>

                </Card>
                <Card title={'Жалобы'}>
                  {fields.complaints.map(field => (
                      <Form.Item
                          key={field.name}
                          name={field.name}
                          valuePropName={'checked'}
                          initialValue={false}
                      >
                        <Checkbox>{field.displayName}</Checkbox>
                      </Form.Item>
                  ))}
                  <span>Примечание:</span>
                  <Form.Item
                      name={'note'}
                  >
                    <Input.TextArea />
                  </Form.Item>
                </Card>
              </Space>
            </Col>
            <Col span={14}>
              <Card title={'Клиническое состояние'}>
                <Row>
                  {fields.conditions.map(field => (
                      <Col span={12} key={field.name}>
                        <Form.Item
                            name={field.name}
                            valuePropName={'checked'}
                            initialValue={false}
                        >
                          <Checkbox>{field.displayName}</Checkbox>
                        </Form.Item>
                      </Col>

                  ))}
                </Row>

                <span>Примечание:</span>
                <Form.Item
                    name={'other_symptoms'}
                >
                  <Input.TextArea />
                </Form.Item>
              </Card>
            </Col>
          </Row>
        </Card>
      </Form>
  );
};

export default ComplaintsCreate;