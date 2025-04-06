//to-do:
//add display for socials, if column for socials is not null display the socials icon
//can make if statements or swtich case for the different icons linked to the author's URLs
//delete can be adjusted to delete the image only and have the option to generate a new one
//limit the delete to once every 5 hours? 
//not showing up with route need to fix
//might need to abstract some functions to make this component reuseable? 

import { useState } from "react";
import { TfiTrash } from "react-icons/tfi";
import { SlPencil } from "react-icons/sl";
import { IoClose } from "react-icons/io5";
import { MdDoneOutline } from "react-icons/md";

function ViewPost({ findPost, deletePost, isReadPostOpen, setIsReadPostOpen, imagePost }) {
  const [editContent, setEditContent] = useState("");
  const [isEditOpen, setisEditOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  if (!findPost || findPost.length === 0) {
    return;
  }
  const handleEditClick = (post) => {
    setSelectedPost(post);
    setEditContent(post.content);
    setisEditOpen(true);
  };

  const handleContentChanges = async () => {
    if (!selectedPost) return;
    try {
      const url = `/posts/${selectedPost.author}`;
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify({ content: editContent }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("update failed");
      }
      console.log("update successful!");
      setisEditOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return isReadPostOpen ? (
    <div className="container">
      {findPost.map((post) => (
        <div key={post.id}>
          <h1>
            <span className="icon">
              <button
                className="editButton"
                onClick={() => handleEditClick(post)}
              >
                <SlPencil />
              </button>
            </span>
            {post.title}
          </h1>
          {/* placeholder for image, adjust to embed AI image */}
          {/* replace src to dynmically render with AI image */}
          <img src={imagePost} alt="Notebook" style={{width:100}} />
          <div className="content">
            <h1>{post.title}</h1>
            <p>{post.cotent}</p>
          </div>
          <p>Author: {post.author}</p>
          <p>Content: {post.content}</p>
          <p>Notes: {post.image}</p>
          <p>Favorite: {post.favorite}</p>
          {isEditOpen && selectedPost?.author === post.author && (
            <div className="modal">
              <h3>edit content</h3>
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <button onClick={handleContentChanges}>
                <MdDoneOutline />
              </button>
              <button onClick={() => setisEditOpen(false)}>close edit</button>
            </div>
          )}
          <button
            onClick={() => {
              if (post?.author) {
                deletePost(post.author);
              } else {
                console.error("post author is undefined");
              }
            }}
          >
            <TfiTrash />
          </button>
          <button onClick={() => setIsReadPostOpen(false)}>
            <IoClose />
          </button>
        </div>
      ))}
    </div>
  ) : null;
}

export default ViewPost;
