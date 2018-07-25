var mongoose = require('mongoose');
var config = require('./config');

mongoose.connect(config.mongodb);//连接mongodb数据库
var db = mongoose.connection;
db.on('error', console.error.bind(console, '连接错误：'));
db.once('open', function(){
        console.log('MongoDB连接成功！！');
});

module.exports = db;