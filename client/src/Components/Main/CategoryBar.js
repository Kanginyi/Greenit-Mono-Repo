import React, {useState} from 'react';
import "../../Stylings/CategoryBar.css";
import Form from "./Form";

import {useNavigate} from 'react-router-dom';

import {FaSmileBeam} from "react-icons/fa";

function CategoryBar({handleAddPost}) {
   const [showForm, setShowForm] = useState(false);

   let navigate = useNavigate();

   return (
      <>
         <button
            id="create-post"
            onClick={() => setShowForm(true)}
            title="Create Post"
         >
            +
         </button>

         <button
            id="all-users"
            onClick={() => navigate("/users")}
            title="View All Users"
         >
            <FaSmileBeam id="users-smiley"/>
         </button>
         
         <Form
            showForm={showForm}
            setShowForm={setShowForm}
            handleAddPost={handleAddPost}
         />
      </>
   );
}

export default CategoryBar;