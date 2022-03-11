import React from 'react';
import ErrorPage from "../Main/ErrorPage";

import {useNavigate, useParams} from "react-router-dom";
import "../../Stylings/EditPost.css";

function EditPost({currentUser, postData, setPostData}) {
   let navigate = useNavigate();

   const URL = window.location.href;
   const editingID = parseInt(useParams().id);

   const checkPostArray = postData?.filter(post => URL.endsWith(post?.id));

   const checkPost = (checkPostArray?.filter(post => post?.id === editingID))[0];

   console.log(checkPost);

   // console.log(editingID);

   const updatePost = () => {
      // fetch(`/blogs/${currentBlogInfo?.id}`, {
      //    method: "PATCH",
      //    headers: {"Content-Type": "application/json"},
      //    body: 
      // })

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
                  defaultValue={checkPost?.title}
                  autoComplete="off"
                  spellCheck="false"
               />

               <textarea defaultValue={checkPost?.blog_post}/>

               <input
                  type="text"
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