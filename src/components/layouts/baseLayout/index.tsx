import Menu from './menu';
import Footer from './footer';
import { ReactNode } from 'react';
import { useLoginUserMutation } from '@/services/api';

export default function BaseLayout({children}: {children: ReactNode}) {
  
  return (
    <div className="flex  flex-col  justify-between">
        <Menu />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
