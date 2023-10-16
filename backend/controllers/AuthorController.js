const Author = require("../models/author");
const createAuthor = async (req, res) => {
  try {
    const { firstName, secondName, email, userRole } = req.body;
    if (
      firstName?.length > 0 &&
      secondName?.length > 0 &&
      email?.includes("@") &&
      email?.includes(".") &&
      userRole?.length > 0
    ) {
      const findEmail = await Author.findOne({ email: email });
      if (findEmail) {
        return res.status(400).json({
          message: "Email already exists, please use a different one",
        });
      }
      const createAuthor = await new Author({
        firstName,
        secondName,
        email,
        userRole,
      });
      const createdAuthor = createAuthor.save();
      return res.status(200).json(createdAuthor);
    } else {
      return res
        .status(400)
        .json({ message: "Please fill in the fields correctly" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const author = await Author.findById({ _id: id });
    if (!author) {
      return res.status(400).json({ message: "Author does not exist" });
    }
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAuthors = async (req, res) => {
  try {
    const authors = await Author.find({});
    if (!authors) {
      return res.status(400).json({ message: "Sorry, no authors found" });
    }
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateAuthor = async (req, res) => {
  try {
    const updateFields = {};
    const { firstName, secondName, email } = req.body;
    const { id } = req.params;
    if (firstName?.length > 0) {
      updateFields.firstName = firstName;
    }
    if (secondName?.length > 0) {
      updateFields.secondName = secondName;
    }
    if (email?.length > 0) {
      updateFields.email = email;
    }
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }
    const foundAuthor = await Author.findOneAndUpdate(
      { _id: id },
      updateFields ,
      { new: true }
    );
    if (!foundAuthor) {
      return res.status(400).json({ message: "Author not found" });
    }
    res.status(200).json(foundAuthor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const author = await Author.findByIdAndDelete({ _id: id });
    if (!author) {
      return res.status(400).json({ message: "Author not found" });
    }
    res.status(200).json({ message: "Author deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createAuthor,
  updateAuthor,
  deleteAuthor,
  getAuthor,
  getAuthors,
};
