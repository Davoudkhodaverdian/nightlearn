import Menu from './menu';
import Footer from './footer';
import { ReactNode } from 'react';

export default function UserLayout({ children }: { children: ReactNode }) {

  return (
    <>
      <Menu />
      <main>{children}</main>
      <Footer />
    </>
  )
}
