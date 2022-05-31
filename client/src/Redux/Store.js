import {configureStore} from "@reduxjs/toolkit";

import currentUserReducer from "./Features/currentUserSlice";
import searchValueReducer from "./Features/searchValueSlice";

export default configureStore({
   reducer: {
      currentUser: currentUserReducer,
      searchValue: searchValueReducer,
   }
});