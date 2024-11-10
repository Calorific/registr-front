import React, { FC, memo, useMemo } from 'react';
import { Empty } from '@/shared/ui/Empty';
import { Table } from 'antd';

interface EkgShowProps {
  data: any;
}

const columns = [
  {
    title: 'Лекарственная группа',
    dataIndex: 'name',
    width: '21%',
  },
  {
    title: 'Лекарственный препарат',
    dataIndex: 'drug',
    width: '25%',
  },
  {
    title: 'Дозировка (мг)',
    dataIndex: 'dose',
    width: '15%',
  },
  {
    title: 'Примечание',
    dataIndex: 'note',
    width: '40%',
  },
];

const locale = {
  emptyText: <Empty />,
};

const _DrugTherapyShow: FC<EkgShowProps> = ({ data, }) => {
  const dataSource = useMemo(() => {
    return (data ?? []).map((item: any) => ({
      name: item.drug?.drug_group_name ?? '-',
      drug: item.drug?.name ?? '-',
      dose: item.dosa ?? '-',
      note: item.note ?? '-',
    }));
  }, [data]);

  if (!data) {
    return <Empty />
  }

  return (
    <Table bordered locale={locale} columns={columns} dataSource={dataSource} pagination={false} rowKey="name" />
  );
}

export const DrugTherapyShow = memo(_DrugTherapyShow);
