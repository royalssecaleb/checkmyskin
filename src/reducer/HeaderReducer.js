import { createSlice } from '@reduxjs/toolkit'

export const Header = createSlice({
    name: 'header',
    initialState: {
        value: "user",
    },
    reducers: {
        doctorLoginHeader: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value = "login"
        },
        UserHeader: (state) => {
            state.value = "user"
        },
        DoctorHeader: (state) => {
            state.value = "doctor"
        }
    },
})

// Action creators are generated for each case reducer function
export const { doctorLoginHeader, UserHeader, DoctorHeader } = Header.actions

export default Header.reducer