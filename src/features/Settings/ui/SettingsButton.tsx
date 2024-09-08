'use client';
import React, { useState } from 'react';
import { Modal } from 'antd';
import SettingsIcon from '@/shared/icons/SettingsIcon';
import styles from './SettingsButton.module.css';

const SettingsButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
      <>
        <a className={styles.link} onClick={() => setIsModalOpen(true)}>
          <SettingsIcon />
          <span className={styles.linkText}>Настройки</span>
        </a>
        <Modal
            title={'Настройки'}
            open={isModalOpen}
            cancelText={'Отмена'}
            okText={'Сохранить'}
            onCancel={handleCancel}
            onOk={handleOk}
        >

        </Modal>
      </>
  );
};

export default SettingsButton;