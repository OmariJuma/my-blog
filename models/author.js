const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    firstName: String,
    secondName: String,
    email: String,
    userRole: String,
});

module.exports = mongoose.model('Author', authorSchema);