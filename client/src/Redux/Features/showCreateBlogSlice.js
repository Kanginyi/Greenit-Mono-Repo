import {createSlice} from "@reduxjs/toolkit";

const initialState = {
   value: false
};

export const showCreateBlogSlice = createSlice({
   name: "showCreateBlog",
   initialState,
   reducers: {
      setShowCreateBlog: (state, action) => {
         state.value = action.payload;
      }
   }
});

export const {setShowCreateBlog} = showCreateBlogSlice.actions;

export default showCreateBlogSlice.reducer;