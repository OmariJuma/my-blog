const Article = require("../models/article"); // Import your Article model

const createArticle = async (req, res) => {
  try {
    const { title, text, category, authorId } = req.body;
    const article = new Article({ title, text, category, authorId });
    const createdArticle = await article.save();
    res.status(200).json(createdArticle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getArticles = async (req, res) => {
  try {
    const articles = await Article.find({});
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getArticle = async (req, res) => {
  try {
    const article = await Article.findById({ _id: req.params.id });
    if (!article || article.length == 0) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json(article);
  } catch (err) {
    res.status(500).json({ message: "Please stop trying to play with the id" });
  }
};
const updateArticle = async (req, res) => {
  try {
    const { title, text, category } = req.body;

    const updateFields = {};

    if (title !== undefined && title.length > 0) {
      updateFields.title = title;
    }

    if (text !== undefined && text.length > 0) {
      updateFields.text = text;
    }

    if (category !== undefined && category.length > 0) {
      updateFields.category = category;
    }

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: "No valid fields to update" });
    }

    const article = await Article.findOneAndUpdate(
      { _id: req.params.id },
      updateFields,
      { new: true }
    );

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    return res.status(200).json(article);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const articles = await Article.findOneAndDelete({ _id: req.params.id });
    if (!articles) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json({ message: "Article deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = {
  createArticle,
  getArticles,
  getArticle,
  updateArticle,
  deleteArticle,
};
