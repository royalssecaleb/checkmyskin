import { createSlice } from '@reduxjs/toolkit'

export const Footer = createSlice({
    name: 'footer',
    initialState: {
        value: "user",
    },
    reducers: {
        doctorLoginFooter: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value = "login"
        },
        UserFooter: (state) => {
            state.value = "user"
        },
        DoctorFooter: (state) => {
            state.value = "doctor"
        },
    },
})

// Action creators are generated for each case reducer function
export const { doctorLoginFooter, UserFooter, DoctorFooter } = Footer.actions

export default Footer.reducer