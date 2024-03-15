'use client'
import PanelLayout from '@/components/layouts/panelLayout'
import Loading from '@/components/loading';
import useAuth from '@/services/useAuth';
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';

export default function RootBaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { data, isLoading, error } = useAuth();
  console.log({ data, isLoading, error });
  
  useEffect(() => {
    if (!isLoading && error) router.push("/");
  }, [isLoading, error]);

  if (!isLoading && error) return <></>;
  return (
    <div>
      <div className={!isLoading ? 'hidden' : 'flex justify-center items-center h-[100vh]'}>
        <div><Loading dimention={'40px'} /></div>
      </div>
      <div className={isLoading ? 'hidden' : ''}>
        <PanelLayout>{children}</PanelLayout>
      </div>
    </div>
  )
}
