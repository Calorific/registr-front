import { IColumn } from '@/shared/types/IColumn';
import React from 'react';
import searchTableFilter from '@/shared/lib/TableFilters/searchTableFilter';
import dateTableFilter from '@/shared/lib/TableFilters/dateTableFilter';
import numberBetweenTableFilter from '@/shared/lib/TableFilters/intervalTableFilter';

export const PatientColumns: IColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 1,
    dataType: 'string',
    sorter: true,
    width: 200,
  },
  {
    title: 'ФИО',
    dataIndex: 'full_name',
    key: 2,
    dataType: 'string',
    sorter: true,
    width: 200,
  },
  {
    title: 'Пол',
    dataIndex: 'gender',
    key: 3,
    dataType: 'boolean',
    sorter: false,
    filters: [
      { text: 'М', value: 'М' },
      { text: 'Ж', value: 'Ж' },
    ],
    width: 70,
  },
  {
    title: 'Возраст',
    dataIndex: 'age',
    key: 4,
    dataType: 'string',
    filterDropdown: numberBetweenTableFilter,
    sorter: true,
    width: 110,
  },
  {
    title: 'Дата рождения',
    dataIndex: 'birth_date',
    key: 5,
    dataType: 'date',
    filterDropdown: dateTableFilter,
    sorter: true,
    render(data: Date): React.ReactNode {
      return `${data}`;
    },
    width: 130,
  },
  {
    title: 'Дата смерти',
    dataIndex: 'dod',
    key: 6,
    dataType: 'date',
    filterDropdown: dateTableFilter,
    sorter: false,
    render(data: any): React.ReactNode {
      return `${data || ''}`;
    },
    width: 150,
  },
  {
    title: 'Место жительства',
    dataIndex: 'location',
    key: 7,
    dataType: 'string',
    filters: [
      { text: 'НСО', value: 'НСО' },
      { text: 'Новосиюирск', value: 'Новосибирск' },
      { text: 'другое', value: 'другое' },
    ],
    sorter: false,
    width: 130,
  },
  {
    title: 'Район',
    dataIndex: 'district',
    key: 8,
    dataType: 'string',
    sorter: false,
    width: 130,
  },
  {
    title: 'Адрес',
    dataIndex: 'address',
    key: 9,
    dataType: 'address',
    sorter: false,
    width: 300,
  },
  {
    title: 'Телефон',
    dataIndex: 'phone',
    key: 10,
    dataType: 'phone',
    sorter: false,
    width: 120,
  },
  {
    title: 'Поликлиника',
    dataIndex: 'clinic',
    key: 11,
    dataType: 'string',
    sorter: false,
    width: 150,
  },
  {
    title: 'Примечание',
    dataIndex: 'patient_note',
    key: 12,
    dataType: 'string',
    sorter: false,
    width: 150,
  },
  {
    title: 'Направивший врач',
    dataIndex: 'referring_doctor',
    key: 12,
    dataType: 'string',
    filterDropdown: searchTableFilter,
    sorter: false,
    width: 200,
  },
  {
    title: 'Направившая мед. организация',
    dataIndex: 'referring_clinic_organization',
    key: 13,
    dataType: 'string',
    filterDropdown: searchTableFilter,
    sorter: false,
    width: 160,
  },
  {
    title: 'Категория инвалидности',
    dataIndex: 'disability',
    key: 14,
    dataType: 'string',
    filters: [
      { text: 'нет', value: 'нет' },
      { text: 'I', value: 'I' },
      { text: 'II', value: 'II' },
      { text: 'III', value: 'III' },
      { text: 'отказ', value: 'отказ' },
    ],
    sorter: false,
    width: 160,
  },
  {
    title: 'Льготное обеспечение препаратами',
    dataIndex: 'lgota_drugs',
    key: 15,
    dataType: 'string',
    filters: [
      { text: 'нет', value: 'нет' },
      { text: 'да', value: 'да' },
      { text: 'ССЗ', value: 'ССЗ' },
    ],
    sorter: false,
    width: 130,
  },
  {
    title: 'Госпитализации',
    dataIndex: 'has_hospitalization',
    key: 16,
    dataType: 'boolean',
    filters: [
      { text: 'Да', value: 'true' },
      { text: 'Нет', value: 'false' },
    ],
    sorter: false,
    render(data: any): React.ReactNode {
      return data ? 'Да' : 'Нет';
    },
    width: 140,
  },
  {
    title: 'Количество госпитализаций',
    dataIndex: 'count_hospitalization',
    key: 17,
    dataType: 'string',
    filterDropdown: searchTableFilter,
    sorter: false,
    width: 150,
  },
  {
    title: 'Дата последней госпитализации',
    dataIndex: 'last_hospitalization_date',
    key: 18,
    dataType: 'date',
    filterDropdown: dateTableFilter,
    sorter: true,
    render(data: Date): React.ReactNode {
      return `${data || ''}`;
    },
    width: 180,
  },

];