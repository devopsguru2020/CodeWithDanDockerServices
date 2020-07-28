"use strict";

var BlogPost = require("../models/blogPost");

var blogPostRepository = function () {

   var blogPosts = null;

   var getBlogPosts = function (callback) {
    BlogPost.find()
            .sort({ title: "asc" })
            .exec(function(err, pts){
                if (err) return callback(err, null);
                callback(err, pts);
            });

   },

   getBlogPostById = function(id, callback) {
       BlogPost.findById(id, function(err, blogPost){
           if (err) {
               callback(err, null);
               return;
           }
           callback(err, blogPost);
       });
   },

   getBlogPostByTitle = function (title, callback) {
       BlogPost.findOne({title: { $regex: title, $options: "i" }}, function(err, blogPost) {
           if(err) {
               callback(err, null);
               return;
           }
           callback(err, blogPost);
       });
   },

   injectBlogPosts = function (req, res, next) {
       if (!blogPosts) {
           getBlogPosts(function(err, pts) {
               if (!err) {
                   blogPosts = pts;
                   res.locals.blogPosts = blogPosts;
               }
           });
       }
       else {
           res.locals.blogPosts = blogPosts;
       }
       next();
   };

   return {
       getBlogPosts: getBlogPosts,
       getBlogPostById: getBlogPostById,
       getBlogPostByTitle: getBlogPostByTitle,
       injectBlogPosts: injectBlogPosts
   };


}();

module.exports = blogPostRepository;