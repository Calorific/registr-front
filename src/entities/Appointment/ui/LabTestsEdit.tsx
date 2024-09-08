import React, { Dispatch } from 'react';
import { Button, Card, Col, DatePicker, Form, Input, message, Row, Space, Spin } from 'antd';
import { labTestsUpdate, useGetLabTestsFields } from '@/entities/Appointment/api/labTestsApi';
import SubmitButton from '@/shared/ui/Buttons/SubmitButton';
import { FormStatus } from '@/entities/Appointment/model/FormStatus';
import dayjs from 'dayjs';
import { dateFormatConverter } from '@/shared/helpers/dateFormatConverter';

const LabTestsEdit = ({ setStatus, appointmentId, data }: {
  setStatus: Dispatch<FormStatus>,
  appointmentId: string,
  data: any
}) => {
  const [form] = Form.useForm();
  const { fields, error: fieldsError, isLoading: fieldsIsLoading } = useGetLabTestsFields();
  const [messageApi, contextHolder] = message.useMessage();
  const formSubmitHandler = async (values: any) => {
    try {
      for (let key in values) {
        if (key.endsWith('date')) {
          console.log('hood');
          values[key] = dateFormatConverter(values[key]);
        }
      }
      await labTestsUpdate(appointmentId, values);
      messageApi.success('Данные успешно обновлены');
      setStatus('display');
    } catch (e: any) {
      messageApi.error(JSON.stringify(e.response.data.message));
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
            title={'Лабораторные тесты'}
            extra={
              <Space>
                <Form.Item>
                  <Button onClick={() => setStatus('display')}>
                    Отмена
                  </Button>
                </Form.Item>
                <Form.Item>
                  <SubmitButton form={form}>
                    Сохранить
                  </SubmitButton>
                </Form.Item>
              </Space>
            }
        >
          {contextHolder}
          <Row gutter={[32, 16]} align={'middle'}>
            <Col span={12}>
              <Space
                  direction={'vertical'}
                  size={'middle'}
              >
                <Card
                    title={'Гормональный анализ крови'}
                >
                  <Row gutter={[32, 16]}>
                    {fields.hormonal_blood_analysis.map(field => (
                        <>
                          <Col span={5}>
                            {field.displayName}:
                          </Col>
                          <Col span={7}>
                            <Form.Item
                                name={field.textName}
                                initialValue={data[field.textName]}
                                rules={[{ required: true, message: 'заполните поле' }]}
                            >
                              <Input />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                                label={'Дата'}
                                name={field.dateName}
                                initialValue={dayjs(data[field.dateName], 'DD.MM.YYYY')}
                                rules={[{ required: true, message: 'введите дату' }]}
                            >
                              <DatePicker format={'DD.MM.YYYY'} />
                            </Form.Item>
                          </Col>
                        </>
                    ))}
                  </Row>
                </Card>
                <Card
                    title={'Общий анализ крови'}
                >
                  <Row gutter={[32, 16]}>
                    {fields.general_blood_analysis.map(field => (
                        <>
                          <Col span={5}>
                            {field.displayName}:
                          </Col>
                          <Col span={7}>
                            <Form.Item
                                name={field.textName}
                                initialValue={data[field.textName]}
                                rules={[{ required: true, message: 'заполните поле' }]}
                            >
                              <Input />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                                label={'Дата'}
                                name={field.dateName}
                                initialValue={dayjs(data[field.dateName], 'DD.MM.YYYY')}
                                rules={[{ required: true, message: 'введите дату' }]}
                            >
                              <DatePicker format={'DD.MM.YYYY'} />
                            </Form.Item>
                          </Col>
                        </>
                    ))}
                  </Row>
                </Card>
              </Space>
            </Col>
            <Col span={12}>
              <Card
                  title={'Общий анализ мочи'}
              >
                <Row gutter={[32, 16]}>
                  {fields.general_urine_analysis.map(field => (
                      <>
                        <Col span={6}>
                          {field.displayName}:
                        </Col>
                        <Col span={7}>
                          <Form.Item
                              name={field.textName}
                              initialValue={data[field.textName]}
                              rules={[{ required: true, message: 'заполните поле' }]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={11}>
                          <Form.Item
                              label={'Дата'}
                              name={field.dateName}
                              initialValue={dayjs(data[field.dateName], 'DD.MM.YYYY')}
                              rules={[{ required: true, message: 'введите дату' }]}
                          >
                            <DatePicker format={'DD.MM.YYYY'} />
                          </Form.Item>
                        </Col>
                      </>
                  ))}
                </Row>
              </Card>
            </Col>
            <Col>
              <Card
                  title={'Биохимический анализ крови'}
              >
                <Row gutter={[32, 16]}>
                  {fields.blood_chemistry.map(field => (
                      <Col span={12} key={field.textName}>
                        <Row gutter={32}>
                          <Col span={4}>
                            {field.displayName}:
                          </Col>
                          <Col span={8}>
                            <Form.Item
                                name={field.textName}
                                initialValue={data[field.textName]}
                                rules={[{ required: true, message: 'заполните поле' }]}
                            >
                              <Input />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                                label={'Дата'}
                                name={field.dateName}
                                initialValue={dayjs(data[field.dateName], 'DD.MM.YYYY')}
                                rules={[{ required: true, message: 'введите дату' }]}
                            >
                              <DatePicker format={'DD.MM.YYYY'} />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Col>
                  ))}
                </Row>
              </Card>
            </Col>
            <Col span={24}>
              <span>Примечание:</span>
              <Form.Item
                  style={{ width: '100%' }}
                  name={'note'}
                  initialValue={data.note}
              >
                <Input.TextArea style={{ height: 100 }} />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
  );
};

export default LabTestsEdit;