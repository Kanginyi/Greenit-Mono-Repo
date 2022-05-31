import {createSlice} from "@reduxjs/toolkit";

const initialState = {
   value: false
};

export const showSignupSlice = createSlice({
   name: "showSignup",
   initialState,
   reducers: {
      setShowSignup: (state, action) => {
         state.value = action.payload;
      }
   }
});

export const {setShowSignup} = showSignupSlice.actions;

export default showSignupSlice.reducer;