import { handleToastCloseReducer, setToastReducer, ToastState } from ".."
import { store } from "../.."

export const setToast = (value: ToastState) => { store.dispatch(setToastReducer(value)) }
export const handleToastClose = () => { store.dispatch(handleToastCloseReducer()) }
export const toastActions = {
    setToast, handleToastClose
}

