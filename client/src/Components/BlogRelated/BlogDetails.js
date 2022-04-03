import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import Comment from "./Comment";
import ErrorPage from "../Helpers/ErrorPage";
import Loader from "../Helpers/Loader";
import DislikesPressed from "../Likes&DislikesButtons/DislikesPressed";
import LikesPressed from "../Likes&DislikesButtons/LikesPressed";
import NeitherPressed from "../Likes&DislikesButtons/NeitherPressed";

import {BsTrash} from "react-icons/bs";
import {FaEdit} from "react-icons/fa";

function BlogDetails({currentUser, commentData, setCommentData, searchValue, handleDeleteBlog, handleBlogLikes, handleBlogDislikes, handleUnlikeBlog, handleUndislikeBlog}) {
   const [currentBlogInfo, setCurrentBlogInfo] = useState({});
   const [currentBlogComments, setCurrentBlogComments] = useState([]);
   const [isLoaded, setIsLoaded] = useState(false);

   // Blog Post ID
   const clickedID = parseInt(useParams().id);

   const blogAuthor = currentBlogInfo?.user?.username;

   let navigate = useNavigate();

   useEffect(() => {
      fetch(`/blogs/${clickedID}`)
         .then(resp => resp.json())
         .then(blog => {
            setCurrentBlogInfo(blog);
            setBlogLikes(blog?.likes);
            setBlogDislikes(blog?.dislikes);
            setCurrentBlogComments(blog?.comments);
            setIsLoaded(true);
         });
   }, [clickedID]);

   // Date & Time information for when the blog was created/posted
   const blogDate = new Date(currentBlogInfo?.created_at).toLocaleDateString();
   const blogTime = new Date(currentBlogInfo?.created_at).toLocaleTimeString();

   // Render all comments onto the page
   const renderComments = currentBlogComments?.map(comment => {
      return <Comment key={comment.id} currentUser={currentUser} comment={comment} commentData={commentData} setCommentData={setCommentData} currentBlogComments={currentBlogComments} setCurrentBlogComments={setCurrentBlogComments}/>
   });

   const sortComments = renderComments?.sort((a, b) => a?.props?.comment?.created_at?.localeCompare(b?.props?.comment?.created_at));

   const filterComments = searchValue === "" ? sortComments : sortComments?.filter(comment => comment?.props?.comment?.user?.username?.toLowerCase()?.includes(searchValue?.toLowerCase()));

   // State to handle whether a blog has been liked or disliked
   const [clickedNum, setClickedNum] = useState(1);
   // State to handle blog's likes & dislikes
   const [blogLikes, setBlogLikes] = useState(0);
   const [blogDislikes, setBlogDislikes] = useState(0);
   // State to handle whether "Please login" is shown or not
   const [loginError, setLoginError] = useState("");

   // Handle Comment Input
   const [commentError, setCommentError] = useState("");
   const [blogComment, setBlogComment] = useState({
      comment_text: "", 
      user_id: currentUser?.id,
      blog_id: currentBlogInfo?.id,
      likes: 0,
      dislikes: 0
   });

   const handleComment = e => {
      setBlogComment({
         ...blogComment,
         user_id: currentUser?.id,
         blog_id: currentBlogInfo?.id,
         [e.target.name]:e.target.value
      })
   }

   const submitComment = e => {
      e.preventDefault();

      if (currentUser) {
         fetch("/comments", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(blogComment)
         })
            .then(resp => {
               if (resp.ok) {
                  resp.json()
                     .then(data => {
                        setCurrentBlogComments(comments => [...comments, data]);
                        setCommentData([...commentData, data]);
                     })
               }
            });
      } else {
         setCommentError("Please login");
      }
      
      setBlogComment({
         comment_text: "",
         user_id: currentUser?.id,
         blog_id: currentBlogInfo?.id,
         likes: 0,
         dislikes: 0
      });
   };

   // State for hiding comments
   const [hideComments, setHideComments] = useState(false);

   // Loading screen component
   if (!isLoaded) {
      return <Loader/>
   }
   
   return (
      <>
      {!currentBlogInfo.errors
         ?
            <div className="blog-div">

               <article className="single-blog">
                  <div className="user-info">
                     <h3>
                        Posted by&nbsp;
                           <span
                              className="username-color"
                              onClick={() => navigate(`/all_users/${currentBlogInfo?.user?.id}`)}
                              style={{cursor: "pointer"}}
                           >
                              u/{blogAuthor}
                           </span> on {blogDate} at {blogTime}
                     </h3>
         
                     {currentUser?.username === blogAuthor
                        ? <BsTrash onClick={() => handleDeleteBlog(currentBlogInfo?.id)} className="delete-button" title="Delete Post"/>
                        : null}
                  </div>

                  {currentUser?.username === blogAuthor
                     ? <div className="edit-blog-container">
                           <div onClick={() => navigate(`/editing/${currentBlogInfo?.id}`)} className="edit-blog">
                              <FaEdit/> Edit Post
                           </div>
                     </div>
                     : null
                  }

                  <div className="blog-header">
                        <div className="likes-button-container">
                           {clickedNum === 1
                              ? <NeitherPressed
                                    id={currentBlogInfo?.id}
                                    likes={blogLikes}
                                    setLikes={setBlogLikes}
                                    dislikes={blogDislikes}
                                    setDislikes={setBlogDislikes}
                                    likesFunction={handleBlogLikes}
                                    dislikesFunction={handleBlogDislikes}
                                    clickedNum={clickedNum}
                                    setClickedNum={setClickedNum}
                                    loginError={loginError}
                                    setLoginError={setLoginError}
                                />
                              : clickedNum === 2
                                 ? <LikesPressed
                                       id={currentBlogInfo?.id}
                                       likes={blogLikes}
                                       setLikes={setBlogLikes}
                                       dislikes={blogDislikes}
                                       setDislikes={setBlogDislikes}
                                       unlikeFunction={handleUnlikeBlog}
                                       dislikesFunction={handleBlogDislikes}
                                       clickedNum={clickedNum}
                                       setClickedNum={setClickedNum}
                                   />
                                 : <DislikesPressed
                                       id={currentBlogInfo?.id}
                                       likes={blogLikes}
                                       setLikes={setBlogLikes}
                                       dislikes={blogDislikes}
                                       setDislikes={setBlogDislikes}
                                       likesFunction={handleBlogLikes}
                                       undislikeFunction={handleUndislikeBlog}
                                       clickedNum={clickedNum}
                                       setClickedNum={setClickedNum}
                                   />
                           }
                        </div>
                        &nbsp;
                     <h2 className="blog-title">{currentBlogInfo?.title}</h2>
                  </div>
 
                  <div className="blog-info-underline"></div>

                  {
                     currentBlogInfo?.image_url
                     ? <img src={currentBlogInfo?.image_url} alt={currentBlogInfo?.title}/>
                     : null
                  }

                  <div>
                     <p>{currentBlogInfo?.blog_post}</p>
                  </div>
               </article>

               <details>
                  <summary className="blog-comment-dropdown">JOIN THE CONVERSATION</summary>

                  <form className="blog-comment-form">
                     <textarea
                        onChange={handleComment}
                        type="text"
                        name="comment_text"
                        value={blogComment.comment_text}
                        rows="5"
                     />

                     <br/>
                     <button onClick={submitComment}>Add Comment!</button>
                     <div className="error-message">{commentError}</div>
                     <br/>
                  </form>
               </details>

               {filterComments?.length
                  ?  <div className="show-hide-container">
                        <button onClick={() => setHideComments(prev => !prev)}>
                           {hideComments ? "Show Comments" : "Hide Comments"}
                        </button>
                     </div>
                  : null
               }

               {hideComments ? null : filterComments}
               
            </div>
         :
            <ErrorPage/>
      }
      </>
   );
}

export default BlogDetails;