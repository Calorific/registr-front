'use client';
import React from 'react';
import { Button, Card, Descriptions } from 'antd';
import { IPatient } from '@/entities/Patient/model/IPatient';
import Link from 'next/link';
import { useParams  } from 'next/navigation';

const PatientDisplay = ({ data }: { data: IPatient }) => {
  const { id } = useParams();
  return (
    <Card
      title={'Карточка пациента'}
      extra={
        <div style={{ display: 'flex', columnGap: 10 }}>
          <Link href="/patients">
            <Button>
              Назад
            </Button>
          </Link>
          <Link href="?status=edit">
            <Button>
              Изменить
            </Button>
          </Link>
          {/*<Link href={`/appointments/${id.toString()}/diagnose`}>*/}
          {/*  <Button>*/}
          {/*    Далее*/}
          {/*  </Button>*/}
          {/*</Link>*/}
        </div>
      }
    >
      <Descriptions layout={'vertical'} column={4}>
        <Descriptions.Item label={'Фамилия'}>
          {data.last_name}
        </Descriptions.Item>
        <Descriptions.Item label={'Имя'}>
          {data.name}
        </Descriptions.Item>
        <Descriptions.Item
          label={'Отчество'}
          span={2}
        >
          {data.patronymic}
        </Descriptions.Item>
        <Descriptions.Item
            label={'Пол'}
        >
          {data.gender}
        </Descriptions.Item>
        <Descriptions.Item
            label={'Дата рождения'}
        >
          {data.birth_date.toString()}
        </Descriptions.Item>
        {data?.dod && (
          <Descriptions.Item label={'Дата смерти'}>
            {data.dod?.toString()}
          </Descriptions.Item>
        )}
        <Descriptions.Item
            label={'Телефон'}
        >
          {data.phone}
        </Descriptions.Item>
        <Descriptions.Item
            label={'Место жительства'}
        >
          {data.location}
        </Descriptions.Item>
        <Descriptions.Item
            label={'Район'}
        >
          {data.district}
        </Descriptions.Item>
        <Descriptions.Item
            label={'Адрес'}
            span={2}
        >
          {data.address}
        </Descriptions.Item>
        <Descriptions.Item
            label={'Поликлиника'}
        >
          {data.clinic}
        </Descriptions.Item>
        <Descriptions.Item
            style={{ width: 350 }}
            label={'Направивший врач'}
        >
          {data.referring_doctor || 'Нет'}
        </Descriptions.Item>
        <Descriptions.Item
            label={'Направившее учреждение'}
            span={2}
        >
          {data.referring_clinic_organization || 'Нет'}
        </Descriptions.Item>
        <Descriptions.Item
            style={{ width: 300 }}
            label={'Категория инвалидности'}
        >
          {data.disability}
        </Descriptions.Item>
        <Descriptions.Item
            label={'Льготное обеспечение препаратами'}
            span={3}
        >
          {data.lgota_drugs}
        </Descriptions.Item>
        <Descriptions.Item
            label={'Госпитализации'}
            span={data.has_hospitalization ? 1 : 4}
        >
          {data.has_hospitalization ? 'Да' : 'Нет'}
        </Descriptions.Item>
        {data.has_hospitalization && (
            <>
              <Descriptions.Item
                  label={'Количество госпитализаций'}
              >
                {data.count_hospitalization}
              </Descriptions.Item>
              <Descriptions.Item
                  label={'Дата последней госпитализации'}
                  span={2}
              >
                {data.last_hospitalization_date?.toString()}
              </Descriptions.Item>
            </>
        )}
        <Descriptions.Item
            label={'Примечание'}
            span={4}
        >
          {data.patient_note}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default PatientDisplay;