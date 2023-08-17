const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: String,
    text: String,
    category: String,
    authorId: String
});

module.exports = mongoose.model('Article', articleSchema);