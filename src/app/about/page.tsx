
import Link from 'next/link'

export default function About() {
  return (
    <main className="flex  flex-col  justify-between p-24">
      <div>
      about page
      </div>
      <div className='text-blue-700'>
      <Link href="/">{"->"} home</Link>
      </div>
    </main>
  )
}
