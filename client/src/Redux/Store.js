import {configureStore} from "@reduxjs/toolkit";

import booleanReducer from "./Features/booleanSlice";
import passwordInputReducer from "./Features/passwordInputSlice";

export default configureStore({
   reducer: {
      boolean: booleanReducer,
      passwordInput: passwordInputReducer,
   }
});