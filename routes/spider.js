var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var Note = require("../models/note");
var Banner = require("../models/banner");
var baseurl = 'https://www.jianshu.com';
router.get('/', function(req, res, next) {
    request('https://www.jianshu.com/', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //返回的body为抓到的网页的html内容
            var banners = [];
            var bannerUrl = [];
            var $ = cheerio.load(body); //当前的$符相当于拿到了所有的body里面的选择器
            //banners
            $('#indexCarousel .carousel-inner').find('img').each(function (i,el) {
                // var banner = new Banner({bannerUrl:'https'+ $(this).attr('src')})
                // banner.save(function (err, res) {
                //     if (err) {
                //         console.log("Error:" + err);
                //     }
                //     else {
                //         console.log("Res:" + res);
                //     }
                //
                // });
                bannerUrl.push({bannerUrl:'https'+ $(this).attr('src')})
                banners.push('https'+ $(this).attr('src'));
            });

            //文章列表
            var noteList = [];
            $('#list-container .note-list li').each(function (i , el) {
                var img = $(this).find('.wrap-img img').attr('src');
                var id = $(this).attr('data-note-id');
                var title = $(this).find('.content .title').text();
                var noteurl = $(this).find('.content .title').attr('href');
                var abstract = $(this).find('.content .abstract').text();
                var nickname = $(this).find('.meta .nickname').text();
                var comments = $(this).find('.meta a').eq(1).text();
                var likes = $(this).find('.meta span').eq(0).text();
                var money = $(this).find('.meta span').eq(1).text();

                var note = {
                    id:id,
                    title:title,
                    abstract:abstract,
                    noteurl:baseurl+noteurl,
                    img:img?'https'+img:null,
                    nickname:nickname,
                    comments:comments.trim(),
                    likes:likes.trim(),
                    money:money.trim()
                }

                // var note = new Note(note);
                //
                // note.save(function (err, res) {
                //
                //     if (err) {
                //         console.log("Error:" + err);
                //     }
                //     else {
                //         console.log("Res:" + res);
                //     }
                //
                // });

                noteList.push(note);


            });

            Banner.collection.insert(bannerUrl, function (err, docs) {
                if (err) {
                    console.log("Error:" + err);
                }
                else {
                    console.log("Note Res:" + JSON.stringify(docs));
                }
            });

            Note.collection.insert(noteList, function (err, docs) {
                if (err) {
                    console.log("Error:" + err);
                }
                else {
                    console.log("Note Res:" + JSON.stringify(docs));
                }
            });


            var ret = {
                info:'最新数据抓取',
                banners:banners,
                notelist:noteList
            }

            res.send(ret);
        }
    })

});

module.exports = router;
