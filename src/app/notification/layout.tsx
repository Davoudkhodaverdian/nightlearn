"use client"
import BaseLayout from '@/components/layouts/baseLayout'

export default function RootBaseLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (<BaseLayout>{children}</BaseLayout>)
}
