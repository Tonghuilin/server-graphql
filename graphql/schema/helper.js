const assign = require('lodash/fp/assign');

/**
 * generate projection object for mongoose
 * @param  {Object} fieldASTs
 * @return {Project}
 */
const getProjection = (fieldASTs) => {
    const projections = fieldASTs.fieldNodes[0].selectionSet.selections.reduce((projections, selection) => {
        return projections.concat(selection.name.value);
    }, []);

    return projections.join(' '); // mongoose;
};

/**
 * default validator of filterProps
 *
 * @param val
 * @returns {boolean}
 */
const notUndefined = (val) => typeof val !== 'undefined';

/**
 *
 * @param {object}    args
 * @param {function}  validator      (val, key) => boolean
 * @returns {{}}
 */
const filterProps = (obj = {}, validator = notUndefined) => Object.keys(obj).reduce(
    (filtered, key) => {
        const val = obj[key];
        return validator(val, key) ? assign(filtered, { [key]: val }) : filtered;
    }, {});

module.exports = {
    getProjection,
    filterProps,
};
