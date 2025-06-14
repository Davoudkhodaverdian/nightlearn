import React, { useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

interface Props {
    countPage: number
    pageTopRef: React.RefObject<HTMLDivElement | null>
}
// Pagination Component
const PaginationCmp: React.FC<Props> = ({ countPage, pageTopRef }) => {

    const searchParams = useSearchParams();
    const page = parseInt(searchParams.get("page") || "1");
    const rowsPerPage = parseInt(searchParams.get("per-page") || "10");
    const router = useRouter();
    const pathname = usePathname();
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', value?.toString());
        params.set('per-page', rowsPerPage?.toString());
        router.push(pathname + '?' + params, { scroll: false });
    };
    useEffect(() => {
        if (pageTopRef?.current) pageTopRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }, [page]);
    return (
        <div className='p-3 flex'>
            <Pagination shape="rounded" dir="ltr"
                count={countPage} page={page} onChange={handleChange} />
        </div>
    );
}
export default PaginationCmp;