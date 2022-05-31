import React from "react";

import Login from "./Login";
import Signup from "./Signup";
import ErrorPage from '../Helpers/ErrorPage';

import {useDispatch, useSelector} from "react-redux";
import {setShowSignup} from "../../Redux/Features/showSignupSlice";

import "../../Stylings/LoginSignupForm.css";

function LoginSignupForm({setUserData}) {
   const dispatch = useDispatch();

   // State to handle current user's information
   const currentUser = useSelector(state => state.currentUser.value);
   // State to handle whether to show Signup or Login component
   const showSignup = useSelector(state => state.showSignup.value);

   return (
      <>
      {/* If a user is already logged in (the currentUser object exists), then render ErrorPage component. If not, then render Signup/Login components*/}
      {!currentUser
         ?
            <div className="login-signup-container">   
               {showSignup
                  ? 
                     <Signup setUserData={setUserData}/>
                  : 
                     <Login/>
               }

               {/* Based on the showSignup state, conditionally render Login or Signup elements */}
               <div className="login-signup-footer">
                  <p>
                     {showSignup ? "Already have an account?" : "Don't have an account?"}
                  </p>

                  <button
                     onClick={() => dispatch(setShowSignup(!showSignup))}
                  >
                     {showSignup ? "Login" : "Signup" }
                  </button>
               </div>
            </div>
         :
            <ErrorPage/>
      }
      </>
   );
}

export default LoginSignupForm;