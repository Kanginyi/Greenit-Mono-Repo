import {createSlice} from "@reduxjs/toolkit";

const initialState = {
   value: []
};

export const blogDataSlice = createSlice({
   name: "blogData",
   initialState,
   reducers: {
      setBlogData: (state, action) => {
         state.value = action.payload;
      }
   }
});

export const {setBlogData} = blogDataSlice.actions;

export default blogDataSlice.reducer;