'use client';
import React, { useState } from 'react';
import { Button, DatePicker, Space } from 'antd';
import buttonStyles from '@/shared/ui/Buttons/Button.module.css';
import { SearchOutlined } from '@ant-design/icons';
import { FilterDropdownProps } from 'antd/es/table/interface';
import { Dayjs } from 'dayjs';

const DateTableFilter = (props: FilterDropdownProps) => {
  const { RangePicker } = DatePicker;
  const [date, setDate] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
  return (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <RangePicker
            format={'DD.MM.YYYY'}
            placeholder={['Дата с', 'Дата по']}
            allowEmpty={[false, true]}
            value={date}
            onChange={(dates, dateString) => {
              props.setSelectedKeys(dateString);
              setDate(dates || [null, null]);
            }}
            style={{ marginBottom: 8, display: 'flex' }}
        />
        <Space>
          <Button
              className={buttonStyles.button}
              type="primary"
              onClick={() => props.confirm()}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
              className={buttonStyles.button}
              onClick={() => {
                if (props.clearFilters) {
                  props.clearFilters();
                }
                setDate([null, null]);
                props.confirm({ closeDropdown: false });
              }}
              size="small"
              style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
              type="link"
              size="small"
              onClick={() => {
                props.close();
              }}
          >
            close
          </Button>
        </Space>
      </div>
  );
};

export default DateTableFilter;