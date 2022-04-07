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
   let navigate = useNavigate();

   // State to handle current blog's information
   const [currentBlogInfo, setCurrentBlogInfo] = useState({});
   // State to handle current blog's comments
   const [currentBlogComments, setCurrentBlogComments] = useState([]);
   // State to handle whether to show Loader component or not
   const [isLoaded, setIsLoaded] = useState(false);

   // Blog post's id
   const blogID = parseInt(useParams().id);

   useEffect(() => {
      fetch(`/blogs/${blogID}`)
         .then(resp => resp.json())
         .then(blog => {
            setCurrentBlogInfo(blog);
            setBlogLikes(blog?.likes);
            setBlogDislikes(blog?.dislikes);
            setCurrentBlogComments(blog?.comments);
            setIsLoaded(true);
         });
   }, [blogID]);

   const blogAuthor = currentBlogInfo?.user?.username;

   // Date & Time information for when the blog was created/posted
   const blogDate = new Date(currentBlogInfo?.created_at).toLocaleDateString();
   const blogTime = new Date(currentBlogInfo?.created_at).toLocaleTimeString();

   // State to handle whether a blog has been liked or disliked
   const [clickedNum, setClickedNum] = useState(1);
   // State to handle blog's likes & dislikes
   const [blogLikes, setBlogLikes] = useState(0);
   const [blogDislikes, setBlogDislikes] = useState(0);
   // State to handle whether "Please login" is shown or not
   const [loginError, setLoginError] = useState("");

   // Function to navigate to blog author's profile when user clicks username
   const viewUserInfo = () => {
      navigate(`/all_users/${currentBlogInfo?.user?.id}`);
   };

   // State to handle whether "Please login" is shown or not for comments
   const [commentLoginError, setCommentLoginError] = useState("");
   
   // State to handle newly created comment's information; set the initial value to an object with its content set to match the backend :comment schema with default values
   const [newBlogComment, setNewBlogComment] = useState({
      comment_text: "", 
      user_id: currentUser?.id,
      blog_id: currentBlogInfo?.id,
      likes: 0,
      dislikes: 0
   });

   // Function to update newBlogComment state based on inputted value from Join The Conversation textarea
   const handleNewCommentText = e => {
      setNewBlogComment({
         ...newBlogComment,
         user_id: currentUser?.id,
         blog_id: currentBlogInfo?.id,
         [e.target.name]:e.target.value
      })
   };

   // Function to create a new comment on the related blog using information inside of the newBlogComment object
   // If a user is already logged in (the currentUser object exists) and after the response comes back okay; setCurrentBlogComments array to include the newBlogComment object and setCommentData array to include the newBlogComment object
   // If a user isn't logged in (the currentUser object doesn't exist), then set and render "Please login"
   const submitNewBlogComment = e => {
      e.preventDefault();

      if (currentUser) {
         fetch("/comments", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(newBlogComment)
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
         setCommentLoginError("Please login");
      }
      // Clear all information inside of newBlogComment to default values
      setNewBlogComment({
         comment_text: "",
         user_id: currentUser?.id,
         blog_id: currentBlogInfo?.id,
         likes: 0,
         dislikes: 0
      });
   };

   // State to handle whether to hide all comments or not
   const [hideComments, setHideComments] = useState(false);

   // Map through currentBlogComments and render each Comment component by passing in the related information as props
   const renderComments = currentBlogComments?.map(comment => {
      return <Comment
               key={comment?.id}
               currentUser={currentUser}
               comment={comment}
               commentData={commentData} 
               setCommentData={setCommentData}
               currentBlogComments={currentBlogComments}
               setCurrentBlogComments={setCurrentBlogComments}
             />
   });

   // Sort throught renderComments's Comment components and display them from oldest to newest by their "created_at" information
   const sortComments = renderComments?.sort((a, b) => a?.props?.comment?.created_at?.localeCompare(b?.props?.comment?.created_at));

   // If searchValue is an empty string, render all blogs inside sortComments. As searchValue gets updated, check each comment user's username to see if they include the inputted searchValue
   const filterComments = searchValue === "" ? sortComments : sortComments?.filter(comment => comment?.props?.comment?.user?.username?.toLowerCase()?.includes(searchValue?.toLowerCase()));

   // If isLoaded is still false, show Loader component
   if (!isLoaded) {
      return <Loader/>
   };
   
   return (
      <>
      {/* If currentBlogInfo's errors object doesn't exist, render the currentBlogInfo's information. If not, render ErrorPage component */}
      {!currentBlogInfo.errors
         ?
            <div className="blog-div">

               <article className="single-blog">
                  <div className="user-info">
                     <h3>
                        Posted by&nbsp;
                           <span
                              className="username-color"
                              onClick={viewUserInfo}
                              style={{cursor: "pointer"}}
                           >
                              u/{blogAuthor}
                           </span>&nbsp;
                           
                           <time dateTime={`${blogDate} ${blogTime}`}>
                              on {blogDate} at {blogTime}
                           </time>
                     </h3>
         
                     {/* If the currentUser's username is the same as the blogAuthor's username, give the user the option to delete the blog */}
                     {currentUser?.username === blogAuthor
                        ? <BsTrash onClick={() => handleDeleteBlog(currentBlogInfo?.id)} className="delete-button" title="Delete Post"/>
                        : null}
                  </div>

                  {/* If the currentUser's username is the same as the blogAuthor's username, give the user the option to edit the blog */}
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
                           {/* Based on clickedNum's value(1, 2, or 3), render the relevant component based on whether no buttons are pressed, the likes button is pressed, or the dislikes button is pressed.*/}
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

                  {/* Only render something if blog's image exists */}
                  {currentBlogInfo?.image_url
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
                        onChange={handleNewCommentText}
                        type="text"
                        name="comment_text"
                        value={newBlogComment.comment_text}
                        rows="5"
                     />

                     <br/>
                     <button onClick={submitNewBlogComment}>Add Comment!</button>
                     <div className="error-message">{commentLoginError}</div>
                     <br/>
                  </form>
               </details>

               {/* If filterComment's length isn't a falsey value (0), show the "Show/Hide Comments" button */}
               {filterComments?.length
                  ?  <div className="show-hide-container">
                        <button onClick={() => setHideComments(prev => !prev)}>
                           {hideComments ? "Show Comments" : "Hide Comments"}
                        </button>
                     </div>
                  : null
               }

               {/* If hideComments state is true, show nothing. If not, show all comments rendered through filterComments */}
               {hideComments ? null : filterComments}
               
            </div>
         :
            <ErrorPage/>
      }
      </>
   );
}

export default BlogDetails;