import {configureStore} from "@reduxjs/toolkit";

import booleanReducer from "./Features/booleanSlice";

export default configureStore({
   reducer: {
      boolean: booleanReducer,
   }
});