import React, {useState, useRef, useCallback, useEffect} from 'react';
import {useSpring, animated} from "react-spring";
import "../../Stylings/Form.css";

function Form({showForm, setShowForm, handleAddPost}) {
   const [blogForm, setBlogForm] = useState({
      username: "",
      title: "",
      content_post: "",
      image_url: "",
      likes: 0,
      dislikes: 0
   });

   const handleInputChange = e => {
      setBlogForm({
         ...blogForm,
         [e.target.name]:e.target.value
      });
   }

   const handleSubmit = e => {
      e.preventDefault()
      handleAddPost(blogForm)
   }

   // Close the modal when clicking outside of the modal
   const formRef = useRef();
   const closeForm = e => {
      if (formRef.current === e.target) {
         setShowForm(false);
      }
   }

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
         duration: 225
      },
      opacity: showForm ? 1: 0,
      transform: showForm ? `translateY(0%)` : `translateY(-100%)`
   });


   return (
      <>
      {showForm ?
         <section className="form-background" onClick={closeForm} ref={formRef}>
            <animated.div style={animation}>
            <div className="create-post-form">
               <div>
                  <button onClick={() => setShowForm(false)}>X</button>
                  <form className="form-modal" onSubmit={handleSubmit}>
                     <p>Name <span style={{color: "red"}}>*</span></p>
                     <input
                        onChange={handleInputChange}
                        type="text"
                        name="username"
                        value={blogForm.username}
                        autoComplete="off"
                        required
                     />

                     <p>Title <span style={{color: "red"}}>*</span></p>
                     <input
                        onChange={handleInputChange}
                        type="text"
                        name="title"
                        value={blogForm.title}
                        autoComplete="off"
                        required
                     />

                     <p>Content <span style={{color: "red"}}>*</span></p>
                     <textarea
                        onChange={handleInputChange}
                        type="text"
                        name="content_post"
                        value={blogForm.content_post}
                        rows="4"
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

                     <button id="submit-form">Submit!</button>                     
                  </form>
               </div>
            </div>
            </animated.div>
         </section>
      : null}
      </>
   );
}

export default Form;