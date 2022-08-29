import { configureStore } from "@reduxjs/toolkit";
import { calendarSlice } from "./calendar/calendarSlice";
import { uiSlice } from "./ui/uiSlice";


export const store = configureStore({
    reducer: {
        calendar: calendarSlice.reducer,
        ui: uiSlice.reducer
    },
    // para que no revise si puede serializar las fechas
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})