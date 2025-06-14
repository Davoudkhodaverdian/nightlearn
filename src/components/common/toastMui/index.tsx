/* this file added by Bearer Web Developer  */
import React from 'react';
import styles from './toastMui.module.scss';
import { Snackbar } from '@mui/material';
import { handleToastClose } from '@/services/store/toast/actions';
import { useAppSelector } from '@/services/store/hooks';


const ToastMui: React.FC = () => {

    const toast = useAppSelector(state => state?.toast);
    const handleCloseFunction = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') return;
        handleToastClose();
    };

    return (
        <>
            <Snackbar
                open={toast?.open}
                autoHideDuration={3000}
                // autoHideDuration={null}
                onClose={handleCloseFunction}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <div className={styles.toast_mui}>
                    <p>{toast?.text}</p>
    
                    <button className={styles.close}>
                        <img src="/images/close-gray.svg" alt="" width={16} height={16} onClick={handleCloseFunction} />
                    </button>
                </div>
            </Snackbar>
        </>
    );
};

export default ToastMui;
