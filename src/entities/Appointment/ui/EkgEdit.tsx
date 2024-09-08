import React, { Dispatch } from 'react';
import { Button, Card, Checkbox, Col, DatePicker, Form, Input, InputNumber, message, Row, Space, Spin } from 'antd';
import { ekgUpdate, useGetEkgFields } from '@/entities/Appointment/api/ekgsApi';
import SubmitButton from '@/shared/ui/Buttons/SubmitButton';
import { FormStatus } from '@/entities/Appointment/model/FormStatus';
import dayjs from 'dayjs';
import { dateFormatConverter } from '@/shared/helpers/dateFormatConverter';
import { IEkg } from '@/entities/Appointment/model/IEkg';

const EkgEdit = ({ setStatus, appointmentId, data }: {
  setStatus: Dispatch<FormStatus>,
  appointmentId: string,
  data: any
}) => {
  const [form] = Form.useForm();
  const { fields, error: fieldsError, isLoading: fieldsIsLoading } = useGetEkgFields();
  const [messageApi, contextHolder] = message.useMessage();
  const formSubmitHandler = async (values: IEkg) => {
    try {
      values.date_ekg = dateFormatConverter(values.date_ekg);
      values.date_echo_ekg = dateFormatConverter(values.date_echo_ekg);
      await ekgUpdate(appointmentId, values);
      messageApi.success('Данные успешно обновлены');
      setStatus('display');
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
          <Space size={'large'}>
            <Card
                title={'ЭКГ'}
                extra={
                  <Form.Item
                      label={'Дата'}
                      name={'date_ekg'}
                      initialValue={dayjs(data.date_ekg, 'DD.MM.YYYY')}
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
                        initialValue={data[field.name]}
                        rules={[{ required: true, message: 'введите дату' }]}
                    >
                      <Checkbox>{field.displayName}</Checkbox>
                    </Form.Item>
                ))}
                <span>Другие изменения:</span>
                <Form.Item
                    style={{ width: '100%' }}
                    name={'another_changes'}
                    initialValue={data.another_changes}
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
                      initialValue={dayjs(data.date_echo_ekg, 'DD.MM.YYYY')}
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
                                initialValue={data[field.name]}
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
                            initialValue={data[field.name]}
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
                  initialValue={data.note}
              >
                <Input.TextArea />
              </Form.Item>
            </Card>
          </Space>
        </Card>
      </Form>
  );
};

export default EkgEdit;