'use client';

import Navbar from '@/components/Navbar';
import { usePathname } from 'next/navigation';

export default function NavbarWrapper() {
  const pathname = usePathname();
  return pathname !== '/' ? <Navbar /> : null;
}
