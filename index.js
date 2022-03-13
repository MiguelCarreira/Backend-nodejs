const express = require("express");
const port = 8080;

const app = express();

app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const postsRouter = require("./src/routes/post.routes");

app.use("/posts", postsRouter);


app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);

