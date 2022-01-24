import React, {useState} from 'react';
import "../../Stylings/CategoryBar.css";
import Form from "./Form";

function CategoryBar({handleAddPost}) {
   const [showForm, setShowForm] = useState(false);

   return (
      <>
         <button id="create-post" onClick={() => setShowForm(true)}>+</button>

         <Form
            showForm={showForm}
            setShowForm={setShowForm}
            handleAddPost={handleAddPost}
         />
      </>
   );
}

export default CategoryBar;