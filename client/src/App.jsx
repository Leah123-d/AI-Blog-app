//To-Do:
//build routes for links to go to specific pages

import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";

// App components
import CreateNewPost from "./components/CreateNewPost";
import ErrorHandle from "./components/ErrorHandle";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Posts from "./components/PostsDisplay";
import ViewPost from "./components/ViewPost";

export function App() {
  const [findPost, setFindPost] = useState([]);
  const [posts, setPosts] = useState([]);
  const [errorHandle, setErrorHandle] = useState(false);
  const [imagePost, setImagePost] = useState(null);

  const fetchPosts = async (author) => {
    try {
      const url = author ? `/posts/${author}` : "/posts";
      const res = await fetch(url);

      if (!res.ok) throw new Error("Failed to fetch posts");

      const data = await res.json();
      console.log("fetched posts: ", data);

      if (author) {
        setFindPost(data);
        return data;
      } else {
        setPosts(data);
      }
    } catch (error) {
      console.error("Error fetchig posts: ", error);
      setErrorHandle(true);
      return [];
    }
  };
  const fetchaiImage = async (content) => {
    try {
      const res = await fetch(`/ai/getaiImage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      if (!res.ok) throw new Error("Failed to fetch AI image");

      const data = await res.json();
      console.log("fetched data: ", data);

      setImagePost(data);
    } catch (error) {
      console.error("Error fetching starsign: ", error);
      setErrorHandle(true);
      return [];
    }
  };
  const createNewPost = async (formData) => {
    //we're going to pass this function as a prop to the child comp form
    console.log("contact submitted:", formData);

    try {
      const response = await fetch("/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("error fetching data: ", error);
      setErrorHandle(true);
    }
  };
  const deletePost = async (author) => {
    console.log("Deleting contact with ID:", author);
    try {
      const url = `/posts/${author}`;
      const response = await fetch(url, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      console.log(`${author} entry successfully deleted!`);
    } catch (error) {
      console.log(error);
      setErrorHandle(true);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="appContainer">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="posts"
          element={<Posts posts={posts} fetchPosts={fetchPosts} />}
        />
        <Route
          path="create"
          element={<CreateNewPost createNewPost={createNewPost} />}
        />
        <Route path="view" element={<ViewPost />} />
        <Route path="*" element={<ErrorHandle />} />
      </Routes>
    </div>
  );
}

export default App;
