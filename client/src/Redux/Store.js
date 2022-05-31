import {configureStore} from "@reduxjs/toolkit";

import currentUserReducer from "./Features/currentUserSlice";
import searchValueReducer from "./Features/searchValueSlice";

import booleanReducer from "./Features/booleanSlice";
import passwordInputReducer from "./Features/passwordInputSlice";


export default configureStore({
   reducer: {
      currentUser: currentUserReducer,
      searchValue: searchValueReducer,

      boolean: booleanReducer,
      passwordInput: passwordInputReducer,
   }
});