'use client';
import React, { useEffect } from 'react';
import {
  diagnoseCreate,
  diagnoseUpdate,
  useGetCurrentDiagnoseData,
  useGetDiagnoseFields,
} from '@/entities/Appointment/api/diagnoseApi';
import { useGetAppointmentStatus } from '@/entities/Appointment/api/appointmentApi';
import { Card, Checkbox, Col, Form, Input, message, Radio, Row, Space, Spin } from 'antd';
import SubmitButton from '@/shared/ui/Buttons/SubmitButton';
import { IDiagnose } from '@/entities/Appointment/model/IDiagnose';
import { useSWRConfig } from 'swr';

const initialValues = {
  classification_adjacent_release: 'низкая',
  classification_func_classes: '1',
  classification_nc_stage: '1',
};

const DiagnoseForm = ({ appointmentId }: { appointmentId: string }) => {
  const [form] = Form.useForm();
  const { mutate } = useSWRConfig();
  const [messageApi, contextHolder] = message.useMessage();

  const { currentData, isLoading: currentDataIsLoading, } = useGetCurrentDiagnoseData(appointmentId);
  const { isLoading: statusIsLoading, error: statusError } = useGetAppointmentStatus(appointmentId);
  const { fields, error: fieldsError, isLoading: fieldsIsLoading } = useGetDiagnoseFields();

  useEffect(() => {
    form.setFieldsValue(currentData);
  }, [currentData, form]);

  const formSubmitHandler = async (values: IDiagnose) => {
    try {
      await form.validateFields();
      if (currentData) {
        await diagnoseUpdate(appointmentId, values);
        messageApi.success('Данные успешно обновлены');
      } else {
        await diagnoseCreate(appointmentId, values);
        await mutate({
          key: 'appointments/block/diagnose/',
          appointmentId,
        });
        messageApi.success('Диагноз успешно добавлен');
      }

      return true;
    } catch (e: any) {
      messageApi.error(e?.response?.data?.message ?? 'Данные заполнены некорректно');
      return false;
    }
  };

  if (statusError) {
    return <div>{statusError?.message}</div>;
  }

  if (fieldsError) {
    return <div>{fieldsError?.message}</div>;
  }

  if (currentDataIsLoading || statusIsLoading || fieldsIsLoading) {
    return <Spin />;
  }

  return (
    <Form form={form} initialValues={initialValues} onFinish={formSubmitHandler}>
      {contextHolder}
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Card title="Диагноз" className="h-full">
            <Form.Item
              layout="vertical"
              label="Диагноз"
              name="diagnose"
              required
              rules={[{ required: true, message: 'Пожалуйста, укажите диагноз' }]}
            >
              <Input.TextArea className="w-full" rows={3} placeholder="Введите диагноз..." />
            </Form.Item>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Классификация" className="h-full">
            <Form.Item
              label="по ФВ"
              name="classification_adjacent_release"
              rules={[{ required: true, message: 'Выберите фракцию выброса' }]}
              className="!mb-0 !flex"
            >
              <Radio.Group name="classification_adjacent_release">
                <Space>
                  <Radio value="низкая">низкая</Radio>
                  <Radio value="умеренно-сниженная">умеренно-сниженная</Radio>
                  <Radio value="сохранная">сохранная</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="по функциональному классу"
              name="classification_func_classes"
              rules={[{ required: true, message: 'Выберите функциональный класс' }]}
              className="!mb-0"
            >
              <Radio.Group name="classification_func_classes">
                <Space>
                  <Radio value="1">1</Radio>
                  <Radio value="2">2</Radio>
                  <Radio value="3">3</Radio>
                  <Radio value="4">4</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="по стадии НК"
              name="classification_nc_stage"
              rules={[{ required: true, message: 'Выберите стадию НК' }]}
              required={true}
              className="!mb-0"
            >
              <Radio.Group name="classification_nc_stage">
                <Space>
                  <Radio value="1">I</Radio>
                  <Radio value="2а">IIа</Radio>
                  <Radio value="2б">IIб</Radio>
                  <Radio value="3">III</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Card>
        </Col>

        <Col span={24}>
          <Card title="Сопутствующие заболевания">
            <Row gutter={[72, 14]}>
              {fields.map((field, i) => (
                <Col span={12} key={i}>
                  <Form.Item noStyle shouldUpdate={true}>
                    {({ getFieldValue }) => (
                      <div className="flex items-center">
                        <Form.Item
                          name={field.booleanName}
                          valuePropName="checked"
                          style={{ width: 230 }}
                        >
                          <Checkbox>{field.displayName}</Checkbox>
                        </Form.Item>

                        <Form.Item name={field.textName} style={{ width: 340 }}>
                          <Input placeholder="Введите комментарий" disabled={!getFieldValue(field.booleanName)} />
                        </Form.Item>
                      </div>
                    )}
                  </Form.Item>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
      </Row>

      <SubmitButton form={form}>
        Далее
      </SubmitButton>
    </Form>
  );
};

export default DiagnoseForm;