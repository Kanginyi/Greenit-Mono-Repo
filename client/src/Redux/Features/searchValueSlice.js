import {createSlice} from "@reduxjs/toolkit";

const initialState = {
   value: ""
}

export const searchValueSlice = createSlice({
   name: "searchValue",
   initialState,
   reducers: {
      setSearchValue: (state, action) => {
         state.value = action.payload;
      }
   }
});

export const {setSearchValue} = searchValueSlice.actions;

export default searchValueSlice.reducer;