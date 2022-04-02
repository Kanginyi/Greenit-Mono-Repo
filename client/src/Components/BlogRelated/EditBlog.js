import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import ErrorPage from "../Helpers/ErrorPage";

import "../../Stylings/EditBlog.css";

function EditBlog({currentUser, blogData, setBlogData}) {
   let navigate = useNavigate();

   const URL = window.location.href;
   const editingID = parseInt(useParams().id);

   const checkBlogArray = blogData?.filter(blog => URL.endsWith(blog?.id));

   const checkBlog = (checkBlogArray?.filter(blog => blog?.id === editingID))[0];
   
   const [editBlog, setEditBlog] = useState({
      user_id: null,
      title: checkBlog?.title,
      blog_post: checkBlog?.blog_post,
      image_url: checkBlog?.image_url,
      likes: checkBlog?.likes,
      dislikes: checkBlog?.dislikes
   });

   const handleEditInputs = e => {
      setEditBlog({
         ...editBlog,
         user_id: currentUser?.id,
         [e.target.name]:e.target.value
      });
   };

   const updateBlog = () => {
      fetch(`/blogs/${checkBlog?.id}`, {
         method: "PATCH",
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify(editBlog)
      })
         .then(resp => {
            if (resp.ok) {
               resp.json()
                  .then(editedBlog => {
                     setBlogData([editedBlog, blogData]);
                  })
            }
         })
      navigate(`/blogs/${checkBlog?.id}`);
   };
      

   return (
      <>
      {currentUser?.id === checkBlog?.user?.id
         ?
            <div className="blog-div editing-blog">
               <h2 className="username-color">Hello {currentUser?.username}!</h2>
                  <br/>
               <h3>You're Currently Editing:</h3>
                  <br/>
               <h4>Title: <span className="required-red">*</span></h4>
               <input
                  type="text"
                  name="title"
                  onChange={handleEditInputs}
                  defaultValue={checkBlog?.title}
                  autoComplete="off"
                  spellCheck="false"
                  required
               />

               <h4>Content: <span className="required-red">*</span></h4>
               <textarea
                  name="blog_post"
                  onChange={handleEditInputs}
                  defaultValue={checkBlog?.blog_post}
                  rows="5"
                  required
               />

               <h4>Image:</h4>
               <input
                  type="text"
                  name="image_url"
                  onChange={handleEditInputs}
                  defaultValue={checkBlog?.image_url}
                  autoComplete="off"
                  spellCheck="false"
               />

               <button onClick={updateBlog}>
                  Update Post!
               </button>
            </div>
         :
            <ErrorPage />
      }
      </>
   );
}

export default EditBlog;