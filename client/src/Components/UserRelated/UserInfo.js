import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import UserInfoBlogs from "./UserInfoBlogs";
import UserInfoComments from "./UserInfoComments";
import ErrorPage from "../Helpers/ErrorPage";
import Loader from "../Helpers/Loader";

import "../../Stylings/UserInfo.css";

import {BsTrash} from "react-icons/bs";
import {FaEdit} from "react-icons/fa";

function UserInfo({currentUser, setCurrentUser, userData, setUserData, blogData, setBlogData, commentData, setCommentData, searchValue}) {
   let navigate = useNavigate();

   // State to handle current user's information
   const [currentUserInfo, setCurrentUserInfo] = useState({});
   // State to handle clicked user's blog's information
   const [userBlogsInfo, setUserBlogsInfo] = useState([]);
   // State to handle clicked user's comment's information
   const [userCommentsInfo, setUserCommentsInfo] = useState([]);
   // State to handle whether to show Loader component or not
   const [isLoaded, setIsLoaded] = useState(false);

   // State to handle whether to show the username editing input or not
   const [showUserInput, setShowUserInput] = useState(false);
   // States to handle whether to hide all blogs/comments or not
   const [hideBlogs, setHideBlogs] = useState(false);
   const [hideComments, setHideComments] = useState(false);
   // State to handle whether error messages are rendered or not
   const [errorMessage, setErrorMessage] = useState("");
   // State to handle the edited username's information; set the initial value to an object with its username key set to currentUser's username
   const [editUsername, setEditUsername] = useState({
      username: currentUser?.username
   });

   // Clicked user's id
   const userID = parseInt(useParams().id);
   
   // Fetch to get the current clicked user's information and set its related username, blogs, and comments to each related state
   useEffect(() => {
      fetch(`/users`)
         .then(resp => resp.json())
         .then(usersData => {
            const userInfo = (usersData?.filter(user => user?.id === userID)[0]);

            setCurrentUserInfo(userInfo);
            setEditUsername({username: userInfo?.username});
            setUserBlogsInfo(userInfo?.blogs);
            setUserCommentsInfo(userInfo?.comments);
            setIsLoaded(true);
         })
   }, [userID]);

   // Function to update editUsername state based on inputted value from the edit username input
   const handleUsername = e => {
      setEditUsername({
         ...editUsername,
         [e.target.name]: e.target.value
      })
   };

   // Function to update the user's username using the user's id and the information inside of the editUsername object
   // After the response comes back okay, clear any error messages, setCurrentUser object to the updated user object, setCurrentUserInfo to the updated user object, setUserData array to include the updated user object, and hide the username editing input
   const updateUsername = () => {
      fetch(`/users/${userID}`, {
         method: "PATCH",
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify(editUsername) 
      })
         .then(resp => {
            if (resp.ok) {
               resp.json()
                  .then(updatedUser => {
                     setErrorMessage("");
                     setCurrentUser(updatedUser);
                     setCurrentUserInfo(updatedUser);
                     setUserData(userData, updatedUser);
                     setShowUserInput(false);
                  })
            } else {
               resp.json()
                  .then(error => {
                     setErrorMessage(error.errors);
                     setEditUsername({username: currentUserInfo?.username});
                  })
            }
         })
   };

   // Sort through userBlogsInfo and order them from newest to oldest by their "created_at" information
   const sortBlogs = userBlogsInfo?.sort((a, b) => b?.created_at?.localeCompare(a?.created_at));

   // Map through sortBlogs and render each UserInfoBlogs component by passing in the related information as props
   const renderBlogs = sortBlogs?.map(blog => {
      return <UserInfoBlogs
               blog={blog}
               currentUser={currentUser}
               blogData={blogData}
               setBlogData={setBlogData}
               commentData={commentData}
               setCommentData={setCommentData}
               currentUserInfo={currentUserInfo}
               userBlogsInfo={userBlogsInfo}
               setUserBlogsInfo={setUserBlogsInfo}
               userCommentsInfo={userCommentsInfo}
               setUserCommentsInfo={setUserCommentsInfo}
             />
   });

   // Sort through userCommentsInfo and order them from newest to oldest by their "created_at" information
   const sortComments = userCommentsInfo?.sort((a, b) => b?.created_at?.localeCompare(a?.created_at));

   // Map through sortComments and render each UserInfoComments component by passing in the related information as props
   const renderComments = sortComments?.map(comment => {
      return <UserInfoComments
               comment={comment}
               currentUser={currentUser}
               commentData={commentData}
               setCommentData={setCommentData}
               currentUserInfo={currentUserInfo}
               userBlogsInfo={userBlogsInfo}
               setUserBlogsInfo={setUserBlogsInfo}
               userCommentsInfo={userCommentsInfo}
               setUserCommentsInfo={setUserCommentsInfo}
             />
   });

   // If searchValue is an empty string, render all blogs inside renderBlogs. As searchValue gets updated, check each blog's title to see if they include the inputted searchValue
   const filterBlogs = searchValue === "" ? renderBlogs : renderBlogs?.filter(blog => blog?.props?.children[0]?.props?.children[1]?.props?.children[0]?.props?.children?.toLowerCase()?.includes(searchValue?.toLowerCase()));

   // If searchValue is an empty string, render all comments inside renderComments. As searchValue gets updated, check each comment's text to see if they include the inputted searchValue
   const filterComments = searchValue === "" ? renderComments : renderComments?.filter(comment => comment?.props?.children[0]?.props?.children[1]?.props?.children?.toLowerCase()?.includes(searchValue?.toLowerCase()));

   // Function to handle deleting user using the id of the deleted blog
   const deleteUser = () => {
      let userDelete = prompt(`Are you sure you want to delete your Greenit account? This action cannot be undone.\nIf you'd like to continue, please type:\n -->${editUsername?.username}<--`, "Don't do it >:^(");

      // If the inputted value from userDelete is the same as the currentUser's username, then continue with delete actions
      if (userDelete === currentUser?.username) {
         fetch(`/users/${currentUserInfo?.id}`, {
            method: "DELETE"
         })
            .then(() => {
               // removeUser variable to hold array that removes the deleted user from userData and setUserData to that new array
               const removeUser = userData?.filter(user => user?.id !== currentUserInfo?.id);
               setUserData(removeUser);

               // removeUserBlogs variable to hold array that removes all of the user's related blogs from blogData and setBlogData to that new array
               const removeUserBlogs = blogData?.filter(blog => blog?.user?.id !== currentUserInfo?.id);
               setBlogData(removeUserBlogs);

               // removeUserComments variable to hold array that removes all of the user's related comments from commentData and setCommentData to that new array
               const removeUserComments = commentData?.filter(comment => comment?.user?.id !== currentUserInfo?.id);
               setCommentData(removeUserComments);
            })
         setCurrentUser(null);
         navigate("/");
      }
   };

   // Date & Time information for when the user's account was created
   const accountDate = new Date(currentUserInfo?.created_at).toLocaleDateString();
   const accountTime = new Date(currentUserInfo?.created_at).toLocaleTimeString();

   // If isLoaded is still false, show Loader component
   if (!isLoaded) {
      return <Loader/>
   };

   return (
      <>
      {/* If currentUserInfo object exists, then render the currentUserInfo's information. If not, render ErrorPage component */}
      {currentUserInfo
         ?
            <div className="user-info-container-parent">
               <div className="user-info-container">
                  <div className="user-info-header">
                     <h2 id="clicked-username" className="username-color">
                        {/* If showUserInput is true, then show the input to let the user edit their username */}
                        {showUserInput
                           ? <>
                              <input
                                 type="text"
                                 name="username"
                                 onChange={handleUsername}
                                 defaultValue={editUsername?.username}
                                 autoComplete="off"
                                 spellCheck="false"
                                 required
                              />

                              <button onClick={updateUsername}>Update Username</button>
                             </>
                           : `u/${editUsername?.username}`
                        }

                        {/* If currentUser's id is the same as the currentUserInfo's id, give the user the option to edit their username */}
                        {currentUser?.id === currentUserInfo?.id
                        ? <FaEdit
                           onClick={() => setShowUserInput(prev => !prev)}
                           className="user-info-edit"
                           title="Update Username"
                        />
                        : null
                        }
                     </h2>

                     {/* If currentUser's id is the same as the currentUserInfo's id, give the user the option to delete their Greenit account */}
                     {currentUser?.id === currentUserInfo?.id
                        ? <BsTrash className="delete-button" onClick={deleteUser} title="Delete Your Account :^("/>
                        : null
                     }
                  </div>

                  <div className="error-message user-info-error">{errorMessage}</div>

                  <div className="user-info-datetime">
                     Account created on&nbsp;
                        <time dateTime={`${accountDate} ${accountTime}`}>
                           {accountDate} at {accountTime}.
                        </time>
                  </div>

                  <div className="user-info-underline"></div>
                  
                  <div>
                     <div className="user-info-divs">
                        {/* If userBlogsInfo's length isn't a falsey value (0), show user's blogs */}
                        {userBlogsInfo?.length
                           ?  <>
                                 <h3>Total Posts: {userBlogsInfo?.length}
                                    {/* If filterBlog's length isn't a falsey value (0), show "Hide Posts" button */}
                                    {filterBlogs?.length
                                       ? <button
                                          onClick={() => setHideBlogs(prev => !prev)}
                                       >
                                          {!hideBlogs ? "Hide Posts" : "Show Posts"}
                                         </button>
                                       : null
                                    }
                                 </h3>
                                 
                                 {/* If hideBlogs state is false, render all filtered blogs in filterBlogs */}
                                 <div className="user-info-scroll">
                                    {!hideBlogs ? filterBlogs : null}
                                 </div>
                              </>
                           : <h3>No current posts :^(</h3>
                        }
                     </div>

                     <div className="user-info-underline"></div>

                     <div className="user-info-divs">
                        {/* If userCommentsInfo's length isn't a falsey value (0), show user's comments */}
                        {userCommentsInfo?.length 
                           ?  <>
                                 <h3>Total Comments: {userCommentsInfo?.length}
                                    {/* If filterComment's length isn't a falsey value (0), show "Hide Comments" button */}
                                    {filterComments?.length
                                       ? <button
                                             onClick={() => setHideComments(prev => !prev)}
                                         >
                                             {!hideComments ? "Hide Comments" : "Show Comments"}
                                         </button>
                                       : null
                                    }
                                 </h3>

                                 {/* If hideComments state is false, render all filtered comments in filterComments */}
                                 <div className="user-info-scroll">
                                    {!hideComments ? filterComments : null}
                                 </div>
                              </>
                           : <h3>No current comments :^(</h3>      
                        }
                     </div>
                  </div>
               </div>
            </div>
         :
            <ErrorPage/>
      }
      </>
   );
}

export default UserInfo;