import React, { FormEvent, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Loading from '../loading';

interface Props {
    open: boolean
    handleClose: () => void
    handleSubmit: () => Promise<void>
    text: string
    description: string
}

const ConfirmModal: React.FC<Props> = ({ open, handleClose, handleSubmit, text, description }) => {

    const [loading, setLoading] = useState(false)
    const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            setLoading(true);
            await handleSubmit();
            setLoading(false);
            handleClose();
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            disableScrollLock={true}
        >
            <>
                <form onSubmit={submitHandler} className='p-4'>
                    <h4 className='my-3 text-xl'>{text}</h4>
                    <p className='my-3'>{description}</p>
                    <div className='flex gap-2'>
                        <button disabled={loading} className={`flex items-center  cursor-pointer p-3 text-white rounded bg-[#0c056d] px-3 py-2 disabled:cursor-not-allowed disabled:opacity-70`}
                            type="submit">
                            <span>تائید </span>
                            <span>{loading && <Loading />}</span>
                        </button>
                        <button onClick={handleClose} className={`cursor-pointer p-3 text-white rounded bg-[#0c056d] px-3 py-2 disabled:cursor-not-allowed disabled:opacity-70`}
                            type="button">
                            <span>انصراف</span>
                        </button>
                    </div>
                </form>
            </>
        </Dialog>
    )
}

export default ConfirmModal;