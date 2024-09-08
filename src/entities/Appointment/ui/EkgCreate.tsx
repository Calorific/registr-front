'use client';
import React, { Dispatch } from 'react';
import { Card, Checkbox, Col, DatePicker, Form, Input, InputNumber, message, Row, Space, Spin } from 'antd';
import SubmitButton from '@/shared/ui/Buttons/SubmitButton';
import { ekgCreate, useGetEkgFields } from '@/entities/Appointment/api/ekgsApi';
import { FormStatus } from '@/entities/Appointment/model/FormStatus';
import { IEkg } from '@/entities/Appointment/model/IEkg';
import { useSWRConfig } from 'swr';
import { dateFormatConverter } from '@/shared/helpers/dateFormatConverter';

const EkgCreate = ({ setStatus, appointmentId }: { setStatus: Dispatch<FormStatus>, appointmentId: string }) => {
  const { mutate } = useSWRConfig();
  const [form] = Form.useForm();
  const { fields, error: fieldsError, isLoading: fieldsIsLoading } = useGetEkgFields();
  const [messageApi, contextHolder] = message.useMessage();
  const formSubmitHandler = async (values: IEkg) => {
    try {
      values.date_ekg = dateFormatConverter(values.date_ekg);
      values.date_echo_ekg = dateFormatConverter(values.date_echo_ekg);
      await ekgCreate(appointmentId, values);
      await mutate({
        key: 'appointments/block/ekg/',
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
            style={{ width: '100%' }}
            title={'ЭКГ и Эхо-КГ'}
            extra={
              <Form.Item>
                <SubmitButton form={form}>
                  Сохранить
                </SubmitButton>
              </Form.Item>
            }
        >
          {contextHolder}
          <Space size={'large'} wrap={true}>
            <Card
                title={'ЭКГ'}
                extra={
                  <Form.Item
                      label={'Дата'}
                      name={'date_ekg'}
                      rules={[{ required: true, message: 'введите дату' }]}
                  >
                    <DatePicker format={'DD.MM.YYYY'} />
                  </Form.Item>
                }
            >
              <Space
                  direction={'vertical'}
                  size={'middle'}
              >
                {fields.ekg.map(field => (
                    <Form.Item
                        key={field.name}
                        name={field.name}
                        valuePropName={'checked'}
                        initialValue={false}
                    >
                      <Checkbox>{field.displayName}</Checkbox>
                    </Form.Item>
                ))}
                <span>Другие изменения:</span>
                <Form.Item
                    style={{ width: '100%' }}
                    name={'another_changes'}

                >
                  <Input.TextArea />
                </Form.Item>
              </Space>

            </Card>
            <Card
                style={{ width: 500 }}
                title={'Эхо-КГ'}
                extra={
                  <Form.Item
                      label={'Дата'}
                      name={'date_echo_ekg'}
                      rules={[{ required: true, message: 'введите дату' }]}
                  >
                    <DatePicker format={'DD.MM.YYYY'} />
                  </Form.Item>
                }
            >
              <Row gutter={32}>
                <Col span={12}>
                  <Row gutter={[32, 16]}>
                    {fields.echo_ekg.integer_fields.map(field => (
                        <>
                          <Col span={10}>
                            {field.displayName}:
                          </Col>
                          <Col span={14}>
                            <Form.Item
                                name={field.name}
                                rules={[{ required: true, message: 'заполните поле' }]}
                            >
                              <InputNumber />
                            </Form.Item>
                          </Col>
                        </>
                    ))}
                  </Row>
                </Col>
                <Col span={12}>
                  <Space
                      direction={'vertical'}
                      size={'middle'}
                  >
                    {fields.echo_ekg.boolean_fields.map(field => (
                        <Form.Item
                            key={field.name}
                            name={field.name}
                            valuePropName={'checked'}
                            initialValue={false}
                        >
                          <Checkbox>{field.displayName}</Checkbox>
                        </Form.Item>
                    ))}
                  </Space>
                </Col>
              </Row>
              <span>Примечание:</span>
              <Form.Item
                  style={{ width: '100%' }}
                  name={'note'}
              >
                <Input.TextArea />
              </Form.Item>
            </Card>
          </Space>
        </Card>
      </Form>
  );
};

export default EkgCreate;