import Menu from './menu';
import Footer from './footer';
import { ReactNode } from 'react';

export default function BaseLayout({ children }: { children: ReactNode }) {

  return (
    <>
      <Menu />
      <main>
        {children}
      </main>
      <Footer />
    </>
  )
}
