import React, { Dispatch, useState } from 'react';
import { Card, Checkbox, Form, Input, Radio, Space, Spin, Typography } from 'antd';
import { useGetDiagnoseFields } from '@/entities/Appointment/api/diagnoseApi';
import { IPatientNew } from '@/entities/Patient/model/IPatientNew';
import { FormStatus } from '@/entities/Appointment/model/FormStatus';

const DiagnoseDisplay = ({ data, setStatus }: { data: any, setStatus: Dispatch<FormStatus> }) => {
  const [form] = Form.useForm();
  const { fields, error: fieldsError, isLoading: fieldsIsLoading } = useGetDiagnoseFields();
  const [errorMessage, setErrorMessage] = useState('');
  const formSubmitHandler = async (values: IPatientNew) => {
    try {
      setStatus('edit');
    } catch (e: any) {
      setErrorMessage(e.message);
    }
  };
  if (fieldsError) return <div>Ошибка загрузки</div>;
  if (fieldsIsLoading) return <Spin />;

  return (
      <Card>
        <Form
            form={form}
            layout={'vertical'}
            onFinish={formSubmitHandler}
        >
          <Typography.Text type={'danger'}>
            {errorMessage}
          </Typography.Text>
          <Form.Item
              label={'Диагноз'}
              name={'diagnose'}
              initialValue={data.diagnose}
          >
            <Radio.Group>
              <Space>
                <Radio value={1}>1</Radio>
                <Radio value={2}>2</Radio>
                <Radio value={3}>3</Radio>
                <Radio value={4}>4</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
          <h2>Классификации</h2>
          <Form.Item
              label={'по ФВ'}
              name={'classification_adjacent_release'}
              initialValue={data.classification_adjacent_release}
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
              label={'по стадии НК'}
              name={'classification_nc_stage'}
              initialValue={data.classification_nc_stage}
          >
            <Input />
          </Form.Item>
          <Form.Item
              label={'по функциональному классу'}
              name={'classification_func_classes'}
              initialValue={data.classification_func_classes}
          >
            <Radio.Group>
              <Space>
                <Radio value={'I'}>I</Radio>
                <Radio value={'IIа'}>IIа</Radio>
                <Radio value={'IIб'}>IIб</Radio>
                <Radio value={'III'}>III</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
          <h2>Сопутствующие заболевания</h2>
          {fields.map(field => (
              <Space key={field.booleanName}>
                <Form.Item
                    name={field.booleanName}
                    valuePropName={'checked'}
                    initialValue={data[field.booleanName] || false}
                >
                  <Checkbox>{field.displayName}</Checkbox>
                </Form.Item>
                <Form.Item
                    name={field.textName}
                    initialValue={data[field.textName] || ''}
                >
                  <Input />
                </Form.Item>
              </Space>
          ))}
        </Form>
      </Card>
  );
};

export default DiagnoseDisplay;