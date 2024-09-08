import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export interface IProfileInfo {
  avatar: string | StaticImport,
  fullName: string,
  jobTitle: string
}