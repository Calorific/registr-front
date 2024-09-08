import React, { ChangeEventHandler, KeyboardEventHandler } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './SearchBar.module.css';

interface props {
  value?: string,
  onChange?: ChangeEventHandler<HTMLInputElement>
  onPressEnter?: KeyboardEventHandler<HTMLInputElement>
}

const SearchBar = ({ value, onChange, onPressEnter }: props) => {
  return (
      <>
        <Input
            className={styles.searchBar}
            prefix={<SearchOutlined />}
            placeholder={'Поиск'}
            allowClear={true}
            value={value}
            onChange={onChange}
            onPressEnter={onPressEnter}
        />
      </>
  );
};

export default SearchBar;