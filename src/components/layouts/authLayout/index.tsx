import Menu from './menu';
import Footer from './footer';
import { ReactNode } from 'react';

export default function AuthLayout({children}: {children: ReactNode}) {
  return (
    <div className="flex  flex-col  justify-between">
        <Menu />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
