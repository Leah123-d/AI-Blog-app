import { useNavigate } from "react-router-dom";

function PostsDisplay({ posts, fetchPosts, handleViewPost, fetchPostSearch, searchDate, handleSearchDate, searchPost,handleSearchReset }) {
  const navigate = useNavigate();

  //constrols the display all posts or the input from search date
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(searchDate){
      await fetchPostSearch(searchDate);
    }
  }

  const postsToDisplay = searchPost != null ? searchPost : posts;

  return (
    <div className="posts-container">
        <form onSubmit={handleSubmit}>
        <label htmlFor="startDate">enter a date</label>
          <input
					type="date" 
					value={searchDate} 
					id="date"
					onChange={handleSearchDate} />
          <button>search</button>
          <button onClick={handleSearchReset}>reset</button>
        </form>
      <h1>Posts</h1>
      {postsToDisplay.length > 0 ? (
        postsToDisplay.map((post) => (
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
