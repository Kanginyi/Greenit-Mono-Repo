import React, {useState} from 'react';
import "../../Stylings/CategoryBar.css";
import Form from "./Form";

import {useNavigate} from 'react-router-dom';

function CategoryBar({handleAddPost}) {
   const [showForm, setShowForm] = useState(null);

   let navigate = useNavigate();

   return (
      <>
         <aside id="category-bar">
            <button>Hot</button>
            <button>Interactions</button>
            <button>New</button>
            <button onClick={() => navigate("/users")}>Users</button>
            <button onClick={() => setShowForm(prevValue => !prevValue)}>Create Post</button>

            {/* <div className="show-forum">
               <button onClick={() => setShowForm(true)}>Create Post</button>
            </div> */}
         </aside>

         <div>
            {showForm ? <Form setShowForm={setShowForm} handleAddPost={handleAddPost}/> : false}
         </div>
      </>
   );
}

export default CategoryBar;