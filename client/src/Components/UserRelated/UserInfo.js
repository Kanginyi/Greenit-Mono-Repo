import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import ErrorPage from "../Helpers/ErrorPage";
import Loader from "../Helpers/Loader";

import "../../Stylings/UserInfo.css";

import {BsTrash} from "react-icons/bs";
import {FaEdit} from "react-icons/fa";
import placeholder_img from "../../Images/placeholder.png";

function UserInfo({currentUser, setCurrentUser, userData, setUserData, blogData, setBlogData, commentData, setCommentData, searchValue}) {
   let navigate = useNavigate();

   // Clicked user's id
   const userID = parseInt(useParams().id);

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
   // State to handle whether error messages are rendered or not
   const [errorMessage, setErrorMessage] = useState("");
   // State to handle the edited username's information; set the initial value to an object with its username key set to currentUser's username
   const [editUsername, setEditUsername] = useState({
      username: currentUser?.username
   });
   
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

   const renderBlogs = sortBlogs?.map(blog => {
      let blogPost;
      if (blog?.blog_post?.length < 15) {
         blogPost = blog?.blog_post;
      } else {
         blogPost = blog?.blog_post?.slice(0, 15) + "...";
      }

      // Date & Time information for when the blog was created/posted
      const blogDate = new Date(blog?.created_at).toLocaleDateString();
      const blogTime = new Date(blog?.created_at).toLocaleTimeString();

      const deleteUserBlog = () => {
         let confirmDelete = window.confirm(`Are you sure you want to delete "${blog?.title}"?`);
   
         if (confirmDelete) {
            fetch(`/blogs/${blog?.id}`, {
               method: "DELETE"
            })
               .then(() => {
                  const deleteBlog = userBlogsInfo?.filter(eachBlog => eachBlog?.id !== blog?.id);

                  setUserBlogsInfo(deleteBlog);

                  const deleteRelatedComments = userCommentsInfo?.filter(eachComment => eachComment?.blog?.id !== blog?.id);

                  setUserCommentsInfo(deleteRelatedComments);

                  const removeBlog = blogData?.filter(eachBlog => eachBlog?.id !== blog?.id);

                  setBlogData(removeBlog);

                  const removeComments = commentData?.filter(eachComment => eachComment?.blog?.id !== blog?.id);

                  setCommentData(removeComments);
               })
         }
      }

      return<div className="user-info-blogs">
               <div
                  onClick={() => navigate(`/blogs/${blog?.id}`)}
                  className="user-blog-container"
               >
                  <img src={blog?.image_url ? blog?.image_url : placeholder_img} alt={blog?.title}/>

                  <div>
                     <h4>{blog?.title}</h4>
                     <em>{blogPost}</em>
                     <p>
                        {blog?.likes === 1 ? `${blog?.likes} Like` : `${blog?.likes} Likes`}
                           &nbsp;|&nbsp;
                        {blog?.dislikes === 1 ? `${blog?.dislikes} Dislike` : `${blog?.dislikes} Dislikes`}
                           &nbsp;|&nbsp;
                        {blog?.comments?.length === 1 ? `${blog?.comments?.length} Comment` : `${blog?.comments?.length} Comments`}
                     </p>
                     <p className="blog-comments-footer">
                        <em>
                           Posted on&nbsp;
                           <time dateTime={`${blogDate} ${blogTime}`}>
                              {blogDate} at {blogTime}
                           </time>
                        </em>
                     </p>
                  </div>
               </div>

               {currentUser?.id === currentUserInfo?.id
                  ?
                     <div className="user-info-actions">
                        <BsTrash
                           onClick={deleteUserBlog}
                           className="delete-button"
                           title={`Delete "${blog?.title}"`}
                        />

                        <FaEdit
                           onClick={() => navigate(`/editing/${blog?.id}`)}
                           className="user-edit"
                           title={`Edit "${blog?.title}"`}
                        />
                     </div>
                  : null
               }
            </div>
   });

   // Sort through userCommentsInfo and order them from newest to oldest by their "created_at" information
   const sortComments = userCommentsInfo?.sort((a, b) => b?.created_at?.localeCompare(a?.created_at));

   const renderComments = sortComments?.map(comment => {
      // Date & Time information for when the comment was created/posted
      const commentDate = new Date(comment?.created_at).toLocaleDateString();
      const commentTime = new Date(comment?.created_at).toLocaleTimeString();
      
      const deleteComment = () => {
         let confirmDelete = window.confirm(`Are you sure you want to delete your comment on "${comment?.blog?.title}"?`);
   
         if (confirmDelete) {
            fetch(`/comments/${comment?.id}`, {
               method: "DELETE"
            })
               .then(() => {
                  const deleteComment = userCommentsInfo?.filter(singleComment => singleComment?.id !== comment?.id);

                  setUserCommentsInfo(deleteComment);

                  // const blogRelatedToDeleteComment = (userBlogsInfo?.filter(singlePost => singlePost?.id === comment?.blog?.id))[0];

                  // const deleteCommentOnBlog = blogRelatedToDeleteComment?.comments?.filter(singleComment => singleComment?.id !== comment?.id);

                  // console.log("Blog Related to Delete Comment:", blogRelatedToDeleteComment);
                  // Object that's holding blog relatedToDeletedComment

                  // console.log("DeleteCommentOnBlog:", deleteCommentOnBlog)
                  // Array that's holding remaining related comments
                  
                  // setUserBlogsInfo();

                  const removeComment = commentData?.filter(singleComment => singleComment?.id !== comment?.id);

                  setCommentData(removeComment);
               })
         }
      }

      return<div className="user-info-comments">
               <div
                  onClick={() => navigate(`/blogs/${comment?.blog?.id}`)}
                  className="user-comment-container"
               >
                  <h4>{comment?.blog?.title}</h4>
                  <em>{comment?.comment_text}</em>
                  <p>
                     {comment?.likes === 1 ? `${comment?.likes} Like` : `${comment?.likes} Likes`}
                        &nbsp;|&nbsp;
                     {comment?.dislikes === 1 ? `${comment?.dislikes} Dislike` : `${comment?.dislikes} Dislikes`}                  
                  </p>
                  <p className="blog-comments-footer">
                     <em>
                        Posted on&nbsp;
                        <time dateTime={`${commentDate} ${commentTime}`}>
                           {commentDate} at {commentTime}
                        </time>
                     </em>
                  </p>
               </div>

               {currentUser?.id === currentUserInfo?.id
                  ?
                     <div className="user-info-actions">
                        <BsTrash
                           onClick={deleteComment}
                           className="delete-button"
                           title={`Delete your comment on "${comment?.blog?.title}"`}
                        />

                        <FaEdit
                           onClick={() => navigate(`/blogs/${comment?.blog?.id}`)}
                           className="user-edit"
                           title={`Head to "${comment?.blog?.title}" to edit your comment`}
                        />
                     </div>
                  : null
               }
         </div>
   });

   // If searchValue is an empty string, render all blogs inside renderBlogs. As searchValue gets updated, check each blog's title to see if they include the inputted searchValue
   const filterBlogs = searchValue === "" ? renderBlogs : renderBlogs?.filter(blog => blog?.props?.children[0]?.props?.children[1]?.props?.children[0]?.props?.children?.toLowerCase()?.includes(searchValue?.toLowerCase()));

   // If searchValue is an empty string, render all comments inside renderComments. As searchValue gets updated, check each comment's text to see if they include the inputted searchValue
   const filterComments = searchValue === "" ? renderComments : renderComments?.filter(comment => comment?.props?.children[0]?.props?.children[1]?.props?.children?.toLowerCase()?.includes(searchValue?.toLowerCase()));

   // States to handle whether to hide all blogs/comments or not
   const [hideBlogs, setHideBlogs] = useState(false);
   const [hideComments, setHideComments] = useState(false);

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

   console.log(currentUserInfo)

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