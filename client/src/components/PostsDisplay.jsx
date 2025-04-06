import { useNavigate } from "react-router-dom";

function PostsDisplay({ posts, fetchPosts, handleViewPost }) {
  const navigate = useNavigate();
  
  return (
    <div className="posts-container">
      <div>
        <section role="search">
          <input type="date" />
        </section>
        <a href="#search">Search</a>
      </div>
      <h1>Posts</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id}>
            <p>{post.author}</p>
            <p>{post.title}</p>
            <button onClick={async () => {await fetchPosts(post.author);
                                               handleViewPost(post.author,post.content);
                                                navigate("/view");
                                               }}
                                               >read post
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
