import ProfileLink from '@/entities/Profile/ui/ProfileLink';
import LogoutButton from '@/entities/Session/ui/LogoutButton';
import styles from './SideBar.module.css';
import SettingsButton from '@/features/Settings/ui/SettingsButton';
import dynamic from 'next/dynamic';

const SideBar = () => {
  const NavBar = dynamic(() => import('@/widgets/SideBar/ui/NavBar'), { ssr: false });
  const ProfileLink = dynamic(() => import('@/entities/Profile/ui/ProfileLink'), { ssr: false });
  const LogoutButton = dynamic(() => import('@/entities/Session/ui/LogoutButton'), { ssr: false });
  const SettingsButton = dynamic(() => import('@/features/Settings/ui/SettingsButton'), { ssr: false });
  return (
      <aside className={styles.sideBar}>
        <NavBar />
        <nav className={styles.bottomNav}>
          <ul className={styles.ul}>
            <li className={styles.li}>
              <ProfileLink />
            </li>
            <li className={styles.li}>
              <SettingsButton />
            </li>
            <li className={styles.li}>
              <LogoutButton />
            </li>
          </ul>
        </nav>
      </aside>
  );
};

export default SideBar;