"use strict";

const blogPostsRepository = require('../../lib/blogPostRepository');


module.exports = function (router) {

    router.get("/", function (req, res, next) {
          blogPostsRepository.getBlogPosts(function (err, blogPosts) {

            if (err) return next(err);

            res.render('blogposts', {
                blogPosts: blogPosts
            });
          
        });
    });

}