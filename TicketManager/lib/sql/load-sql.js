const { QueryFile } = require('pg-promise');
const { join: joinPath } = require('path');
function load(file) {
    const fullPath = joinPath(__dirname, file); // generating full path;
    return new QueryFile(fullPath, { minify: true });
}
module.exports = load