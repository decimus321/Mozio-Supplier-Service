import {createSlice} from '@reduxjs/toolkit'

const initialState = {}

export const AdminReducer = createSlice({
    name: 'Admin',
    initialState,
    reducers: {
        setCode: (state, action) => {
            return action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {setCode} = AdminReducer.actions

export default AdminReducer.reducer