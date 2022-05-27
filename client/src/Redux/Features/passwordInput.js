import {createSlice} from "@reduxjs/toolkit";

const initialState = {
   value: "password"
};

export const passwordInputSlice = createSlice({
   name: "passwordInput",
   initialState,
   reducers: {
      showPassword: (state, action) => {
         state.value = action.payload;
      }
   }
});

export const {showPassword} = passwordInputSlice.actions;

export default passwordInputSlice.reducer;