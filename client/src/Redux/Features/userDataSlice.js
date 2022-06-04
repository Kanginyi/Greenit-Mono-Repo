import {createSlice} from "@reduxjs/toolkit";

const initialState = {
   value: []
};

export const userDataSlice = createSlice({
   name: "userData",
   initialState,
   reducers: {
   setUserData: (state, action) => {
      state.value = action.payload;
   }
   }
});

export const {setBlogData} = userDataSlice.actions;

export default userDataSlice.reducer;