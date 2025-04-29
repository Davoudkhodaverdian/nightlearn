import { ReactNode } from "react";
import Menu from "./menu";
import Footer from "./footer";
import useAuth from "@/services/useAuth";
import Link from "next/link";
import pagesData from './pages.json';
import { usePathname } from "next/navigation";
export default function PanelLayout({ children }: { children: ReactNode }) {
  const { data } = useAuth();
  const pathname = usePathname();
  console.log({ pathname })
  return (
    <>
      <Menu />
      <main>
        <div className="flex">
          <div className="bg-[#0c056d] p-4 text-white">
            <h1>صفحه ادمین پنل</h1>
            <p className='py-3'>{data?.response?.user?.firstname} {data?.response?.user?.lastname}  خوش آمدید</p>
            <ul>
              {pagesData.map(page => (
                <li key={page?.id} className={pathname === page?.href ? 'bg-[#4841a8] rounded-sm' : ''}>
                  <Link className='p-2 block ' href={page?.href}>{page?.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            {children}
          </div>
        </div>

      </main>
      <Footer />
    </>

  )
}
