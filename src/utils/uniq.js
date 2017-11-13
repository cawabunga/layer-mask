
/**
 * @param {Array} array
 * @return {Array}
 */
const uniq = (array) => {
    return array.reduce((memo, item) => {
        const includes = ~memo.indexOf(item);
        return includes ? memo : memo.concat(item);
    }, []);
};

module.exports = uniq;