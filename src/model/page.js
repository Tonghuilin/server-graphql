const { mongoose } = require('../db/mongoose');

const schema = mongoose.Schema(
    {
        title:         { type: String, required: true },
        author:        { type: String, required: true },
        summary:       { type: String, default: '' },
        body:          { type: String, default: '' },
        archived:      { type: Boolean, default: false },
    },
    {
        timestamps: {
            updatedAt: 'lastUpdatedAt',
        },
    }
);

const Page = mongoose.model('Page', schema);

module.exports = {
    Page,
};
