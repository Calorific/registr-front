import React, { Dispatch } from 'react';
import { Button, Card, Checkbox, Col, Form, Input, message, Radio, Row, Space, Spin } from 'antd';
import { diagnoseUpdate, useGetDiagnoseFields } from '@/entities/Appointment/api/diagnoseApi';
import { FormStatus } from '@/entities/Appointment/model/FormStatus';
import SubmitButton from '@/shared/ui/Buttons/SubmitButton';
import { IDiagnose } from '@/entities/Appointment/model/IDiagnose';

const DiagnoseEdit = ({ setStatus, appointmentId, data }: {
  setStatus: Dispatch<FormStatus>,
  appointmentId: string,
  data: any
}) => {
  const [form] = Form.useForm();
  const { fields, error: fieldsError, isLoading: fieldsIsLoading } = useGetDiagnoseFields();
  const [messageApi, contextHolder] = message.useMessage();
  const formSubmitHandler = async (values: IDiagnose) => {
    try {
      await diagnoseUpdate(appointmentId, values);
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
            title={'Диагноз'}
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
          <Space size={'middle'} wrap={true} align={'start'}>
            <Space
                direction={'vertical'}
                size={'middle'}
                wrap={true}
            >
              <Form.Item
                  label={'Диагноз'}
                  name={'diagnose'}
                  initialValue={data?.diagnose}
                  rules={[{ required: true, message: 'Введите диагноз' }]}
              >
                <Input />
              </Form.Item>
              <Card title={'Классификации'}>
                <Space
                    direction={'vertical'}
                    size={'middle'}
                    wrap={true}
                >
                  <Form.Item
                      label={'по ФВ'}
                      name={'classification_adjacent_release'}
                      initialValue={data?.classification_adjacent_release}
                      rules={[{ required: true, message: 'Выберите фракцию выброса' }]}

                  >
                    <Radio.Group>
                      <Space>
                        <Radio value={'низкая'}>низкая</Radio>
                        <Radio value={'умеренно-сниженная'}>умеренно-сниженная</Radio>
                        <Radio value={'сохранная'}>сохранная</Radio>
                      </Space>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item
                      label={'по функциональному классу'}
                      name={'classification_func_classes'}
                      initialValue={data?.classification_func_classes}
                      rules={[{ required: true, message: 'Выберите функциональный класс' }]}
                  >
                    <Radio.Group>
                      <Space>
                        <Radio value={'1'}>1</Radio>
                        <Radio value={'2'}>2</Radio>
                        <Radio value={'3'}>3</Radio>
                        <Radio value={'4'}>4</Radio>
                      </Space>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item
                      label={'по стадии НК'}
                      name={'classification_nc_stage'}
                      initialValue={data?.classification_nc_stage}
                      rules={[{ required: true, message: 'Выберите стадию НК' }]}
                      required={true}
                  >
                    <Radio.Group>
                      <Space>
                        <Radio value={'1'}>I</Radio>
                        <Radio value={'2а'}>IIа</Radio>
                        <Radio value={'2б'}>IIб</Radio>
                        <Radio value={'3'}>III</Radio>
                      </Space>
                    </Radio.Group>
                  </Form.Item>
                </Space>
              </Card>
            </Space>
            <Card
                title={'Сопутствующие заболевания'}
                style={{ width: 600 }}
            >
              <Row gutter={[32, 16]}>
                {fields.map(field => (
                    <>
                      <Col span={10}>
                        <Form.Item
                            name={field.booleanName}
                            valuePropName={'checked'}
                            initialValue={data?.[field.booleanName] || false}
                        >
                          <Checkbox>{field.displayName}</Checkbox>
                        </Form.Item>
                      </Col>
                      <Col span={14}>
                        <Form.Item
                            name={field.textName}
                            initialValue={data?.[field.textName] || ''}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                    </>
                ))}
                <Col span={10}>
                  Другое:
                </Col>
                <Col span={14}>
                  <Form.Item
                      name={'another'}
                      initialValue={data?.another || ''}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Space>
        </Card>
      </Form>
  );
};

export default DiagnoseEdit;