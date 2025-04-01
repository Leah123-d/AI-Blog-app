import express from 'express';
import{
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  searchPosts,
  getSocials
} from '../controllers/postsController.js';

const router = express.Router();

router.get("/search/:author",searchPosts);
router.get("socials/:author",getSocials);
router.get("/:author", getPost);
router.get("/", getPosts);
router.post("/", createPost);
router.put("/:author", updatePost);
router.delete("/:author", deletePost);

export default router;