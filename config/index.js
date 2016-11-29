var path = require('path');
var conf = require('etc')();

var dir = path.join(__dirname, 'src');
conf.folder(dir);
module.exports = conf.toJSON();