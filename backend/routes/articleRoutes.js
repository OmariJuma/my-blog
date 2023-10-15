const router = require("express").Router();
const {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  getArticle,
} = require("../controllers/ArticleController");
router.get("/articles", getArticles);
router.post("/articles", createArticle);
router.get("/articles/:id", getArticle);
router.patch("/articles/:id", updateArticle);
router.delete("/articles/:id", deleteArticle);
module.exports = router;
