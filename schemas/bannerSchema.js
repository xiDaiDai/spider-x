var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BannerSchema = new Schema({
    bannerUrl:String
});

module.exports = BannerSchema;