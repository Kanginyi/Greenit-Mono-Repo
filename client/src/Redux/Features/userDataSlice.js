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

export const {setUserData} = userDataSlice.actions;

export default userDataSlice.reducer;