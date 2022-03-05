import {createSlice} from '@reduxjs/toolkit'

const getLoginData = JSON.parse(localStorage.getItem("UserData"));
const initialState = getLoginData || {};

export const UserDataReducer = createSlice({
    name: 'UserData',
    initialState,
    reducers: {
        login: (state, action) => {
            localStorage.setItem("UserData", JSON.stringify(action.payload));
            return action.payload
        },
        logout: (state) => {
            localStorage.removeItem("UserData");
            return {};
        },
    },
})

// Action creators are generated for each case reducer function
export const {login, logout} = UserDataReducer.actions

export default UserDataReducer.reducer