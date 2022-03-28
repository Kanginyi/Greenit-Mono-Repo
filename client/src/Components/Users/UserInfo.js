import React, {useState, useEffect} from 'react';
import Loader from "../Helpers/Loader";
import ErrorPage from "../Helpers/ErrorPage";
import "../../Stylings/UserInfo.css";
import { useParams, useNavigate } from 'react-router-dom';

import {BsTrash} from "react-icons/bs";
import {FaEdit} from "react-icons/fa";
import placeholder_img from "../../Images/placeholder.png";

function UserInfo({currentUser, setCurrentUser, userData, setUserData, postData, setPostData, commentData, setCommentData, searchValue}) {
   let navigate = useNavigate();

   const clickedID = parseInt(useParams().id);

   const [currentUserInfo, setCurrentUserInfo] = useState({});
   const [userBlogsInfo, setUserBlogsInfo] = useState([]);
   const [userCommentsInfo, setUserCommentsInfo] = useState([]);
   const [isLoaded, setIsLoaded] = useState(false);

   // Editing the Username
   const [showUserInput, setShowUserInput] = useState(false);
   const [errorMessage, setErrorMessage] = useState("");
   const [editUsername, setEditUsername] = useState({
      username: currentUser?.username
   });
   
   const handleUsername = e => {
      setEditUsername({
         ...editUsername,
         [e.target.name]: e.target.value
      })
   };

   const updateUsername = () => {
      fetch(`/users/${clickedID}`, {
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
                  })
            }
         })
   };

   useEffect(() => {
      fetch(`/users`)
         .then(resp => resp.json())
         .then(usersData => {
            const userInfo = (usersData?.filter(user => user?.id === clickedID)[0]);

            setCurrentUserInfo(userInfo);
            setEditUsername({username: userInfo?.username});
            setUserBlogsInfo(userInfo?.blogs);
            setUserCommentsInfo(userInfo?.comments);
            setIsLoaded(true);
         })
   }, [clickedID]);

   // Clicked User's blogs
   const renderPosts = userBlogsInfo?.map(blog => {
      let post;
      if (blog?.blog_post?.length < 15) {
         post = blog?.blog_post;
      } else {
         post = blog?.blog_post?.slice(0, 15) + "...";
      }

      const postDate = new Date(blog?.created_at).toLocaleDateString();
      const postTime = new Date(blog?.created_at).toLocaleTimeString();

      const deletePost = () => {
         let checkDelete = window.confirm(`Are you sure you want to delete "${blog?.title}"?`);
   
         if (checkDelete) {
            fetch(`/blogs/${blog?.id}`, {
               method: "DELETE"
            })
               .then(() => {
                  const deleteBlog = userBlogsInfo?.filter(singlePost => singlePost?.id !== blog?.id);
                  setUserBlogsInfo(deleteBlog);
                  setPostData(deleteBlog);
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
                     <em>{post}</em>
                     <p>{blog?.likes} Likes | {blog?.dislikes} Dislikes | {blog?.comments?.length} Comments</p>
                     <p className="post-comments-footer"><em>Posted on {postDate} at {postTime}</em></p>
                  </div>
               </div>

               {currentUser?.username === currentUserInfo?.username
                  ?
                     <div className="user-info-actions">
                        <BsTrash
                           onClick={deletePost}
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

   // Clicked User's comments
   const renderComments = userCommentsInfo?.map(comment => {
      const commentDate = new Date(comment?.created_at).toLocaleDateString();
      const commentTime = new Date(comment?.created_at).toLocaleTimeString();
      
      const deleteComment = () => {
         let checkDelete = window.confirm(`Are you sure you want to delete your comment on "${comment?.blog?.title}"?`);
   
         if (checkDelete) {
            fetch(`/comments/${comment?.id}`, {
               method: "DELETE"
            })
               .then(() => {
                  const deleteComment = userCommentsInfo?.filter(singleComment => singleComment?.id !== comment?.id);
                  setUserCommentsInfo(deleteComment);
                  setCommentData(deleteComment);
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
                  <p>{comment?.likes} Likes | {comment?.dislikes} Dislikes</p>
                  <p className="post-comments-footer"><em>Posted on {commentDate} at {commentTime}</em></p>
               </div>

               {currentUser?.username === currentUserInfo?.username
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

   const filterPosts = searchValue === "" ? renderPosts : renderPosts?.filter(blog => blog?.props?.children[1]?.props?.children[0]?.props?.children?.toLowerCase()?.includes(searchValue?.toLowerCase()));

   const filterComments = searchValue === "" ? renderComments : renderComments?.filter(comment => comment?.props?.children[1]?.props?.children?.toLowerCase()?.includes(searchValue?.toLowerCase()));

   // Show/hide posts/comments
   const [hidePosts, setHidePosts] = useState(false);
   const [hideComments, setHideComments] = useState(false);

   const deleteUser = () => {
      let userDelete = prompt(`Are you sure you want to delete your Greenit account? This action cannot be undone.\nIf you'd like to continue, please type:\n -->${editUsername?.username}<--`, "Don't do it >:^(");

      if (userDelete === currentUser?.username) {
         fetch(`/users/${currentUserInfo?.id}`, {
            method: "DELETE"
         })
            .then(() => {
               const removeUser = userData?.filter(user => user?.id !== currentUserInfo?.id);
               setUserData(removeUser);

               const removePosts = postData?.filter(post => post?.user?.id !== currentUserInfo?.id);
               setPostData(removePosts);

               const removeComments = commentData?.filter(comment => comment?.user?.id !== currentUserInfo?.id);
               setCommentData(removeComments);
            })
         setCurrentUser(null);
         navigate("/");
      }
   };

   const accountDate = new Date(currentUserInfo?.created_at).toLocaleDateString();
   const accountTime = new Date(currentUserInfo?.created_at).toLocaleTimeString();

   // Loading screen component
   if (!isLoaded) {
      return <Loader/>
   }

   return (
      <>
      {currentUserInfo
         ?
            <div className="user-info-container-parent">
               <div className="user-info-container">
                  <div className="user-info-header">
                     <h2 id="clicked-username" className="username-color">
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

                        {currentUser?.username === currentUserInfo?.username
                        ? <FaEdit
                           onClick={() => setShowUserInput(prev => !prev)}
                           className="user-info-edit"
                           title="Update Username"
                        />
                        : null
                        }
                     </h2>

                     {
                        currentUser?.username === currentUserInfo?.username
                        ? <BsTrash className="delete-button" onClick={deleteUser} title="Delete Your Account :^("/>
                        : null
                     }
                  </div>

                  <div className="error-message user-info-error">{errorMessage}</div>

                  <div className="user-info-datetime">
                     Account created on {accountDate} at {accountTime}.
                  </div>

                  <div className="user-info-underline"></div>
                  
                  <div>
                     <div className="user-info-divs">
                        {userBlogsInfo?.length
                           ?  <>
                                 <h3>Total Posts: {userBlogsInfo?.length}
                                    <button
                                       onClick={() => setHidePosts(prev => !prev)}
                                    >
                                       {!hidePosts ? "Hide Posts" : "Show Posts"}</button>
                                 </h3>
                                 
                                 <div className="user-info-scroll">
                                    {!hidePosts ? filterPosts : null}
                                 </div>
                              </>
                           : <h3>No current posts :^(</h3>
                        }
                     </div>

                     <div className="user-info-underline"></div>

                     <div className="user-info-divs">
                        {userCommentsInfo?.length 
                           ?  <>
                                 <h3>Total Comments: {userCommentsInfo?.length}
                                    <button
                                       onClick={() => setHideComments(prev => !prev)}
                                    >
                                       {!hideComments ? "Hide Comments" : "Show Comments"}
                                    </button>
                                 </h3>

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