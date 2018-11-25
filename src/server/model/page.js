const { mongoose } = require('../db/mongoose');

const schema = mongoose.Schema({
    title:         { type: String, required: true },
    author:        { type: String, required: true },
    summary:       String,
    body:          String,
    createdAt:     { type: Date, default: Date.now() },
    lastUpdatedAt: { type: Date, default: Date.now() },
});

const Page = mongoose.model('Page', schema);

module.exports = {
    Page
};
