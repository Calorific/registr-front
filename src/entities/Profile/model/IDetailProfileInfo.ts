import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export interface IDetailProfileInfo {
  avatar: string | StaticImport,
  fullName: string,
  jobTitle: string,
  phoneNumber: string, //поменять на phone
  mail: string
}