import Menu from './menu';
import Footer from './footer';
import { ReactNode } from 'react';

export default function BaseLayout({children}: {children: ReactNode}) {
  return (
    <div className="flex  flex-col  justify-between scr">
        <Menu />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
