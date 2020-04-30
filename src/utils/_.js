module.exports = {
    uniq,
    flatten,
    forEach,
    withoutSingle,
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
    if (collection.forEach) {
        collection.forEach(iteratee);
    } else if (typeof collection.length === 'number') {
        for (let i = 0; i < collection.length; i++) {
            iteratee(collection[i], i, collection);
        }
    } else {
        for (let keys = Object.keys(collection), i = 0; i < keys.length; i++) {
            const key = keys[i];
            iteratee(collection[key], key, collection);
        }
    }
}

function withoutIndex(arr, index) {
    return [].concat(arr.slice(0, index), arr.slice(index + 1));
}

function withoutSingle(arr, ...values) {
    return values.reduce((memo, value) => {
        const i = memo.indexOf(value);
        return ~i ? withoutIndex(memo, i) : memo;
    }, arr);
}
