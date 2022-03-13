const db = require("../db/connection");

// ==> Responsible method to show all 'Posts':
exports.listAllPosts = async (req, res) => {
  const response = await db
    .query("SELECT * FROM co_posts ORDER BY post_id")
    .catch((error) => {
      console.log(error);
    });
  res.status(200).send(response.rows);
};

// ==> Responsible method to show all 'Posts' from Impacter 'id':
exports.listAllPostsFromImpacter = async (req, res) => {
  const query =
    "SELECT p.* FROM co_posts p LEFT JOIN co_impacters i ON p.impacter_id = i.impacter_id where i.name = $1";
  const impacterName = parseInt(req.params.name);
  const response = await db.query(query, value).catch((error) => {
    console.log(error);
  });
  if (response.rowCount > 0) {
    res.status(201).json(response.rows);
  } else {
    res.status(404).json({ post_id: "Not found!" });
  }
};

// ==> Responsible method to update a 'Post' from 'id':
exports.updatePostById = async (req, res) => {
  const postId = parseInt(req.params.id);
  const { description, data } = req.body;
  const query = `UPDATE "co_posts" 
                   SET "description" = $1,
                   "data" = $2
                   WHERE "post_id" = $3`;

  const response = await db
    .query(query, [description, JSON.stringify(data), postId])
    .catch((error) =>       console.log(error));

    if(response.rowCount > 0)
    res.status(200).send({ message: 'Post Updated Successfully!', postId });
  else
    res.status(404).send({ message: "Post not found!"});

};

// ==> Responsible method to show a 'Post' from 'id':
exports.findPostById = async (req, res) => {
  const query = "SELECT * FROM co_posts WHERE post_id = $1";
  const postId = parseInt(req.params.id);
  const response = await db.query(query, [postId]).catch((error) => {
    console.log(error);
  });
  if(response.rowCount > 0)
    res.status(200).send(response.rows);
  else
    res.status(404).send({ message: "Post not found!"});
};

// ==> Responsible method to delete a 'Post' from 'id':
exports.deletePostById = async (req, res) => {
  const postId = parseInt(req.params.id);
  const query = "DELETE FROM co_posts WHERE post_id = $1";
  await db
    .query(query, [postId])
    .then((rows) => {
      if (rows.rowCount > 0) {
        console.log(`Deleted post_id : ${postId}`);
        res.status(201).json({ message: "Post deleted successfully!", postId });
      } else {
        console.log("No post id found!");
        res.status(404).json({ message: "Post not found!" });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
