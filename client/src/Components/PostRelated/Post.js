import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

import DislikesPressed from "../Likes&DislikesButtons/DislikesPressed";
import LikesPressed from "../Likes&DislikesButtons/LikesPressed";
import NeitherPressed from "../Likes&DislikesButtons/NeitherPressed";

import "../../Stylings/Post.css";

import {BsTrash} from "react-icons/bs";

function Post({currentUser, post, handleDelete, handlePostLikes, handlePostDislikes, handleUnlikePost, handleUndislikePost}) {
   const userObj = post?.user; 

   let navigate = useNavigate();

   const clickUser = () => {
      navigate(`/all_users/${userObj?.id}`);
   }

   const viewMore = () => {
      navigate(`/blogs/${post?.id}`);
   }

   // Add ... after posts with more than 100 characters in length
   let renderOnMainPage;
   if (post?.blog_post?.length > 100) {
      renderOnMainPage = post?.blog_post?.slice(0, 100) + "...";
   } else {
      renderOnMainPage = post?.blog_post;
   }

   const postDate = new Date(post.created_at).toLocaleDateString();
   const postTime = new Date(post.created_at).toLocaleTimeString();

   const [clickedNum, setClickedNum] = useState(1);
   const [postLikes, setPostLikes] = useState(post?.likes);
   const [postDislikes, setPostDislikes] = useState(post?.dislikes);
   const [loginError, setLoginError] = useState("");

   return (
      <div className="post-div">
         
         <article className="single-post">
            <div className="user-info">
               <h3>
                  Posted by&nbsp;
                     <span
                        className="username-color"
                        onClick={clickUser}
                        style={{cursor: "pointer"}}
                     >
                        u/{userObj?.username}
                     </span> on {postDate} at {postTime}
               </h3>

               {currentUser?.username === userObj?.username
                  ? <BsTrash onClick={() => handleDelete(post.id)} className="delete-button" title="Delete Post"/>
                  : null}
            </div>

            <div className="post-header">
               <div className="likes-button-container">
                  {clickedNum === 1
                     ? <NeitherPressed
                           id={post?.id}
                           postLikes={postLikes}
                           setPostLikes={setPostLikes}
                           postDislikes={postDislikes}
                           setPostDislikes={setPostDislikes}
                           handlePostLikes={handlePostLikes}
                           handlePostDislikes={handlePostDislikes}
                           clickedNum={clickedNum}
                           setClickedNum={setClickedNum}
                           loginError={loginError}
                           setLoginError={setLoginError}
                       />
                     : clickedNum === 2
                        ? <LikesPressed
                              id={post?.id}
                              postLikes={postLikes}
                              setPostLikes={setPostLikes}
                              postDislikes={postDislikes}
                              setPostDislikes={setPostDislikes}
                              handleUnlikePost={handleUnlikePost}
                              handlePostDislikes={handlePostDislikes}
                              clickedNum={clickedNum}
                              setClickedNum={setClickedNum}
                          />
                        : <DislikesPressed
                              id={post?.id}
                              postLikes={postLikes}
                              setPostLikes={setPostLikes}
                              postDislikes={postDislikes}
                              setPostDislikes={setPostDislikes}
                              handlePostLikes={handlePostLikes}
                              handleUndislikePost={handleUndislikePost}
                              clickedNum={clickedNum}
                              setClickedNum={setClickedNum}
                          />
                  }
               </div>
                     &nbsp;
               <h2 className="post-title">{post.title}</h2>
            </div>

            <div className="post-info-underline"></div>

            {post.image_url ? <img src={post.image_url} alt={post.title}/> : null}

            <p>
               {renderOnMainPage}
            </p>
         </article>

         <div className="view-more-container">
            <em>
               {post?.comments?.length === 1
                  ? `${post?.comments?.length} Total Comment`
                  : `${post?.comments?.length} Total Comments`
               }
            </em>
               <br/>
            <button onClick={viewMore} className="post-view-more">
               VIEW MORE
            </button>
         </div>
      
      </div>
   );
}

export default Post;