//To-Do:
//add google font, space grotesque
//review socials route

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
  const [isReadPostOpen, setIsReadPostOpen] = useState(false);
  const [socials, setSocials] = useState(null);

  const handleViewPost = (author) => {
    fetchSocials(author);
    setIsReadPostOpen(true);

    if (findPost && !findPost.post_image) {
      handleGenerateImage(findPost);
    }
    
  };

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
  const fetchSocials = async (author) => {
    try {
      const res = await fetch(`/posts/socials/${author}`);

      if (!res.ok) throw new Error("Failed to fetch socials");

      const data = await res.json();
      console.log("fetched data: ", data);

      setSocials(data);
    } catch (error) {
      console.error("Error fetching socials: ", error);
      setErrorHandle(true);
      return [];
    }
  };

  //use this route when generating a new image or a secondary image
  const handleGenerateImage = async (post) => {
    if (post?.post_image != ""){
      return;
    } 

    try {
      const res = await fetch(`/posts/${post.id}/image`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: post.content }),
      });

      if (!res.ok) throw new Error("Failed to generate image");

      const data = await res.json();
      console.log("generated image data: ", data);

      setFindPost(prevPost => ({...prevPost, post_image: data.post_image}));
      //if the post does not have an image
      //AI will generate one and we will re-fetch the post to view the image
    } catch (error) {
      console.error("Error fetching fetching AI image: ", error);
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
          element={
            <Posts
              posts={posts}
              fetchPosts={fetchPosts}
              handleViewPost={handleViewPost}
            />
          }
        />
        <Route
          path="create"
          element={<CreateNewPost createNewPost={createNewPost} />}
        />
        <Route
          path="view"
          element={
            <ViewPost
              findPost={findPost}
              deletePost={deletePost}
              setIsReadPostOpen={setIsReadPostOpen}
              isReadPostOpen={isReadPostOpen}
              socials={socials}
              imagePost={imagePost}
            />
          }
        />
        <Route path="*" element={<ErrorHandle />} />
      </Routes>
    </div>
  );
}

export default App;
