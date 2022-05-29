import {createSlice} from "@reduxjs/toolkit";

const initialState = {
   value: false
};

export const booleanSlice = createSlice({
   name: "boolean",
   initialState,
   reducers: {
      toggleSearch: state => {
         state.value = !state.value;
      }
   }
});

export const {toggleSearch} = booleanSlice.actions;

export default booleanSlice.reducer;