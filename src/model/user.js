const { mongoose } = require('../db/mongoose');

const schema = mongoose.Schema(
    {
        username:     { type: String, default: '', unique: true },
        password:     { type: String, required: true },
        firstName:    { type: String, required: true },
        lastName:     { type: String, required: true },
        mobile:       { type: String, default: '' },
        social:       {
            wechat: { type: String, default: '' },
            weibo:  { type: String, default: '' },
            qq:     { type: String, default: '' },
            email:  { type: String, default: '' },
        },
        lastLoggedIn: { type: String, default: '' },
        archived:     { type: Boolean, default: false },
        role:         { type: String, default: 'USER' },
    },
    {
        timestamps: {
            updatedAt: 'lastUpdatedAt',
        },
    },
);

const User = mongoose.model('User', schema);

module.exports = {
    User,
};
