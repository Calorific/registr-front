import React, { FC, memo } from 'react';
import { Empty as AntdEmpty } from 'antd';

interface EmptyProps {
  className?: string;
}

const _Empty: FC<EmptyProps> = ({ className }) => {

  return <AntdEmpty className={className} description="Нет данных" />;
}

export const Empty = memo(_Empty);
