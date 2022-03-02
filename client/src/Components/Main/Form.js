import React, {useState, useRef, useCallback, useEffect} from 'react';
import {useSpring, animated} from "react-spring";
import { useNavigate } from 'react-router-dom';
import "../../Stylings/Form.css";

function Form({currentUser, showForm, setShowForm, postData, setPostData}) {
   let navigate = useNavigate();

   const [blogForm, setBlogForm] = useState({
      user_id: null,
      title: "",
      blog_post: "",
      image_url: "",
      likes: 0,
      dislikes: 0
   });

   const handleInputChange = e => {
      setBlogForm({
         ...blogForm,
         user_id: currentUser?.id,
         [e.target.name]:e.target.value
      });
   };

   const handleSubmit = e => {
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
                     setPostData([post, ...postData])
                  })
            }
         })
      setBlogForm({user_id: "", title: "", blog_post: "", image_url: "", likes: 0, dislikes: 0});
      setShowForm(false);
      navigate("/");
   };

   // Close the modal when clicking outside of the modal
   const formRef = useRef();
   const closeForm = e => {
      if (formRef.current === e.target) {
         setShowForm(false);
      }
   };

   // Close the modal using the "Escape" key
   const escPress = useCallback(e => {
      if (e.key === "Escape" && showForm) {
         setShowForm(false);
      }
   }, [showForm, setShowForm]);

   useEffect(() => {
      document.addEventListener("keydown", escPress);
      return () => document.removeEventListener("keydown", escPress);
   }, [escPress]);

   // Animate modal popping up
   const animation = useSpring({
      config: {
         duration: 275
      },
      opacity: showForm ? 1: 0,
      transform: showForm ? `translateY(0%)` : `translateY(-300%)`
   });


   return (
      <>
      {showForm ?
         <section className="form-background" onClick={closeForm} ref={formRef}>
            <animated.div style={animation}>
            <div className="create-post-form">
               <button onClick={() => setShowForm(false)} className="x-button">X</button>
               <form className="form-modal" onSubmit={handleSubmit}>

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
      : null}
      </>
   );
}

export default Form;