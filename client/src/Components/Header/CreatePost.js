import React, {useCallback, useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";

import {useSpring, animated} from "react-spring";

import {useDispatch, useSelector} from "react-redux";
import {setShowCreateBlog} from "../../Redux/Features/showCreateBlogSlice";

import "../../Stylings/CreatePost.css";

function CreatePost({blogData, setBlogData}) {
   let navigate = useNavigate();
   const dispatch = useDispatch();

   // State to handle current user's information
   const currentUser = useSelector(state => state.currentUser.value);
   // State to handle whether CreatePost component is shown or not
   const showCreateBlog = useSelector(state => state.showCreateBlog.value);

   // State to handle newly created blog's information; set the initial value to an object with its content set to match the backend :blog schema with default values
   const [newBlog, setNewBlog] = useState({
      user_id: currentUser?.id,
      title: "",
      blog_post: "",
      image_url: "",
      likes: 0,
      dislikes: 0
   });

   // Function to update newBlog state based on inputted values from Create Post's form
   const handleNewBlogInputs = e => {
      setNewBlog({
         ...newBlog,
         user_id: currentUser?.id,
         [e.target.name]:e.target.value
      });
   };

   // Function to create a new blog using information inside of the newBlog object
   // Didn't put currentUser check here because Create Post button shouldn't be available unless someone's logged in and the currentUser object exists
   const submitNewBlog = e => {
      e.preventDefault();
      
      fetch("/blogs", {
         method: "POST",
         headers: {"Content-Type" : "application/json"},
         body: JSON.stringify(newBlog)
      })
         .then(resp => {
            if (resp.ok) {
               resp.json()
                  .then(blog => {
                     setBlogData([blog, ...blogData]);
                  })
            }
         })
      // Clear all information inside of newBlog, hide CreatePost component, navigate to homepage
      setNewBlog({user_id: "", title: "", blog_post: "", image_url: "", likes: 0, dislikes: 0});
      dispatch(setShowCreateBlog(false));
      navigate("/");
   };

   // Close the modal when clicking on area outside of the modal
   const formRef = useRef();
   const closeForm = e => {
      if (formRef.current === e.target) {
         dispatch(setShowCreateBlog(false));
      }
   };

   // Close the modal using the "Escape" key
   const escPress = useCallback(e => {
      if (e.key === "Escape" && showCreateBlog) {
         dispatch(setShowCreateBlog(false));
      }
   }, [dispatch, showCreateBlog]);

   useEffect(() => {
      document.addEventListener("keydown", escPress);
      return () => document.removeEventListener("keydown", escPress);
   }, [escPress]);

   // Animate modal coming down from the top of the page
   const animation = useSpring({
      config: {
         duration: 275
      },
      opacity: showCreateBlog ? 1 : 0,
      transform: showCreateBlog ? `translateY(0%)` : `translateY(-300%)`
   });

   return (
      <>
      {showCreateBlog &&
         <section className="blog-form-background flex-center-all" onClick={closeForm} ref={formRef}>
            <animated.div style={animation}>
               <div className="create-blog-div text-align-center">
                  <button
                     onClick={() => dispatch(setShowCreateBlog(false))}
                     className="x-button cursor-pointer flex-center-all"
                  >
                     X
                  </button>
                  <form className="create-blog-form" onSubmit={submitNewBlog}>

                     <p>Title <span className="required-red">*</span></p>
                     <input
                        className="text-align-center"
                        onChange={handleNewBlogInputs}
                        type="text"
                        name="title"
                        value={newBlog.title}
                        autoComplete="off"
                        required
                     />

                     <p>Content <span className="required-red">*</span></p>
                     <textarea
                        className="text-align-center"
                        onChange={handleNewBlogInputs}
                        type="text"
                        name="blog_post"
                        value={newBlog.blog_post}
                        required
                        rows="5"
                        cols="50"
                     />

                     <p>Image</p>
                     <input
                        className="text-align-center"
                        onChange={handleNewBlogInputs}
                        type="text"
                        name="image_url"
                        value={newBlog.image_url}
                        autoComplete="off"
                     />

                     <button className="submit-form-button cursor-pointer">Submit!</button>                     
                  </form>

               </div>
            </animated.div>
         </section>
      }
      </>
   );
}

export default CreatePost;