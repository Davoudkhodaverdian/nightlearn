import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ToastState {
    open: boolean
    text: string
}

const initialState: ToastState = {
    open: false,
    text: ''
}

export const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        setToastReducer: (state, action: PayloadAction<ToastState>) => {
            state = action.payload
            return state;
        },
        handleToastCloseReducer: (state) => {
            state.open = false
        },
    },
})

// Action creators are generated for each case reducer function
export const { setToastReducer, handleToastCloseReducer } = toastSlice.actions

export default toastSlice.reducer