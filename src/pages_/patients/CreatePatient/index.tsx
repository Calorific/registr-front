'use client';
import React, { useState } from 'react';
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  notification,
  Radio,
  Row,
} from 'antd';
import SubmitButton from '@/shared/ui/Buttons/SubmitButton';
import { IPatientNew } from '@/entities/Patient/model/IPatientNew';
import { createPatient } from '@/entities/Patient/api/createPatient';
import Link from 'next/link';
import { initAppointment } from '@/entities/Patient/api/initAppointment';
import { useRouter } from 'next/navigation';
import { IPatient } from '@/entities/Patient/model/IPatient';
import MaskedInput from "antd-mask-input";
import { DateInput } from '@/shared/ui/Form/DateInput';
import { PhoneMask } from '@/shared/ui/Form';

const initialValues = {
  gender: 'М',
  location: 'НСО',
  disability: 'нет',
  lgota_drugs: 'да',
};

export const CreatePatient = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const hasHospitalization: boolean = Form.useWatch('has_hospitalization', form);

  const [showDeathDate, setShowDeathDate] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const formSubmitHandler = async (values: IPatientNew) => {
    setLoading(true);
    values.phone = values.phone.toString().replaceAll(' ', '');

    try {
      const patient: IPatient = await createPatient(values);
      const appointmentId = await initAppointment(patient.id);
      router.push(`/appointments/${appointmentId}/diagnose`);
    } catch (e: any) {
      notification.error({ message: e.message });
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={formSubmitHandler}
      initialValues={initialValues}
    >
      <Card className="w-full" title="Карточка пациента" loading={loading}>
        <Row gutter={[24, 24]}>
          <Col span={12}>
            <Card className="w-full">
              <div className="flex flex-col gap-y-[10px]">
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
                  label={'Пол:'}
                  name={'gender'}
                  layout="horizontal"
                  rules={[{ required: true, message: 'Выберите пол' }]}
                >
                  <Radio.Group className="ml-[10px]">
                    <Radio value={'М'}>Мужской</Radio>
                    <Radio value={'Ж'}>Женский</Radio>
                  </Radio.Group>
                </Form.Item>

                <Row gutter={[20, 20]} className="items-end">
                  <Col span={12}>
                    <DateInput label="Дата рождения" name="birth_date" />
                  </Col>

                  <Col span={12}>
                    {showDeathDate ? (
                      <DateInput label="Дата смерти" name="dod" required={false} />
                    ) : (
                      <Button className="h-[36px] w-full" type="default" onClick={() => setShowDeathDate(true)}>
                        Добавить дату смерти
                      </Button>
                    )}
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
          <Col span={12}>
            <Card className="h-full">
              <div className="flex flex-col gap-y-[10px]">
                <Form.Item
                  label={'Место жительства'}
                  name={'location'}
                  rules={[{ required: true, message: 'Выберите место жительства' }]}
                  layout="horizontal"
                >
                  <Radio.Group className="ml-[10px]">
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
                    {
                      pattern: new RegExp(/^\+7 \d\d\d \d\d\d \d\d \d\d$/),
                      message: 'Введите корректный номер телефона',
                    },
                  ]}
                >
                  <MaskedInput mask={PhoneMask} />
                </Form.Item>
              </div>
            </Card>
          </Col>
          <Col span={24}>
            <Card>
              <Row gutter={[30, 10]}>
                <Col span={12}>
                  <div className="flex flex-col gap-y-[10px]">
                    <Form.Item
                      label={'Поликлиника'}
                      name={'clinic'}
                    >
                      <Input placeholder="Поликлиника" />
                    </Form.Item>

                    <Form.Item
                      label={'Направивший врач'}
                      name={'referring_doctor'}
                    >
                      <Input placeholder="Направивший врач" />
                    </Form.Item>

                    <Form.Item
                      label={'Направившая мед. организация'}
                      name={'referring_clinic_organization'}
                    >
                      <Input placeholder="Направившая мед. организация" />
                    </Form.Item>

                    <Form.Item
                        name={'has_hospitalization'}
                        valuePropName={'checked'}
                        required={false}
                        initialValue={false}
                    >
                      <Checkbox>Госпитализации</Checkbox>
                    </Form.Item>

                    {hasHospitalization && (
                      <Row gutter={20}>
                        <Col span={12}>
                          <Form.Item
                            label={'Количество госпитализаций'}
                            name={'count_hospitalization'}
                            rules={[{ required: true, message: 'Введите количество госпитализаций' }]}
                          >
                            <InputNumber />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <DateInput label="Дата последней госпитализации" name="last_hospitalization_date" />
                        </Col>
                      </Row>
                    )}
                  </div>

                </Col>
                <Col span={12} className="flex items-center">
                  <div className="flex flex-col gap-y-[10px]">
                    <Form.Item
                      label={'Категория инвалидности'}
                      name={'disability'}
                      rules={[{ required: true, message: 'Выберите категорию инвалидности' }]}
                      layout="horizontal"
                    >
                      <Radio.Group className="ml-[10px]">
                        <Radio value={'нет'}>Нет</Radio>
                        <Radio value={'I'}>I</Radio>
                        <Radio value={'II'}>II</Radio>
                        <Radio value={'III'}>III</Radio>
                        <Radio value={'отказ'}>Отказ</Radio>
                      </Radio.Group>
                    </Form.Item>

                    <Form.Item
                      label={'Льготное лекарственное обеспечение (ЛЛО):'}
                      name={'lgota_drugs'}
                      rules={[{ required: true, message: 'Выберите вид льготы' }]}
                    >
                      <Radio.Group>
                        <Radio value={'да'}>Да</Radio>
                        <Radio value={'нет'}>Нет</Radio>
                        <Radio value={'ССЗ'}>ССЗ</Radio>
                      </Radio.Group>
                    </Form.Item>

                    <Form.Item name={'patient_note'} label="Примечание:" layout="vertical">
                      <Input.TextArea placeholder="Введите комментарий..." rows={4} />
                    </Form.Item>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col span={24}>
            <div className="flex gap-x-[24px] items-center">
              <Link href="/appointments">
                <Button className="w-[164px] h-[42px]">
                  Отмена
                </Button>
              </Link>

              <SubmitButton form={form}>
                Сохранить
              </SubmitButton>
            </div>
          </Col>
        </Row>
      </Card>
    </Form>
  );
};

export default CreatePatient;