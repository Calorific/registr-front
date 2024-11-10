import React, { FC, memo, useMemo } from 'react';
import { Col, Row, Table } from 'antd';
import { Field } from '@/pages_/appointments/Details/Field';
import { IBooleanTextFields } from '@/entities/Appointment/model/IFormDataFields';
import { Empty } from '@/shared/ui/Empty';

interface DiagnoseCardProps {
  data: any;
  fields: IBooleanTextFields[];
}

const columns = [
  {
    title: 'Сопутствующее заболевание',
    dataIndex: 'name',
    width: '35%',
  },
  {
    title: 'Примечание',
    dataIndex: 'note',
    width: '65%',
  },
];

const locale = {
  emptyText: <Empty />,
};

const _DiagnoseShow: FC<DiagnoseCardProps> = ({ data, fields }) => {

  const dataSource = useMemo(() => {
    const res: { name: string; note: string }[] = [];

    fields.forEach(field => {
      if (data?.[field.booleanName]) {
        res.push({ name: field.displayName, note: data[field.textName] ?? '-', });
      }
    })

    return res;
  }, [data, fields]);

  if (!data) {
    return <Empty />;
  }

  return (
    <Row gutter={[0, 24]}>
      <Col span={24}>
        <Field name="Диагноз" value={data.diagnose} />
      </Col>

      <Col span={8}>
        <Row gutter={[24, 5]}>
          <Col span={24}>
            <Field name="Фракция выброса" value={data.classification_adjacent_release} />
          </Col>

          <Col span={12}>
            <Field name="Функциональный класс" value={data.classification_func_classes} />
          </Col>
          <Col span={12}>
            <Field name="Стадия НК" value={data.classification_nc_stage} />
          </Col>
        </Row>
      </Col>

      <Col span={16}>
        <Table bordered locale={locale} pagination={false} dataSource={dataSource} columns={columns} />
      </Col>
    </Row>
  );
}

export const DiagnoseShow = memo(_DiagnoseShow);
