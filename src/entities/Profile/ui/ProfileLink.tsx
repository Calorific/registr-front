'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { IProfileInfo } from '@/entities/Profile/model/IProfileInfo';
import { getProfileInfo } from '@/entities/Profile/api/getProfileInfo';
import styles from './ProfileLink.module.css';

const ProfileLink = () => {
  const [profileInfo, setProfileInfo] = useState<IProfileInfo>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    setProfileInfo(getProfileInfo());
    setIsLoading(false);
  }, []);
  return (
      <a className={styles.profileLink}>
        {isLoading
            ? (<div style={{ width: 42, height: 42 }} className={styles.avatar}></div>)
            : (<Image className={styles.avatar} src={profileInfo?.avatar || ''} alt="Avatar" width={42} height={42} />)
        }
        <div>
          <p className={styles.fullName}>{isLoading ? 'Loading...' : profileInfo?.fullName}</p>
          <p className={styles.jobTitle}>{isLoading ? 'Loading...' : profileInfo?.jobTitle}</p>
        </div>
      </a>
  );
};

export default ProfileLink;