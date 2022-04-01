import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import ErrorPage from "../Helpers/ErrorPage";

import "../../Stylings/EditPost.css";

function EditPost({currentUser, postData, setPostData}) {
   let navigate = useNavigate();

   const URL = window.location.href;
   const editingID = parseInt(useParams().id);

   const checkPostArray = postData?.filter(post => URL.endsWith(post?.id));

   const checkPost = (checkPostArray?.filter(post => post?.id === editingID))[0];
   
   const [editPost, setEditPost] = useState({
      user_id: null,
      title: checkPost?.title,
      blog_post: checkPost?.blog_post,
      image_url: checkPost?.image_url,
      likes: checkPost?.likes,
      dislikes: checkPost?.dislikes
   });

   const handleEditInputs = e => {
      setEditPost({
         ...editPost,
         user_id: currentUser?.id,
         [e.target.name]:e.target.value
      });
   };

   const updatePost = () => {
      fetch(`/blogs/${checkPost?.id}`, {
         method: "PATCH",
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify(editPost)
      })
         .then(resp => {
            if (resp.ok) {
               resp.json()
                  .then(editedPost => {
                     setPostData([editedPost, postData]);
                  })
            }
         })
      navigate(`/blogs/${checkPost?.id}`);
   };
      

   return (
      <>
      {currentUser?.id === checkPost?.user?.id
         ?
            <div className="post-div editing-post">
               <h2 className="username-color">Hello {currentUser?.username}!</h2>
                  <br/>
               <h3>You're Currently Editing:</h3>
                  <br/>
               <h4>Title: <span className="required-red">*</span></h4>
               <input
                  type="text"
                  name="title"
                  onChange={handleEditInputs}
                  defaultValue={checkPost?.title}
                  autoComplete="off"
                  spellCheck="false"
                  required
               />

               <h4>Content: <span className="required-red">*</span></h4>
               <textarea
                  name="blog_post"
                  onChange={handleEditInputs}
                  defaultValue={checkPost?.blog_post}
                  rows="5"
                  required
               />

               <h4>Image:</h4>
               <input
                  type="text"
                  name="image_url"
                  onChange={handleEditInputs}
                  defaultValue={checkPost?.image_url}
                  autoComplete="off"
                  spellCheck="false"
               />

               <button onClick={updatePost}>
                  Update Post!
               </button>
            </div>
         :
            <ErrorPage />
      }
      </>
   );
}

export default EditPost;