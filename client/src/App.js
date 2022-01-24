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
      fetch("/blogs")
        .then(resp => resp.json())
        .then(data => setPostData(data));
    }, [])
  
    const [searchValue, setSearchValue] = useState("");
  
    function search(e) {
      setSearchValue(e.target.value);
    }

   useEffect(() => {
      fetch("/users")
         .then(resp => resp.json())
         .then(data => setUserData(data));
   }, []);
  
    //FORM SUBMITS
    const handleAddPost = post => {
      fetch("/blogs", {
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
      fetch(`/blogs/${id}`,{
        method : 'DELETE'
      })
      .then(() => {
        const deletePost = postData.filter(post => post.id !== id)
        setPostData(deletePost)
      })
    }

  return (
    <div className="App">
      
      <header className="fixed-navbar">
         <Navbar search={search}/>
      </header>

      <main>
         <CategoryBar handleAddPost={handleAddPost}/>
            <Routes>
               <Route path="/" element={
                  <Posts
                     data={postData}
                     searchValue={searchValue}
                     handleDelete={handleDelete}
                  />
               }/>
               <Route path="/users" element={
                  <Users
                     userData={userData}
                     searchValue={searchValue}
                  />
               }/>
               <Route path="/users/:id" element={<PostDetails userData={userData}/>}/>
            </Routes>
      </main>

    </div>
  );
}

export default App;