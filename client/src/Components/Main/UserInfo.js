import React, {useState} from 'react';
import ErrorPage from "./ErrorPage";
import "../../Stylings/UserInfo.css";
import { useParams, useNavigate } from 'react-router-dom';

import {BsTrash} from "react-icons/bs";
import placeholder_img from "../../placeholder.png";

function UserInfo({currentUser, setCurrentUser, userData, setUserData, postData, setPostData, commentData, setCommentData, searchValue}) {
   let navigate = useNavigate();

   // Getting the URL of the window
   const URL = window.location.href;
   const clickedID = parseInt(useParams().id);

   const checkUsersArray = userData?.filter(user => URL.endsWith(user?.id));

   const checkUser = (checkUsersArray?.filter(user => user?.id === clickedID))[0];

   const clickedUser = checkUser?.username;

   // Clicked User's blogs
   const checkPosts = postData?.filter(blog => blog?.user?.id === checkUser?.id);
   
   const renderPosts = checkPosts?.map(blog => {
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
                  const deleteBlog = postData?.filter(singlePost => singlePost?.id !== blog?.id);
                  setPostData(deleteBlog);
               })
         }
      }

      return<div className="user-info-blogs">
               <div
                  onClick={() => navigate(`/blogs/${blog?.id}`)}
                  className="user-info-data-container"
               >
                  <img src={blog?.image_url ? blog?.image_url : placeholder_img} alt={blog?.title}/>

                  <div>
                     <h4>{blog?.title}</h4>
                     <em>{post}</em>
                     <p>{blog?.likes} Likes | {blog?.dislikes} Dislikes | {blog?.comments?.length} Comments</p>
                     <p className="post-comments-footer"><em>Posted on {postDate} at {postTime}</em></p>
                  </div>
               </div>

               <div className="user-info-actions">
                  <BsTrash
                     onClick={deletePost}
                     className="delete-button"
                     title={`Delete "${blog?.title}"`}
                  />
               </div>
            </div>
   });

   // Clicked User's comments
   const checkComments = commentData?.filter(comment => comment?.user?.id === checkUser?.id);

   const renderComments = checkComments?.map(comment => {
      const commentDate = new Date(comment?.created_at).toLocaleDateString();
      const commentTime = new Date(comment?.created_at).toLocaleTimeString();

      const deleteComment = () => {
         let checkDelete = window.confirm(`Are you sure you want to delete your comment on "${comment?.blog?.title}"?`);
   
         if (checkDelete) {
            fetch(`/comments/${comment?.id}`, {
               method: "DELETE"
            })
               .then(() => {
                  const deleteComment = commentData?.filter(singleComment => singleComment?.id !== comment?.id);
                  setCommentData(deleteComment);
               })
         }
      }

      return<div className="user-info-comments">
         <div onClick={() => navigate(`/blogs/${comment?.blog?.id}`)}>
            <h4>{comment?.blog?.title}</h4>
            <p>{comment?.comment_text}</p>
            <p className="post-comments-footer"><em>Posted on {commentDate} at {commentTime}</em></p>
         </div>

            <BsTrash
               onClick={deleteComment}
               className="delete-button"
               title={`Delete your comment on "${comment?.blog?.title}"`}
            />
         </div>
   });

   const filterPosts = searchValue === "" ? renderPosts : renderPosts?.filter(blog => blog?.props?.children[1]?.props?.children[0]?.props?.children?.toLowerCase()?.includes(searchValue?.toLowerCase()));

   const filterComments = searchValue === "" ? renderComments : renderComments?.filter(comment => comment?.props?.children[1]?.props?.children?.toLowerCase()?.includes(searchValue?.toLowerCase()));

   // Show/hide posts/comments
   const [hidePosts, setHidePosts] = useState(false);
   const [hideComments, setHideComments] = useState(false);

   const deleteUser = () => {
      let userDelete = prompt("Are you sure you want to delete your Greenit account? This action cannot be undone.\nIf you'd like to continue, please type:\n" + `-->${checkUser?.username}<--`, "Don't do it >:^(");

      if (userDelete === checkUser?.username) {
         fetch(`/users/${checkUser?.id}`, {
            method: "DELETE"
         })
            .then(() => {
               const removeUser = userData?.filter(user => user?.id !== checkUser?.id);
               setUserData(removeUser);

               const removePosts = postData?.filter(post => post?.user?.id !== checkUser?.id);
               setPostData(removePosts);

               const removeComments = commentData?.filter(comment => comment?.user_id !== checkUser?.id);
               setCommentData(removeComments);
            })
         setCurrentUser(null);
         navigate("/");
      }
   }

   const accountDate = new Date(checkUser?.created_at).toLocaleDateString();
   const accountTime = new Date(checkUser?.created_at).toLocaleTimeString();

   return (
      <>
      {checkUser
         ?
            <div className="user-info-container-parent">
               <div className="user-info-container">
                  <div className="user-info-header">
                     <h2 id="clicked-username" className="username-color">
                        u/{clickedUser}
                     </h2>

                     {
                        currentUser?.username === clickedUser
                        ? <BsTrash className="delete-button" onClick={deleteUser} title="Delete Your Account :^("/>
                        : null
                     }
                  </div>

                  <div className="user-info-datetime">
                     Account created on {accountDate} at {accountTime}!
                  </div>

                  <div className="user-info-underline"></div>
                  
                  <div>
                     <div className="user-info-divs">
                        {checkPosts?.length
                           ?  <>
                                 <h3>Total Posts: {checkPosts?.length}
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
                        {checkComments?.length 
                           ?  <>
                                 <h3>Total Comments: {checkComments?.length}
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