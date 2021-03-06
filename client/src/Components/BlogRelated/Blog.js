import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

import DislikesPressed from "../Likes&DislikesButtons/DislikesPressed";
import LikesPressed from "../Likes&DislikesButtons/LikesPressed";
import NeitherPressed from "../Likes&DislikesButtons/NeitherPressed";

import {useSelector} from "react-redux";

import "../../Stylings/Blog.css";

import {BsTrash} from "react-icons/bs";

function Blog({blog, handleDeleteBlog, handleBlogLikes, handleBlogDislikes, handleUnlikeBlog, handleUndislikeBlog}) {
   let navigate = useNavigate();

   // State to handle current user's information  
   const currentUser = useSelector(state => state.currentUser.value);

   // State to handle whether a blog has been liked or disliked
   const [clickedNum, setClickedNum] = useState(1);
   // State to handle blog's likes & dislikes
   const [blogLikes, setBlogLikes] = useState(blog?.likes);
   const [blogDislikes, setBlogDislikes] = useState(blog?.dislikes);
   // State to handle whether "Please login" is shown or not
   const [loginError, setLoginError] = useState("");

   const blogAuthorObj = blog?.user;

   // Date & Time information for when the blog was created/posted
   const blogDate = new Date(blog.created_at).toLocaleDateString();
   const blogTime = new Date(blog.created_at).toLocaleTimeString();

   // Function to navigate to blog author's profile when user clicks related username
   const viewUserInfo = () => {
      navigate(`/all_users/${blogAuthorObj?.id}`);
   };

   // Function to navigate to blog's full page to view more information about the clicked blog when user clicks related button
   const viewMore = () => {
      navigate(`/blogs/${blog?.id}`);
   };

   // If blog's content is more than 100 characters in length, max it out to 100 characters, add "..." after it, and set shortBlogDesc to the shortened content
   // If blog's content is less than 100 characters in length, just set shortBlogDesc to the original content
   let shortBlogDesc;
   if (blog?.blog_post?.length > 100) {
      shortBlogDesc = blog?.blog_post?.slice(0, 100) + "...";
   } else {
      shortBlogDesc = blog?.blog_post;
   };

   return (
      <div className="blog-div">
         
         <article className="single-blog">
            <div className="user-info">
               <h3>
                  Posted by&nbsp;
                     <span
                        className="username-color cursor-pointer"
                        onClick={viewUserInfo}
                     >
                        u/{blogAuthorObj?.username}
                     </span> on&nbsp;
                     
                     <time dateTime={`${blogDate} ${blogTime}`}>
                        {blogDate} at {blogTime}
                     </time>
               </h3>

               {/* If the currentUser's id is the same as the blogAuthor's id, give the user the option to delete the blog */}
               {currentUser?.id === blogAuthorObj?.id &&
                  <BsTrash onClick={() => handleDeleteBlog(blog.id)} className="delete-button cursor-pointer" title="Delete Post"/>
               }
            </div>

            <div className="blog-header">
               <div className="likes-button-container">
                  {/* Based on clickedNum's value(1, 2, or 3), render the relevant component based on whether no buttons are pressed, the likes button is pressed, or the dislikes button is pressed.*/}
                  {clickedNum === 1
                     ? <NeitherPressed
                           id={blog?.id}
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
                              id={blog?.id}
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
                              id={blog?.id}
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
               <h2 className="blog-title">{blog.title}</h2>
            </div>

            <div className="blog-info-underline"></div>

            {/* Only render something if blog's image exists */}
            {blog.image_url &&
               <img src={blog.image_url} alt={blog.title}/>
            }

            <p>
               {shortBlogDesc}
            </p>
         </article>

         <div className="view-more-container text-align-center">
            <em>
               {/* Proper grammar based on the amount of comments on the blog*/}
               {blog?.comments?.length === 1
                  ? `${blog?.comments?.length} Total Comment`
                  : `${blog?.comments?.length} Total Comments`
               }
            </em>
               <br/>
            <button onClick={viewMore} className="blog-view-more cursor-pointer">
               VIEW MORE
            </button>
         </div>
      
      </div>
   );
}

export default Blog;