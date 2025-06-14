"use client"

import PrivateLayout from '@/components/layouts/privateLayout';
import { Provider } from 'react-redux'
import { store } from '@/services/store'
import ToastMui from '@/components/common/toastMui';

export default function RootBaseLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <Provider store={store}>
      <PrivateLayout>
        <ToastMui />
        {children}
      </PrivateLayout>
    </Provider>
  )
}
