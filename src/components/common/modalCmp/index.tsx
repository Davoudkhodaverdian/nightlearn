import React from 'react';
import Dialog from '@mui/material/Dialog';

interface DialogProps {
    open: boolean
    handleClose: () => void
}

interface Props extends DialogProps {
    children: ((props: DialogProps) => React.ReactNode) | React.ReactNode
}

const ModalCmp: React.FC<Props> = ({ children, open, handleClose }) => {

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"

        >
            <>{children}</>
        </Dialog>
    )
}

export default ModalCmp;