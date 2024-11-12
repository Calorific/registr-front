import React, { FC, memo } from 'react';
import { Card, Col, Row } from 'antd';
import { Field } from '@/pages_/appointments/Details/Field';

interface PatientCardProps {
  data: any;
}

const _PatientCard: FC<PatientCardProps> = ({ data }) => {

  return (
    <Card
      title="Карточка пациента"
      // extra={<EditButton id={data.id} />}
    >
      <Row gutter={[0, 14]}>
        <Col span={8}>
          <Field name="ФИО" value={`${data.name ?? ''} ${data.last_name ?? ''} ${data.patronymic ?? ''}`} />
        </Col>
        <Col span={4}>
          <Field name="Дата рождения" value={data.birth_date} />
        </Col>
        <Col span={4}>
          {data.dod && <Field name="Дата смерти" value={data.dod ?? '-'} />}
        </Col>
        <Col span={8}>
          <Field name="Госпитализации" value={data.count_hospitalization} />
        </Col>
        <Col span={8}>
          <Field name="Место жительства" value={data.location} />
        </Col>
        <Col span={8}>
          <Field name="Пол" value={data.gender} />
        </Col>
        <Col span={8}>
          <Field name="Дата последней госпитализации" value={data.last_hospitalization_date} />
        </Col>
        <Col span={8}>
          <Field name="Адрес" value={data.address} />
        </Col>
        <Col span={8}>
          <Field name="Инвалидность" value={data.disability} />
        </Col>
        <Col span={8}>
          <Field name="Направивший врач" value={data.referring_doctor} />
        </Col>
        <Col span={8}>
          <Field name="Телефон" value={data.phone} />
        </Col>
        <Col span={8}>
          <Field name="Льготное лекарственное обеспечение (ЛЛО)" value={data.lgota_drugs} />
        </Col>
        <Col span={8}>
          <Field name="Направившая мед. орг." value={data.referring_clinic_organization} />
        </Col>
        <Col span={8}>
          <Field name="Поликлиника" value={data.clinic} />
        </Col>
      </Row>
    </Card>
  );
}

export const PatientCard = memo(_PatientCard);
