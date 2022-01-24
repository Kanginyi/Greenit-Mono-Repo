import React, {useState} from 'react';
import "../../Stylings/CategoryBar.css";
import Form from "./Form";

import {useNavigate} from 'react-router-dom';

function CategoryBar({handleAddPost}) {
   const [showForm, setShowForm] = useState(false);

   let navigate = useNavigate();

   return (
      <>
         <aside id="category-bar">
            <button>Hot</button>
            <button>Interactions</button>
            <button>New</button>
            <button onClick={() => navigate("/users")}>Users</button>
            <button onClick={() => setShowForm(true)}>Create Post</button>
         </aside>

         <Form
            showForm={showForm}
            setShowForm={setShowForm}
            handleAddPost={handleAddPost}
         />
      </>
   );
}

export default CategoryBar;