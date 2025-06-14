
import Register from '@/components/register';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Register',
  description: 'Register',
}
export default function RegisterPage() {
  return (
    <Register />
  )
}
