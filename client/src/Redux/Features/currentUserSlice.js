import {createSlice} from "@reduxjs/toolkit";

const initialState = {
   value: null
};

export const currentUserSlice = createSlice({
   name: "currentUser",
   initialState,
   reducers: {
      setCurrentUser: (state, action) => {
         state.value = action.payload;
      }
   }
});

export const {setCurrentUser} = currentUserSlice.actions;

export default currentUserSlice.reducer;