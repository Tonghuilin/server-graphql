const { mongoose } = require('../db/mongoose');

const schema = mongoose.Schema({
    firstName:     {
        type:     String,
        required: true,
    },
    lastName:      {
        type:     String,
        required: true,
    },
    username:      String,
    password:      {
        type:     String,
        required: true,
    },
    mobile:        Number,
    createdAt:     {
        type:    Date,
        default: Date.now()
    },
    lastUpdatedAt: {
        type:    Date,
        default: Date.now()
    },
});

const User = mongoose.model('User', schema);

module.exports = {
    User,
};
