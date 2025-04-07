import express from 'express';
import{
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  searchPosts,
  getSocials,
  generateANDSavePostImage,
} from '../controllers/postsController.js';

const router = express.Router();

router.get("/search/:created_at",searchPosts);
router.get("/socials/:author",getSocials);
router.get("/:author", getPost);
router.get("/", getPosts);
router.post("/:id/image", generateANDSavePostImage);
router.post("/", createPost);
router.put("/:author", updatePost);
router.delete("/:author", deletePost);

export default router;