'use client'
import PanelLayout from '@/components/layouts/panelLayout'
import Loading from '@/components/loading';
import { useLoginUserMutation } from '@/services/api';
import useAuth from '@/services/useAuth';

export default function RootBaseLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const { data, isLoading, error } = useAuth();
  console.log({ data, isLoading, error });
  return (
    <div>
      <div className={!isLoading ? 'hidden' : 'flex justify-center items-center h-[100vh]'}>
        <div><Loading dimention={'40px'}/></div>
      </div>
      <div className={isLoading ? 'hidden' : ''}>
        <PanelLayout>{children}</PanelLayout>
      </div>
    </div>
  )
}
