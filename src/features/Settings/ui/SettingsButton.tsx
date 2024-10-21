'use client';
import React, { useState } from 'react';
import { Modal } from 'antd';
import SettingsIcon from '@/shared/icons/SettingsIcon';

export const SettingsButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleOk = () => {
    setIsModalOpen(false);
  };
  
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <li>
      <a className="flex gap-x-[12px] items-center text-[16px] mb-[24px]" onClick={() => setIsModalOpen(true)}>
        <SettingsIcon />
        Настройки
      </a>
      <Modal
        title="Настройки"
        open={isModalOpen}
        cancelText="Отмена"
        okText="Сохранить"
        onCancel={handleCancel}
        onOk={handleOk}
      >

      </Modal>
    </li>
  );
};
