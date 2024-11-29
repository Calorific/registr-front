'use client';
import React, { useState } from 'react';
import { Button, Card, Checkbox, Col, Form, Input, InputNumber, Radio, Row, Space, Typography, } from 'antd';
import SubmitButton from '@/shared/ui/Buttons/SubmitButton';
import { IPatientNew } from '@/entities/Patient/model/IPatientNew';
import { createPatient } from '@/entities/Patient/api/createPatient';
import Link from 'next/link';
import { initAppointment } from '@/entities/Patient/api/initAppointment';
import { useRouter } from 'next/navigation';
import { IPatient } from '@/entities/Patient/model/IPatient';
import dayjs from 'dayjs';
import MaskedInput from "antd-mask-input";
import { DateInput } from '@/shared/ui/Form/DateInput';
import { PhoneMask } from '@/shared/ui/Form';

const initialValues = {

};

export const PatientCreate = () => {
  const [form] = Form.useForm();
  const hasHospitalization: boolean = Form.useWatch('has_hospitalization', form);

  const [errorMessage, setErrorMessage] = useState('');
  const [showDeathDate, setShowDeathDate] = useState<boolean>(false);

  const router = useRouter();
  const formSubmitHandler = async (values: IPatientNew) => {
    values.phone = values.phone.toString().replaceAll(' ', '');

    setErrorMessage('');

    try {
      const patient: IPatient = await createPatient(values);
      const appointmentId = await initAppointment(patient.id);
      router.push(`/appointments/${appointmentId}/diagnose`);
    } catch (e: any) {
      setErrorMessage(e.response.data.message);
    }
  };

  return (
    <Form
      form={form}
      layout={'inline'}
      onFinish={formSubmitHandler}
      initialValues={initialValues}
    >
      <Card
        style={{ width: '100%' }}
        title={'Карточка пациента'}
        extra={
          <Space>
            <Form.Item>
              <Link href={'/appointments/new'}>
                <Button>
                  Отмена
                </Button>
              </Link>
            </Form.Item>
            <Form.Item>
              <SubmitButton form={form}>
                Сохранить
              </SubmitButton>
            </Form.Item>
          </Space>
        }
      >
        <Typography.Text type={'danger'}>
          {errorMessage}
        </Typography.Text>
        <Row gutter={32}>
          <Col span={12}>
            <Space size={'middle'} direction={'vertical'} wrap={true} style={{ display: 'flex' }}>
              <Card>
                <Space size={'middle'} direction={'vertical'} wrap={true} style={{ display: 'flex' }}>
                  <Form.Item
                    label={'Фамилия'}
                    name={'last_name'}
                    rules={[{ required: true, message: 'Введите фамилию' }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label={'Имя'}
                    name={'name'}
                    rules={[{ required: true, message: 'Введите имя' }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label={'Отчество'}
                    name={'patronymic'}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label={'Пол'}
                    name={'gender'}
                    rules={[{ required: true, message: 'Выберите пол' }]}
                  >
                    <Radio.Group>
                      <Space size={'large'}>
                        <Radio value={'М'}>Мужской</Radio>
                        <Radio value={'Ж'}>Женский</Radio>
                      </Space>

                    </Radio.Group>
                  </Form.Item>
                  <DateInput label="Дата рождения" name="birth_date" />

                  {showDeathDate ? (
                    <DateInput label="Дата смерти" name="dod" required={false} />
                  ) : (
                    <Button type="primary" onClick={() => setShowDeathDate(true)}>Добавить дату смерти</Button>
                  )}

                </Space>
              </Card>
              <Form.Item name={'patient_note'} label="Примечание:" layout="vertical">
                <Input.TextArea style={{ height: 150 }} />
              </Form.Item>
            </Space>
          </Col>
          <Col>
            <Space direction={'vertical'} size={'middle'} style={{ display: 'flex' }}>
              <Card>
                <Space direction={'vertical'} size={'middle'} wrap={true} style={{ display: 'flex' }}>
                  <Form.Item
                    label={'Место жительства'}
                    name={'location'}
                    rules={[{ required: true, message: 'Выберите место жительства' }]}
                  >
                    <Radio.Group>
                      <Radio value={'НСО'}>НСО</Radio>
                      <Radio value={'Новосибирск'}>Новосибирск</Radio>
                      <Radio value={'другое'}>другое</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item
                    label={'Район'}
                    name={'district'}
                    rules={[{ required: true, message: 'Введите район' }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label={'Адрес'}
                    name={'address'}
                    rules={[{ required: true, message: 'Введите адрес' }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label={'Телефон'}
                    name={'phone'}
                    rules={[
                      { required: true, message: 'Введите номер телефона' },
                      { pattern: new RegExp(/^\+7 \d\d\d \d\d\d \d\d \d\d$/), message: "Введите корректный номер телефона" }
                    ]}
                  >
                    <MaskedInput mask={PhoneMask} />
                  </Form.Item>
                </Space>
              </Card>
              <Card>
                <Space direction={'vertical'} size={'middle'} wrap={true} style={{ display: 'flex' }}>
                  <Form.Item
                    label={'Поликлиника'}
                    name={'clinic'}
                    rules={[{ required: true, message: 'Введите поликлинику' }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label={'Направивший врач'}
                    name={'referring_doctor'}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label={'Направившее учреждение'}
                    name={'referring_clinic_organization'}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label={'Категория инвалидности'}
                    name={'disability'}
                    rules={[{ required: true, message: 'Выберите категорию инвалидности' }]}
                  >
                    <Radio.Group>
                      <Radio value={'нет'}>Нет</Radio>
                      <Radio value={'I'}>I</Radio>
                      <Radio value={'II'}>II</Radio>
                      <Radio value={'III'}>III</Radio>
                      <Radio value={'отказ'}>Отказ</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item
                    label={'Льготное обеспечение препаратами'}
                    name={'lgota_drugs'}
                    rules={[{ required: true, message: 'Выберите вид льготы' }]}
                  >
                    <Radio.Group>
                      <Radio value={'да'}>Да</Radio>
                      <Radio value={'нет'}>Нет</Radio>
                      <Radio value={'ССЗ'}>ССЗ</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Space size={'large'} wrap={true}>
                    <Form.Item
                      name={'has_hospitalization'}
                      valuePropName={'checked'}
                      required={false}
                      initialValue={false}
                    >
                      <Checkbox>Госпитализации</Checkbox>
                    </Form.Item>
                    {hasHospitalization && (
                      <Form.Item
                        label={'Количество госпитализаций'}
                        name={'count_hospitalization'}
                        rules={[{ required: true, message: 'Введите количество госпитализаций' }]}
                      >
                        <InputNumber />
                      </Form.Item>
                    )}
                  </Space>
                  {hasHospitalization && (
                    <DateInput label="Дата последней госпитализации" name="last_hospitalization_date" />
                  )}
                </Space>
              </Card>
            </Space>
          </Col>
        </Row>
      </Card>
    </Form>
  );
};

export default PatientCreate;