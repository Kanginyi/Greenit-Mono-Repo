import {configureStore} from "@reduxjs/toolkit";

import currentUserReducer from "./Features/currentUserSlice";
import searchValueReducer from "./Features/searchValueSlice";

import booleanReducer from "./Features/booleanSlice";

export default configureStore({
   reducer: {
      currentUser: currentUserReducer,
      searchValue: searchValueReducer,

      boolean: booleanReducer,
   }
});