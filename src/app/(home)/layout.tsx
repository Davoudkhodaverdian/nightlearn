"use client"
import BaseLayout from '@/components/layouts/baseLayout'
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
  console.log("Home layout");
  useEffect(() => {
    if (!isLoading && data) router.push("/user");
  }, [isLoading, error, data]);
  if (!isLoading && data) return <></>;
  return (
    <div>
      <div className={!isLoading ? 'hidden' : 'flex justify-center items-center h-[100vh]'}>
        <div><Loading dimention={'40px'} /></div>
      </div>
      <div className={isLoading ? 'hidden' : ''}>
        {<BaseLayout>{children}</BaseLayout>}
      </div>
    </div>

  )
}
