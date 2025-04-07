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
  const [findPost, setFindPost] = useState(null);
  const [authorPosts, setAuthorPosts] = useState([])
  const [posts, setPosts] = useState([]);
  const [errorHandle, setErrorHandle] = useState(false);
  const [imagePost, setImagePost] = useState(null);
  const [isReadPostOpen, setIsReadPostOpen] = useState(false);
  const [socials, setSocials] = useState(null);
  const [searchPost, setSearchPost] = useState(null);
  const [searchDate, setSearchDate] = useState("");

  const handleViewPost = (author) => {
    fetchSocials(author);
    setIsReadPostOpen(true);

    if (findPost && !findPost.post_image) {
      handleGenerateImage(findPost);
    }
  };
  const handleSearchDate = (e) =>{
    setSearchDate(e.target.value);
  }
  const handleSearchReset = () => {
    setSearchDate('');
    setSearchPost(null);
  }
  const fetchPosts = async (author) => {
    try {
      const url = author ? `/posts/${author}` : "/posts";
      const res = await fetch(url);

      if (!res.ok) throw new Error("Failed to fetch posts");

      const data = await res.json();
      console.log("fetched posts: ", data);

      if (author) {
        setAuthorPosts(data);
        setFindPost(data[0]);
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
  const fetchPostSearch = async (searchDate) => {
    try {
      const res = await fetch(`/posts/search/${searchDate}`);

      if (!res.ok) throw new Error("Failed to fetch search post");

      const data = await res.json();
      console.log("fetched data: ", data);

      setSearchPost(data);
    } catch (error) {
      console.error("Error fetching socials: ", error);
      setErrorHandle(true);
      return [];
    }
  }
  const handleGenerateImage = async (findPost) => {

    if(!findPost?.id){
      console.error("no post id found cannot fetch image");
      return;
    }
    try {
      const res = await fetch(`/posts/${findPost.id}/image`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: findPost.content }),
      });

      if (!res.ok) throw new Error("Failed to generate image");

      const data = await res.json();
      console.log("generated image data: ", data);
      
    } catch (error) {
      console.error("Error fetching fetching AI image: ", error);
      setErrorHandle(true);
      return [];
    }
  };
  const createNewPost = async (formData) => {
    //we're going to pass this function as a prop to the child comp form
    console.log("post submitted:", formData);

    try {
      await fetch("/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const response = await fetch('/posts');
      const data = await response.json();
      setPosts(data);
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
      await fetch(url, { method: "DELETE" });

      const response = await fetch('/posts');
      const data = await response.json();
      setPosts(data);
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
              fetchPostSearch={fetchPostSearch}
              searchDate={searchDate}
              handleSearchDate={handleSearchDate}
              searchPost={searchPost}
              handleSearchReset={handleSearchReset}
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
              authorPosts={authorPosts}
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
