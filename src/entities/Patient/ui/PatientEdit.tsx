'use client';
import React from 'react';
import { Button, Card, Checkbox, Col, Form, Input, InputNumber, message, Radio, Row, Space } from 'antd';
import { IPatientNew } from '@/entities/Patient/model/IPatientNew';
import SubmitButton from '@/shared/ui/Buttons/SubmitButton';
import { updatePatient } from '@/entities/Patient/api/updatePatient';
import { IPatient } from '@/entities/Patient/model/IPatient';
import dayjs from 'dayjs';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSWRConfig } from 'swr';
import { DateInput } from '@/shared/ui/Form/DateInput';
import MaskedInput from 'antd-mask-input';
import { PhoneMask } from '@/shared/ui/Form';

const PatientEdit = ({ data }: { data: IPatient }) => {
  const { mutate } = useSWRConfig();
  const [form] = Form.useForm();
  const hasHospitalization: boolean = Form.useWatch('has_hospitalization', form);
  const pathname = usePathname();
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const formSubmitHandler = async (values: IPatientNew) => {
    values.phone = values.phone.toString().replaceAll(' ', '');

    try {
      await updatePatient(data.id, values);
      await mutate((key: { key: string }) => key !== null && typeof key === 'object' && (key.key == 'patients/'));
      await mutate((key: {
        key: string
      }) => key !== null && typeof key === 'object' && (key.key == 'patients/appointment/'));
      messageApi.success('Данные успешно обновлены');
      router.push(pathname);
    } catch (e: any) {
      if (e.request.status >= 500) {
        messageApi.error('Что-то пошло не так');
      } else if (e.request.status) {

      } else {
        messageApi.error(e.response.data.message);
      }
    }
  };

  return (
    <Form
      form={form}
      layout={'inline'}
      onFinish={formSubmitHandler}
    >
      <Card
        style={{ width: '100%' }}
        title={'Карточка пациента'}
        extra={
          <Space size={'large'}>
            <Form.Item>
              <Link href={{ pathname: pathname, query: null }}>
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
        {contextHolder}
        <Row gutter={32}>
          <Col span={12}>
            <Space size={'middle'} direction={'vertical'} wrap={true} style={{ display: 'flex' }}>
              <Card>
                <Space size={'middle'} direction={'vertical'} wrap={true} style={{ display: 'flex' }}>
                  <Form.Item
                    label={'Имя'}
                    name={'name'}
                    rules={[{ required: true, message: 'Введите имя' }]}
                    initialValue={data.name}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label={'Фамилия'}
                    name={'last_name'}
                    rules={[{ required: true, message: 'Введите фамилию' }]}
                    initialValue={data.last_name}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label={'Отчество'}
                    name={'patronymic'}
                    initialValue={data.patronymic}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label={'Пол'}
                    name={'gender'}
                    rules={[{ required: true, message: 'Выберите пол' }]}
                    initialValue={data.gender}
                  >
                    <Radio.Group>
                      <Space size={'large'}>
                        <Radio value={'М'}>Мужской</Radio>
                        <Radio value={'Ж'}>Женский</Radio>
                      </Space>

                    </Radio.Group>
                  </Form.Item>
                  <DateInput label="Дата рождения" name="birth_date" />
                  <DateInput label="Дата смерти" name="dod" required={false} />
                </Space>
              </Card>
              <span>Примечание:</span>
              <Form.Item
                name={'patient_note'}
                initialValue={data.patient_note}
              >
                <Input.TextArea rows={5} />
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
                    initialValue={data.location}
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
                    initialValue={data.district}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label={'Адрес'}
                    name={'address'}
                    rules={[{ required: true, message: 'Введите адрес' }]}
                    initialValue={data.address}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label={'Телефон'}
                    name={'phone'}
                    rules={[
                      { required: true, message: 'Введите номер телефона' },
                      { pattern: new RegExp(/^\+7 \d\d\d \d\d\d \d\d \d\d$/), message: "Введите корректный номер телефона" },
                    ]}
                    initialValue={data.phone}
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
                    initialValue={data.clinic}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label={'Направивший врач'}
                    name={'referring_doctor'}
                    initialValue={data.referring_doctor}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label={'Направившее учреждение'}
                    name={'referring_clinic_organization'}
                    initialValue={data.referring_clinic_organization}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label={'Категория инвалидности'}
                    name={'disability'}
                    rules={[{ required: true, message: 'Выберите категорию инвалидности' }]}
                    initialValue={data.disability}
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
                    initialValue={data.lgota_drugs}
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
                        initialValue={data.count_hospitalization}
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

export default PatientEdit;