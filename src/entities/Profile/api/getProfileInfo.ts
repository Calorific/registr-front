import { IProfileInfo } from '@/entities/Profile/model/IProfileInfo';
import defaultUserImage from '@/shared/images/defaultuser.jpg';

export function getProfileInfo(): IProfileInfo {
  //Запрос на сервер
  const profileInfo = {
    avatar: defaultUserImage,
    fullName: 'Константин Лукин',
    jobTitle: 'Врач кардиолог',
  };
  return profileInfo;
}