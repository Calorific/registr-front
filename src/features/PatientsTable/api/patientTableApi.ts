import axiosInstance from '@/app/axiosProvider/axiosProvider';
import useSWR from 'swr';
import searchTableFilter from '@/shared/lib/TableFilters/searchTableFilter';
import dateTableFilter from '@/shared/lib/TableFilters/dateTableFilter';
import intervalTableFilter from '@/shared/lib/TableFilters/intervalTableFilter';
import React from 'react';

const getData = async (key: string) => {
  return axiosInstance.get(key).then(res => res.data);
};
export const useGetPatientColumns = () => {
  const { data, error, isLoading } = useSWR('/patients/table/columns', getData);
  const filters = {
    searchTableFilter: searchTableFilter,
    dateTableFilter: dateTableFilter,
    intervalTableFilter: intervalTableFilter,
  };
  data?.forEach((item: any) => {
    if (['searchTableFilter', 'dateTableFilter', 'intervalTableFilter'].includes(item.filter)) {
      // @ts-ignore
      item.filterDropdown = filters[item.filter];
      delete item.filter;
    } else if (item.filter) {
      item.filters = item.filter;
      delete item.filter;
    }
    if (item.dataType == 'boolean') {
      item.render = (data: any): React.ReactNode => {
        return data ? 'Да' : 'Нет';
      };
    }
    if (item.canBeNull) {
      item.render = (data: Date): React.ReactNode => {
        return `${data || ''}`;
      };
    }
  });
  return { data, error, isLoading };
};

export const savePatientTableColumns = async (values: { table_columns: { dataIndex: string, hidden: boolean }[] }) => {
  return axiosInstance.patch('/patients/table/columns', values).then(res => res.data);
};