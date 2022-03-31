import React, {useState, useRef, useCallback, useEffect} from "react";

import {useSpring, animated} from "react-spring";

import {useNavigate} from "react-router-dom";

import "../../Stylings/Form.css";

function Form({currentUser, postData, setPostData, showCreatePost, setShowCreatePost}) {
   let navigate = useNavigate();

   // State to handle newly created blog's initial values
   const [blogForm, setBlogForm] = useState({
      user_id: null,
      title: "",
      blog_post: "",
      image_url: "",
      likes: 0,
      dislikes: 0
   });

   // Function to update blogForm state based on inputted values from Create Post's form
   const handleInputChange = e => {
      setBlogForm({
         ...blogForm,
         user_id: currentUser?.id,
         [e.target.name]:e.target.value
      });
   };

   // Function to create post using information inside of blogForm
   // Didn't put currentUser check here because Create Post button shouldn't be available unless someone's logged in and the currentUser object exists
   const submitGreenitPost = e => {
      e.preventDefault();
      
      fetch("/blogs", {
         method: "POST",
         headers: {"Content-Type" : "application/json"},
         body: JSON.stringify(blogForm)
      })
         .then(resp => {
            if (resp.ok) {
               resp.json()
                  .then(post => {
                     setPostData([post, ...postData]);
                  })
            }
         })
      // Clear all information inside of blogForm, hide CreatePost component, navigate to homepage
      setBlogForm({user_id: "", title: "", blog_post: "", image_url: "", likes: 0, dislikes: 0});
      setShowCreatePost(false);
      navigate("/");
   };

   // Close the modal when clicking on area outside of the modal
   const formRef = useRef();
   const closeForm = e => {
      if (formRef.current === e.target) {
         setShowCreatePost(false);
      }
   };

   // Close the modal using the "Escape" key
   const escPress = useCallback(e => {
      if (e.key === "Escape" && showCreatePost) {
         setShowCreatePost(false);
      }
   }, [showCreatePost, setShowCreatePost]);

   useEffect(() => {
      document.addEventListener("keydown", escPress);
      return () => document.removeEventListener("keydown", escPress);
   }, [escPress]);

   // Animate modal coming down from the top of the page
   const animation = useSpring({
      config: {
         duration: 275
      },
      opacity: showCreatePost ? 1 : 0,
      transform: showCreatePost ? `translateY(0%)` : `translateY(-300%)`
   });

   return (
      <>
      {showCreatePost
         ?
            <section className="form-background" onClick={closeForm} ref={formRef}>
               <animated.div style={animation}>
                  <div className="create-post-form">
                     <button onClick={() => setShowCreatePost(false)} className="x-button">X</button>
                     <form className="form-modal" onSubmit={submitGreenitPost}>

                        <p>Title <span className="required-red">*</span></p>
                        <input
                           onChange={handleInputChange}
                           type="text"
                           name="title"
                           value={blogForm.title}
                           autoComplete="off"
                           required
                        />

                        <p>Content <span className="required-red">*</span></p>
                        <textarea
                           onChange={handleInputChange}
                           type="text"
                           name="blog_post"
                           value={blogForm.blog_post}
                           required
                           rows="5"
                           cols="50"
                        />

                        <p>Image</p>
                        <input
                           onChange={handleInputChange}
                           type="text"
                           name="image_url"
                           value={blogForm.image_url}
                           autoComplete="off"
                        />

                        <button id="submit-form-button">Submit!</button>                     
                     </form>

                  </div>
               </animated.div>
            </section>
         :
            null
      }
      </>
   );
}

export default Form;