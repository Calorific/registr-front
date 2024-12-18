import React, { ReactNode } from 'react';
import { SideBar } from '@/widgets/SideBar';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex gap-x-[42px] pl-[16px] max-w-[1728px] mx-auto">
      <SideBar />

      <main className="pr-[42px] grow-[1] pb-[16px]">
        {children}
      </main>
    </div>
  );
};

export default Layout;