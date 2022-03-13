const express = require("express");
const router = express();
const postController = require('../controllers/post.controller');

router.get('/', postController.listAllPosts);

router.post("/impacters", postController.listAllPostsFromImpacter);

router.get("/:id", postController.findPostById);

router.put("/:id", postController.updatePostById);

router.delete("/:id", postController.deletePostById);

module.exports = router;
