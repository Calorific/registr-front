'use client';
import { usePathname } from 'next/navigation';

export function useActivePath(): (path: string) => boolean {
  const pathname = usePathname();

  const isActivePath = (path: string) => {
    if (!pathname) {
      return false;
    }
    return pathname.startsWith(path);
  };

  return isActivePath;
}