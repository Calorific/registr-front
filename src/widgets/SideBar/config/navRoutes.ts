import { INavItem } from '@/widgets/SideBar/model/INavItem';
import patientsIcon from '@/shared/icons/PatientsIcon';
import appointmentsIcon from '@/shared/icons/AppointmentsIcon';
import hospitalizationsIcon from '@/shared/icons/HospitalizationsIcon';
import statisticsIcon from '@/shared/icons/StatisticsIcon';
import helpIcon from '@/shared/icons/HelpIcon';
import generalDetailsIcon from '@/shared/icons/GeneralDetailsIcon';
import diagnose from '@/shared/icons/DiagnoseIcon';

import labTests from '@/shared/icons/LabTestsIcon';
import complaints from '@/shared/icons/ComplaintsIcon';
import ekg from '@/shared/icons/EkgIcon';
import drugTherapy from '@/shared/icons/DrugTherapyIcon';


export const navRoutes: { general: INavItem[], appointment: INavItem[] } = {
  general: [
    { href: `/patients`, Icon: patientsIcon, name: `Пациенты` },
    { href: `/appointments`, Icon: appointmentsIcon, name: `Приемы` },
    { href: `/hospitalizations`, Icon: hospitalizationsIcon, name: `Госпитализации` },
    { href: `/statistics`, Icon: statisticsIcon, name: `Статистика` },
    { href: `/help`, Icon: helpIcon, name: `Помощь` },
  ],
  appointment: [
    { href: `generalDetails`, Icon: generalDetailsIcon, name: `Общие сведения` },
    { href: `diagnose`, Icon: diagnose, name: `Диагноз` },
    { href: `labTests`, Icon: labTests, name: `Лабораторные тесты` },
    { href: `complaints`, Icon: complaints, name: `Жалобы` },
    { href: `ekg`, Icon: ekg, name: `ЭКГ и ЭХО-КГ` },
    { href: `drugTherapy`, Icon: drugTherapy, name: `Лекарственная терапия` },
  ],
};