import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import ErrorPage from "../Helpers/ErrorPage";
import Loader from "../Helpers/Loader";

import {useSelector} from "react-redux";

import "../../Stylings/EditBlog.css";

function EditBlog({blogData, setBlogData}) {
   let navigate = useNavigate();

   const currentUser = useSelector(state => state.currentUser.value);

   // State to handle current editing blog's information
   const [editBlogInfo, setEditBlogInfo] = useState({});
   // State to handle whether to show Loader component or not
   const [isLoaded, setIsLoaded] = useState(false);

   // Blog post's id
   const blogID = parseInt(useParams().id);

   // Fetch to get the current editing blog's information
   useEffect(() => {
      fetch(`/blogs/${blogID}`)
         .then(resp => resp.json())
         .then(blog => {
            setEditBlogInfo(blog);
            setIsLoaded(true);
         }) 
   }, [blogID]);

   // Function to update editBlogInfo state based on inputted values from component's inputs
   const handleEditInputs = e => {
      setEditBlogInfo({
         ...editBlogInfo,
         user_id: currentUser?.id,
         [e.target.name]:e.target.value
      });
   };

   // Function to update relevant blog using blog's id and the information inside of the editBlogInfo object
   // After the response comes back okay, setBlogData array to include the updatedBlog object
   const updateBlog = () => {
      fetch(`/blogs/${blogID}`, {
         method: "PATCH",
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify(editBlogInfo)
      })
         .then(resp => {
            if (resp.ok) {
               resp.json()
                  .then(updatedBlog => {
                     setBlogData(blogData, updatedBlog);
                  })
            }
         })
      navigate(`/blogs/${blogID}`);
   };

   // If isLoaded is still false, show Loader component
   if (!isLoaded) {
      return <Loader />
   };

   return (
      <>
      {/* If currentUser's id is the same as the editBlogInfo's id, render the options to edit the blog post. If not, then render ErrorPage component */}
      {currentUser?.id === editBlogInfo?.user?.id
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
                  defaultValue={editBlogInfo?.title}
                  autoComplete="off"
                  spellCheck="false"
                  required
               />

               <h4>Content: <span className="required-red">*</span></h4>
               <textarea
                  name="blog_post"
                  onChange={handleEditInputs}
                  defaultValue={editBlogInfo?.blog_post}
                  rows="5"
                  required
               />

               <h4>Image:</h4>
               <input
                  type="text"
                  name="image_url"
                  onChange={handleEditInputs}
                  defaultValue={editBlogInfo?.image_url}
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