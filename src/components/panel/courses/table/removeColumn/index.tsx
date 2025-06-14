
import ConfirmModal from "@/components/common/confirmModal";
import customFetch from "@/services/customFetch";
import { ExtraData } from "@/services/models";
import { CourseData } from "@/services/models/course";
import { courseApi } from "@/services/store/courseApi";
import { useAppDispatch } from "@/services/store/hooks";
import { setToast } from "@/services/store/toast/actions";
import React, { useState } from "react";

interface Props {
    course: CourseData & ExtraData
}
const RemoveColumn: React.FC<Props> = ({ course }) => {

    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const handleClose = () => {
        setOpen(false);
    }
    const submitRemove = async () => {
        console.log(course?._id);
        const result = await customFetch(`courses/delete/${course?._id}`, { method: 'DELETE' });
        console.log(result);
        if (result?.status === 200) {
            // do some thing
            dispatch(courseApi.util.resetApiState());
            setToast({ open: true, text: "دوره آموزشی با موفقیت حذف شد" });
            if (handleClose) handleClose();
        }
    }
    return (
        <>
            <td className="px-6 py-4 text-gray-900">
                <button
                    onClick={() => { setOpen(true); }}
                    className={`cursor-pointer p-3 text-white rounded bg-[#0c056d] px-3 py-2 disabled:cursor-not-allowed disabled:opacity-70`}>
                    <span>حذف</span>
                </button>
            </td>
            {
                open &&
                <ConfirmModal
                    open={open}
                    text={`حذف آیتم ${course?.name}`}
                    description={`آیا از حذف آیتم ${course?.name} اطمینان دارید?`}
                    handleClose={handleClose}
                    handleSubmit={submitRemove}
                />
            }
        </>
    )
}
export default RemoveColumn