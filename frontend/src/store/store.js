import {configureStore} from '@reduxjs/toolkit'
import UserDataReducer from './UserDataReducer'
import PolygonsReducer from './PolygonsReducer'
import AdminReducer from './AdminReducer'

export const store = configureStore({
    reducer: {
        UserData: UserDataReducer,
        Polygons: PolygonsReducer,
        Admin: AdminReducer,
    },
})