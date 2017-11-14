module.exports = {
    uniq,
    flatten,
    forEach,
};

/**
 * @param {Array} array
 * @return {Array}
 */
function uniq(array) {
    return array.reduce((memo, item) => {
        const includes = ~memo.indexOf(item);
        return includes ? memo : memo.concat(item);
    }, []);
}

/**
 * @param {Array.<Array>} array
 * @return {Array}
 */
function flatten(array) {
    return [].concat(...array);
}

/**
 * @param collection
 * @param {function} iteratee
 */
function forEach(collection, iteratee) {
    for (let i = 0; i < collection.length; i++) {
        iteratee(collection[i], i, collection);
    }
}