import { INavItem } from '@/widgets/SideBar/model/INavItem';
import { AppointmentsIcon, HelpIcon, HosipitalizationsIcon, PatientsIcon, StatisticIcon } from '@/shared/icons';


export const navRoutes: INavItem[] =  [
  { href: `/patients`, Icon: PatientsIcon, name: `Пациенты` },
  { href: `/appointments`, Icon: AppointmentsIcon, name: `Приемы` },
  // { href: `/hospitalizations`, Icon: HosipitalizationsIcon, name: `Госпитализации` },
  // { href: `/statistics`, Icon: StatisticIcon, name: `Статистика` },
  // { href: `/help`, Icon: HelpIcon, name: `Помощь` },
];