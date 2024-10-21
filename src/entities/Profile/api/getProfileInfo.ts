import { IProfileInfo } from '@/entities/Profile/model/IProfileInfo';
import defaultUserImage from '@/shared/images/doctor.png';

export function getProfileInfo(): IProfileInfo {
  //Запрос на сервер
  return {
    avatar: defaultUserImage,
    fullName: 'Константин Лукин',
    jobTitle: 'Врач кардиолог',
  };
}