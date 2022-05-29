import {createSlice} from "@reduxjs/toolkit";

const initialState = {
   value: "password"
};

export const passwordInputSlice = createSlice({
   name: "passwordInput",
   initialState,
   reducers: {
      setPasswordInput: (state, action) => {
         state.value = action.payload;
      }
   }
});

export const {setPasswordInput} = passwordInputSlice.actions;

export default passwordInputSlice.reducer;