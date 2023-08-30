import AuthLayout from "@/components/layouts/authLayout"

export default function RootAuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthLayout>{children}</AuthLayout>
  )
}
