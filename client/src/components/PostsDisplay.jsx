function PostsDisplay({ posts, fetchPosts }) {
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
            <p>{post.content}</p>
            <p>{post.created_at}</p>
            {/* <button onClick={async () => {await fetchPosts(post.author);
                                              //  handleViewPost(post.author);
                                               }}
                                               >view more
            </button> */}
          </div>
        ))
      ) : (
        <p>no posts found</p>
      )}
    </div>
  );
}

export default PostsDisplay;
