import React from 'react';
import { Button, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { FilterDropdownProps } from 'antd/es/table/interface';
import buttonStyles from '@/shared/ui/Buttons/Button.module.css';

const IntervalTableFilter = (props: FilterDropdownProps) => {
  return (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
            value={props.selectedKeys[0]}
            onChange={(e) => props.setSelectedKeys(e.target.value ? [e.target.value, props.selectedKeys[1]] : [0, props.selectedKeys[1]])}
            style={{ marginBottom: 8, display: 'block' }}
        />
        <Input
            value={props.selectedKeys[0]}
            onChange={(e) => props.setSelectedKeys(e.target.value ? [props.selectedKeys[0], e.target.value] : [props.selectedKeys[0], 150])}
            style={{ marginBottom: 8, display: 'block' }}
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

export default IntervalTableFilter;