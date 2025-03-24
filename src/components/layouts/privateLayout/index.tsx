"use client";
import React, { ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import useAuth from '@/services/useAuth';
import Loading from '@/components/common/loading';
import UserLayout from '../userLayout';
import BaseLayout from '../baseLayout';
import PanelLayout from '../panelLayout';

function PrivateLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading, data } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const page = pathname.split('/')[1];
  const privatePages = ['user', 'panel'];
  const privateNotAllowedPages = ['login', 'register', ''];
  React.useEffect(() => {

    if (!isLoading) {
      if (!isAuthenticated) {
        if (privatePages.includes(page)) {
          router.push('/');
        }
      } else {
        if (page === 'panel' && !data?.response?.user?.admin) {
          router.push('/user');
        } else if (privateNotAllowedPages.includes(page)) {
          router.push('/user');
        }
      }

    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return <div className={'flex justify-center items-center h-[100vh]'}><Loading dimention={'40px'} /></div>
  }
  if (!isAuthenticated && privatePages.includes(page)) return <></>;
  if (isAuthenticated && privateNotAllowedPages.includes(page)) return <></>;
  if (isAuthenticated && page === 'panel' && !data?.response?.user?.admin) return <></>;
  if (page === 'panel' && data?.response?.user?.admin && isAuthenticated) return <PanelLayout>{children}</PanelLayout>
  return isAuthenticated ? <UserLayout>{children}</UserLayout> : <BaseLayout>{children}</BaseLayout>;
};

export default PrivateLayout;
