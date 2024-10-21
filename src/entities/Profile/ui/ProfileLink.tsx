'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { IProfileInfo } from '@/entities/Profile/model/IProfileInfo';
import { getProfileInfo } from '@/entities/Profile/api/getProfileInfo';

export const ProfileLink = () => {
  const [profileInfo, setProfileInfo] = useState<IProfileInfo>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setProfileInfo(getProfileInfo());
    setIsLoading(false);
  }, []);

  return (
    <li className="flex gap-x-[12px] items-center mb-[24px]">
      <div className="w-[52px] h-[52px] rounded-full bg-gray overflow-hidden">
        {!isLoading && (
          <Image className="w-full h-full" src={profileInfo?.avatar || '/no-image'} alt="Аватар" width={52} height={52} />
        )}
      </div>

      <div>
        <p className="text-[16px] font-semibold mb-[4px]">
          {isLoading ? 'Загрузка...' : profileInfo?.fullName}
        </p>
        <p className="bg-blue px-[14px] py-[4px] rounded-full text-white min-w-[154px] text-center">
          {isLoading ? 'Загрузка...' : profileInfo?.jobTitle}
        </p>
      </div>
    </li>
  );
};

export default ProfileLink;