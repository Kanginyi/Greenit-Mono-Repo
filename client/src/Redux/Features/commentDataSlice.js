import {createSlice} from "@reduxjs/toolkit";

const initialState = {
   value: []
};

export const commentDataSlice = createSlice({
   name: "commentData",
   initialState,
   reducers: {
      setCommentData: (state, action) => {
         state.value = action.payload;
      }
   }
});

export const {setCommentData} = commentDataSlice.actions;

export default commentDataSlice.reducer;