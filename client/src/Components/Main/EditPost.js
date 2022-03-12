import React, { useState } from 'react';
import ErrorPage from "../Main/ErrorPage";

import {useNavigate, useParams} from "react-router-dom";
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

   console.log(editPost);

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
                     setPostData([editedPost, ...postData]);
                  })
            }
         })

      navigate(`/blogs/${checkPost?.id}`);
   };
      

   return (
      <>
      {currentUser?.id === checkPost?.user?.id
         ?
            <div>
               Placeholder testerino

               <input
                  type="text"
                  name="title"
                  onChange={handleEditInputs}
                  defaultValue={checkPost?.title}
                  autoComplete="off"
                  spellCheck="false"
                  required
               />

               <textarea
                  name="blog_post"
                  onChange={handleEditInputs}
                  defaultValue={checkPost?.blog_post}
                  required
               />

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