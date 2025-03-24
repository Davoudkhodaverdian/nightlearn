import React from 'react';
import data from '@/components/layouts/panelLayout/pages.json';
import { notFound } from 'next/navigation';
export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode,
  params: Promise<{ slug: string }>
}>) {
  return (<>{children}</>);
}
export async function generateStaticParams() {

  return data.map((page) => ({
    slug: String(page.slug)
  }))
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const page = await getPageData(slug);
  const title = page?.title;
  return {
    title: title,
  }
}
export async function getPageData(slug: string) {

  const page = data?.find(page => page.slug === slug);
  if (!page) notFound();
  return page;
}