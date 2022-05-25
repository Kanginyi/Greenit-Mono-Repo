import {createSlice} from "@reduxjs/toolkit";

const initialState = {
   value: false
};

export const booleanSlice = createSlice({
   name: "boolean",
   initialState,
   reducers: {
      trueFalse: (state, action) => {
         state.value = action.payload;
      }
   }
});

export const {trueFalse} = booleanSlice.actions;

export default booleanSlice.reducer;