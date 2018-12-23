const { Page: PageModel } = require('../../model/page');
const { filterProps }     = require('../helper');

/**
 * get one
 *
 * @param parent
 * @param id
 * @returns {Query}
 */
const getPage = (parent, { id }) => {
    return PageModel.findById(id);
};

/**
 * get many
 *
 * @param parent
 * @param term
 * @param author
 * @returns {*}
 */
const getPages = (parent, { term, author }) => {
    const termReg = new RegExp(term, 'i');

    return PageModel.find({
        $and: [
            {
                $or: [
                    { title: { $regex: termReg } },
                    { summary: { $regex: termReg } },
                    { body: { $regex: termReg } },
                ],
            },
            author ? { author: { $eq: author } } : {},
        ],
    });
};

/**
 * create one
 *
 * @param parent
 * @param title
 * @param author
 * @param summary
 * @param body
 * @returns {*}
 */
const createPage = (parent, { title, author, summary, body }) => {
    return PageModel.create({ title, author, summary, body });
};

/**
 * update one
 *
 * @param parent
 * @param id
 * @param title
 * @param summary
 * @param body
 * @param archived
 * @returns {Query}
 */
const updatePage = (parent, { id, title, summary, body, archived }) => {
    const content = filterProps({ title, summary, body, archived });
    return PageModel.findByIdAndUpdate(id, content, { new: true });
};

/**
 * delete one
 *
 * @param parent
 * @param id
 * @returns {Query}
 */
const deletePage = (parent, { id }) => {
    return PageModel.findOneAndRemove({ _id: id });
};

module.exports = {
    getPage,
    getPages,
    createPage,
    updatePage,
    deletePage,
};
