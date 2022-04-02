import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

import DislikesPressed from "../Likes&DislikesButtons/DislikesPressed";
import LikesPressed from "../Likes&DislikesButtons/LikesPressed";
import NeitherPressed from "../Likes&DislikesButtons/NeitherPressed";

import "../../Stylings/Blog.css";

import {BsTrash} from "react-icons/bs";

function Blog({currentUser, blog, handleDeleteBlog, handleBlogLikes, handleBlogDislikes, handleUnlikeBlog, handleUndislikeBlog}) {
   const userObj = blog?.user; 

   let navigate = useNavigate();

   const clickUser = () => {
      navigate(`/all_users/${userObj?.id}`);
   }

   const viewMore = () => {
      navigate(`/blogs/${blog?.id}`);
   }

   // Add ... after blogs with more than 100 characters in length
   let renderOnMainPage;
   if (blog?.blog_post?.length > 100) {
      renderOnMainPage = blog?.blog_post?.slice(0, 100) + "...";
   } else {
      renderOnMainPage = blog?.blog_post;
   }

   const blogDate = new Date(blog.created_at).toLocaleDateString();
   const blogTime = new Date(blog.created_at).toLocaleTimeString();

   const [clickedNum, setClickedNum] = useState(1);
   const [blogLikes, setBlogLikes] = useState(blog?.likes);
   const [blogDislikes, setBlogDislikes] = useState(blog?.dislikes);
   const [loginError, setLoginError] = useState("");

   return (
      <div className="blog-div">
         
         <article className="single-blog">
            <div className="user-info">
               <h3>
                  Posted by&nbsp;
                     <span
                        className="username-color"
                        onClick={clickUser}
                        style={{cursor: "pointer"}}
                     >
                        u/{userObj?.username}
                     </span> on {blogDate} at {blogTime}
               </h3>

               {currentUser?.username === userObj?.username
                  ? <BsTrash onClick={() => handleDeleteBlog(blog.id)} className="delete-button" title="Delete Post"/>
                  : null}
            </div>

            <div className="blog-header">
               <div className="likes-button-container">
                  {clickedNum === 1
                     ? <NeitherPressed
                           id={blog?.id}
                           blogLikes={blogLikes}
                           setBlogLikes={setBlogLikes}
                           blogDislikes={blogDislikes}
                           setBlogDislikes={setBlogDislikes}
                           handleBlogLikes={handleBlogLikes}
                           handleBlogDislikes={handleBlogDislikes}
                           clickedNum={clickedNum}
                           setClickedNum={setClickedNum}
                           loginError={loginError}
                           setLoginError={setLoginError}
                       />
                     : clickedNum === 2
                        ? <LikesPressed
                              id={blog?.id}
                              blogLikes={blogLikes}
                              setBlogLikes={setBlogLikes}
                              blogDislikes={blogDislikes}
                              setBlogDislikes={setBlogDislikes}
                              handleUnlikeBlog={handleUnlikeBlog}
                              handleBlogDislikes={handleBlogDislikes}
                              clickedNum={clickedNum}
                              setClickedNum={setClickedNum}
                          />
                        : <DislikesPressed
                              id={blog?.id}
                              blogLikes={blogLikes}
                              setBlogLikes={setBlogLikes}
                              blogDislikes={blogDislikes}
                              setBlogDislikes={setBlogDislikes}
                              handleBlogLikes={handleBlogLikes}
                              handleUndislikeBlog={handleUndislikeBlog}
                              clickedNum={clickedNum}
                              setClickedNum={setClickedNum}
                          />
                  }
               </div>
                     &nbsp;
               <h2 className="blog-title">{blog.title}</h2>
            </div>

            <div className="blog-info-underline"></div>

            {blog.image_url ? <img src={blog.image_url} alt={blog.title}/> : null}

            <p>
               {renderOnMainPage}
            </p>
         </article>

         <div className="view-more-container">
            <em>
               {blog?.comments?.length === 1
                  ? `${blog?.comments?.length} Total Comment`
                  : `${blog?.comments?.length} Total Comments`
               }
            </em>
               <br/>
            <button onClick={viewMore} className="blog-view-more">
               VIEW MORE
            </button>
         </div>
      
      </div>
   );
}

export default Blog;