var mongoose = require('mongoose')
var BannerSchema = require('../schemas/bannerSchema')
var Banner = mongoose.model('Banners',BannerSchema)

module.exports = Banner