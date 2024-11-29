'use client';

import { notification, Table } from 'antd';
import { Empty } from '@/shared/ui/Empty';
import { SearchForm } from '@/pages_/appointments/New/SearchForm';
import React, { useState } from 'react';
import useSWR from 'swr';
import axiosInstance from '@/app/axiosProvider/axiosProvider';
import { DEFAULT_TABLE_PAGE_SIZE } from '@/shared/config/tableConfig';
import { useRouter } from 'next/navigation';
import { initAppointment } from '@/entities/Patient/api/initAppointment';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: '6.5%',
  },
  {
    title: 'ФИО',
    dataIndex: 'full_name',
    width: '33%',
  },
  {
    title: 'Дата рождения',
    dataIndex: 'birth_date',
    width: '12.6%',
  },
  {
    title: 'Место жительства',
    dataIndex: 'address',
    width: '31.7%',
  },
  {
    title: 'Телефон',
    dataIndex: 'phone',
    width: '16.2%',
  },
];

const locale = {
  emptyText: <Empty />,
};

const fetcher = async ({ url, search, page }: { url: string; search: any; page: number}) => {
  return await axiosInstance.get(url, {
    params: {
      ...search,
      limit: DEFAULT_TABLE_PAGE_SIZE,
      offset: (page - 1) * DEFAULT_TABLE_PAGE_SIZE,
    }
  }).then(({ data }) => data);
}

export default function AppointmentNewPage() {
  const router = useRouter();
  const [search, setSearch] = useState<any>({});
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);


  const { data, error, isLoading: isDataLoading } = useSWR({
    url: 'patients',
    search,
    page,
  }, fetcher);

  const handleSubmit = (values: any) => {
    const data = Object.keys(values).reduce((acc, key) => values[key] ? ({ ...acc, [key]: encodeURI(values[key]) }) : acc, {});

    setSearch(data);
  }

  const handleSelection = async (record: any) => {
    setLoading(true);

    try {
      const appointmentId = await initAppointment(record.id);
      router.push(`/appointments/${appointmentId}/diagnose`);
    } catch (e: any) {
      notification.error({ message: e.message });
      setLoading(false);
    }
  };

  if (error) {
    return <div>{error?.message ?? 'Что-то пошло не так...'}</div>;
  }

  return (
    <>
     <SearchForm onSubmit={handleSubmit} />

      <Table
        loading={isDataLoading || loading}
        rowKey="id"
        locale={locale}
        dataSource={data?.data ?? []}
        columns={columns}
        pagination={{ total: data?.total ?? 0, onChange: v => setPage(v), pageSize: DEFAULT_TABLE_PAGE_SIZE }}
        className="[&_tbody_tr]:cursor-pointer"
        onRow={(record: { id: string }): any => ({
          onClick: () => handleSelection(record),
        })}
      />
    </>
  );
}