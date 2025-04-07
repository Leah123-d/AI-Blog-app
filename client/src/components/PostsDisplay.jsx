//to-do: adjust the serach bar, will need an on change or store the date some where to pass it to the function in the parent component


import { useNavigate } from "react-router-dom";

function PostsDisplay({ posts, fetchPosts, handleViewPost, fetchPostSearch }) {
  const navigate = useNavigate();

  return (
    <div className="posts-container">
      <div>
        <section role="search">
          <input type="date" />
        </section>
        <a onClick={fetchPostSearch} href="#search">Search</a>
      </div>
      <h1>Posts</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id}>
            <p>{post.author}</p>
            <p>{post.title}</p>
            <button
              onClick={async () => {
                await fetchPosts(post.author);
                handleViewPost(post.author);
                navigate("/view");
              }}
            >
              read post
            </button>
          </div>
        ))
      ) : (
        <p>no posts found</p>
      )}
    </div>
  );
}

export default PostsDisplay;
