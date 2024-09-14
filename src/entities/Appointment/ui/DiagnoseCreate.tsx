'use client';
import React, { Dispatch, Fragment } from 'react';
import { Button, Card, Checkbox, Col, Form, Input, message, Radio, Row, Space, Spin } from 'antd';
import { IPatientNew } from '@/entities/Patient/model/IPatientNew';
import { diagnoseCreate, useGetDiagnoseFields } from '@/entities/Appointment/api/diagnoseApi';
import SubmitButton from '@/shared/ui/Buttons/SubmitButton';
import { IDiagnose } from '@/entities/Appointment/model/IDiagnose';
import { FormStatus } from '@/entities/Appointment/model/FormStatus';
import { useSWRConfig } from 'swr';
import { useRouter } from 'next/navigation';
import { useValidation } from '@/shared/hooks/useValidation';

const initialValues = {
  classification_adjacent_release: 'низкая',
  classification_func_classes: '1',
  classification_nc_stage: '1',
};


interface DiagnoseCreateProps {
  setStatus: Dispatch<FormStatus>,
  appointmentId: string,
  data?: IDiagnose
}

const DiagnoseCreate = ({ setStatus, appointmentId, data }: DiagnoseCreateProps) => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [form] = Form.useForm();
  const { fields, error: fieldsError, isLoading: fieldsIsLoading } = useGetDiagnoseFields();
  const [messageApi, contextHolder] = message.useMessage();
  const [isValid, handleValidation] = useValidation(form);

  const formSubmitHandler = async (values: IPatientNew) => {
    try {
      await diagnoseCreate(appointmentId, values);
      setStatus('edit');
      await mutate({
        key: 'appointments/block/diagnose/',
        appointmentId,
      });

    } catch (e: any) {
      messageApi.error(e.message);
    }
  };


  if (fieldsError)
    return <div>Ошибка загрузки</div>;

  if (fieldsIsLoading)
    return <Spin />;

  const handleNext = async () => {
    try {
      await diagnoseCreate(appointmentId, form.getFieldsValue());
      await mutate({
        key: 'appointments/block/diagnose/',
        appointmentId,
      });

      router.push(`/appointments/${appointmentId}/labTests?m=success`);
    } catch (e: any) {
      messageApi.error(e.message);
    }
  }

  return (
    <Form
      form={form}
      layout={'inline'}
      onFinish={formSubmitHandler}
      initialValues={initialValues}
      onChange={handleValidation}
    >
      <Card
        title={'Приём пациента'}
        extra={
          <div style={{ display: 'flex', columnGap: 10, alignItems: 'center' }}>
            <Form.Item>
              <SubmitButton form={form}>
                Сохранить
              </SubmitButton>
            </Form.Item>
            <Form.Item>
              <Button
                disabled={!isValid}
                onClick={handleNext}
              >
                Далее
              </Button>
            </Form.Item>
          </div>
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
              <Space direction={'vertical'} size={'middle'}>
                <Space>
                  <Form.Item
                    label={'по ФВ'}
                    name={'classification_adjacent_release'}
                    initialValue={data?.classification_adjacent_release}
                    rules={[{ required: true, message: 'Выберите фракцию выброса' }]}
                  >
                    <Radio.Group name="classification_adjacent_release">
                      <Radio value={'низкая'}>низкая</Radio>
                      <Radio value={'умеренно-сниженная'}>умеренно-сниженная</Radio>
                      <Radio value={'сохранная'}>сохранная</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Space>

                <Space>
                  <Form.Item
                    label={'по функциональному классу'}
                    name={'classification_func_classes'}
                    initialValue={data?.classification_func_classes}
                    rules={[{ required: true, message: 'Выберите функциональный класс' }]}
                  >
                    <Radio.Group name="classification_func_classes">
                      <Radio value={'1'}>1</Radio>
                      <Radio value={'2'}>2</Radio>
                      <Radio value={'3'}>3</Radio>
                      <Radio value={'4'}>4</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Space>

                <Space>
                  <Form.Item
                    label={'по стадии НК'}
                    name={'classification_nc_stage'}
                    initialValue={data?.classification_nc_stage}
                    rules={[{ required: true, message: 'Выберите стадию НК' }]}
                  >
                    <Radio.Group name="classification_nc_stage">
                      <Radio value={'1'}>I</Radio>
                      <Radio value={'2а'}>IIа</Radio>
                      <Radio value={'2б'}>IIб</Radio>
                      <Radio value={'3'}>III</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Space>
              </Space>
            </Card>
          </Space>
          <Card title={'Сопутствующие заболевания'}>
            <Row gutter={[32, 16]}>
              {fields.map((field, i) => (
                <Fragment key={i}>
                  <Form.Item noStyle shouldUpdate={true}>
                    {({ getFieldValue }) => (
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
                            <Input disabled={!getFieldValue(field.booleanName)} />
                          </Form.Item>
                        </Col>
                      </>
                    )}
                  </Form.Item>
                </Fragment>
              ))}
              <Col span={10}>
                Другое:
              </Col>
              <Col span={14}>
                <Form.Item name={'another'} initialValue={data?.another || ''}>
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

export default DiagnoseCreate;