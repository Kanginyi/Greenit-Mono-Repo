import {configureStore} from "@reduxjs/toolkit";

import booleanReducer from "./Features/booleanSlice";
import passwordInputReducer from "./Features/passwordInputSlice";
import currentUserReducer from "./Features/currentUserSlice";

export default configureStore({
   reducer: {
      currentUser: currentUserReducer,
      boolean: booleanReducer,
      passwordInput: passwordInputReducer,
   }
});