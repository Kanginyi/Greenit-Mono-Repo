import React, {useState} from 'react';
import "../../Stylings/CategoryBar.css";
import Form from "./Form";
import {Link} from "react-router-dom";

function CategoryBar({handleAddPost}) {
   const [showForm, setShowForm] = useState(null);

   return (
      <>
         <div id="category-bar">
            <button>Hot</button>
            <button>Everywhere</button>
            <button>New</button>
            <Link to="/users">Users</Link>
            <div className="show-forum">
               <button onClick={() => setShowForm(true)}>Create Post</button>
            </div>
         </div>

         <div>
            {showForm ? <Form setShowForm={setShowForm} handleAddPost={handleAddPost}/> : false}
         </div>
      </>
   );
}

export default CategoryBar;