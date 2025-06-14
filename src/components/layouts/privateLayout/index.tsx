"use client";
import React, { ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import useAuth from '@/services/useAuth';
// import Loading from '@/components/common/loading';
import BaseLayout from '../baseLayout';
import PanelLayout from '../panelLayout';
import { UserRole } from '@/services/models/userRole';

function PrivateLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading, data } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const page = pathname.split('/')[1];
  const privatePages = ['panel'];
  const privateNotAllowedPages = ['login', 'register'];
  React.useEffect(() => {

    if (!isLoading) {
      if (!isAuthenticated) {
        if (privatePages.includes(page)) {
          router.push('/');
        }
      } else {
        if (page === 'panel' && !(data?.response?.user?.roles.includes(UserRole.Admin))) {
          router.push('/');
        } else if (privateNotAllowedPages.includes(page)) {
          router.push('/');
        }
      }

    }
  }, [isLoading]);

  React.useEffect(() => {

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js', {
        scope: '/',
        updateViaCache: 'none',
      })
        .then((registration) => console.log('registration is successfully', registration))
        .catch(err => console.log(err))

    };

  }, []);
  
  // if (isLoading) {
  //   return <div className={'flex justify-center items-center h-[100vh]'}><Loading dimention={'40px'} /></div>
  // }
  if (!isAuthenticated && privatePages.includes(page)) return <></>;
  if (isAuthenticated && privateNotAllowedPages.includes(page)) return <></>;
  if (isAuthenticated && page === 'panel' && !(data?.response?.user?.roles.includes(UserRole.Admin))) return <></>;
  if (page === 'panel' && (data?.response?.user?.roles.includes(UserRole.Admin)) && isAuthenticated) return <PanelLayout>{children}</PanelLayout>
  return (<BaseLayout>{children}</BaseLayout>);
};

export default PrivateLayout;
