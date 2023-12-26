import { configureStore } from "@reduxjs/toolkit";
// here we are accessing authSlice.reducer from ./authSlice
import authReducer from "./authSlice"

const store = configureStore({
    reducer:{
        authReducer
    }
})

export default store