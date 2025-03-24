import Menu from './menu';
import Footer from './footer';
import { ReactNode, useEffect } from 'react';

export default function BaseLayout({ children }: { children: ReactNode }) {

  useEffect(() => {

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js', {
        scope: '/',
        updateViaCache: 'none',
      })
        .then((registration) => console.log('registration is successfully', registration))
        .catch(err => console.log(err))

    };

  }, [])

  return (
    <>
      <Menu />
      <main>{children}</main>
      <Footer />
    </>
  )
}
