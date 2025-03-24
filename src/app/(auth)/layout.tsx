"use client"
import PrivateLayout from '@/components/layouts/privateLayout';
import { Provider } from 'react-redux'
import { store } from '@/services/store'
export default function RootBaseLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <Provider store={store}>
      <PrivateLayout>
        {children}
      </PrivateLayout>
    </Provider>
  )
}
