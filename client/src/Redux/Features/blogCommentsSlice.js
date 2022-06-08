import {createSlice} from "@reduxjs/toolkit";

const initialState = {
   value: []
};

export const blogCommentsSlice = createSlice({
   name: "blogComments",
   initialState,
   reducers: {
      setBlogComments: (state, action) => {
         state.value = action.payload;
      }
   }
});

export const {setBlogComments} = blogCommentsSlice.actions;

export default blogCommentsSlice.reducer;