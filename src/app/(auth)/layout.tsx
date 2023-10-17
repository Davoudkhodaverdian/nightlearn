import BaseLayout from "@/components/layouts/baseLayout"

export default function RootAuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <BaseLayout>{children}</BaseLayout>
  )
}
