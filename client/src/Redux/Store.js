import {configureStore} from "@reduxjs/toolkit";

import currentUserReducer from "./Features/currentUserSlice";
import searchValueReducer from "./Features/searchValueSlice";
import showCreateBlogReducer from "./Features/showCreateBlogSlice";
import showSignupReducer from "./Features/showSignupSlice";

export default configureStore({
   reducer: {
      currentUser: currentUserReducer,
      searchValue: searchValueReducer,
      showCreateBlog: showCreateBlogReducer,
      showSignup: showSignupReducer
   }
});