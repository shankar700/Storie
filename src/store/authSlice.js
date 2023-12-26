import { createSlice } from "@reduxjs/toolkit";

// initial state for the slice
const initialState = {
  status: false,
  userData: null,
};

// createSlice takes three params, name(sliceName), initalState and reducer functions
const authSlice = createSlice({
  name: "auth",
  initialState,
  // reducer functions are called "actions" and they have access to "state" and "action" from where we can get payload
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      (state.status = false), (state.userData = null);
    },
  },
});

  // actions have to exported individually, these actions are automatically created by createSlice method
export const { login, logout } = authSlice.actions;
// eventhough it's declared as reducers in the slice, it is accessed by <sliceName>."reducer"
export default authSlice.reducer;
