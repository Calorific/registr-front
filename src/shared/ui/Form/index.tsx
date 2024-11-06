export const PhoneMask = '+7 000 000 00 00';

export const formatInteger = (value: any, prev: any) => {
  return Math.round(+((value ?? prev)?.toString()?.replaceAll?.(',', '.') ?? '0')).toString();
}