import {createSlice} from '@reduxjs/toolkit'

const initialState = []

export const PolygonsReducer = createSlice({
    name: 'Polygons',
    initialState,
    reducers: {
        addAll: (state, action) => {
            return action.payload
        },
        addOne: (state, {payload}) => {
            return [...state, payload]
        },
        deleteOne: (state, {payload}) => {
            return state.filter(polygon => polygon.id !== payload)
        },
        editOne: (state, {payload}) => {
            const polygon = state.filter(polygon => polygon.id === payload.id)[0]
            polygon.name = payload.name
            polygon.price = payload.price
        }
    },
})

// Action creators are generated for each case reducer function
export const {addAll, addOne, deleteOne, editOne} = PolygonsReducer.actions

export default PolygonsReducer.reducer