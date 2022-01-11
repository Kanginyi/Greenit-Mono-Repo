import './App.css';
import React, {useState, useEffect} from "react";
import Posts from "./Components/Main/Posts";
import Navbar from "./Components/Header/Navbar";
import CategoryBar from "./Components/Main/CategoryBar";
import Users from "./Components/Main/Users";
import PostDetails from "./Components/Main/PostDetails";

import {Route, Routes} from "react-router-dom";

function App() {
   const [postData, setPostData] = useState([]);
   const [userData, setUserData] = useState([]);

   useEffect(() => {
      fetch(`http://localhost:9292/forum_posts`)
        .then(resp => resp.json())
        .then(data => setPostData(data))
    }, [])
  
    const [searchValue, setSearchValue] = useState("");
  
    function search(e) {
      setSearchValue(e.target.value);
    }
  
    //FORM SUBMITS
    const handleAddPost = post => {
      fetch(`http://localhost:9292/forum_posts`, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(post)
      })
      .then(res => res.json())
      .then(post => {
        setPostData([
         ...postData, post 
        ])
      })
    }
  
    //post delete
    const handleDelete = id => {
      fetch(`http://localhost:9292/forum_posts/${id}`,{
        method : 'DELETE'
      })
      .then(() => {
        const deletePost = postData.filter(post => post.id !== id)
        setPostData(deletePost)
      })
    }

  return (
    <div className="App">
      
      <header className="sticky">
         <Navbar search={search}/>
      </header>

      <main>
         <CategoryBar handleAddPost={handleAddPost}/>
            <Routes>
               <Route path="/" element={
                  <Posts
                     data={postData}
                     search={search}
                     searchValue={searchValue}
                     handleDelete={handleDelete}
                  />
               }/>
               <Route path="/users" element={<Users userData={userData}/>}/>
               <Route path="/users/:id" element={<PostDetails userData={userData}/>}/>
            </Routes>
      </main>

    </div>
  );
}

export default App;