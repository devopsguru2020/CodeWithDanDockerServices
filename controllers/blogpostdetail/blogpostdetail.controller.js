"use strict";

const blogPostsRepository = require('../../lib/blogPostRepository');

module.exports = function (router) {
    
    router.get("/k8saws", function (req, res, next) {
        blogPostsRepository.getBlogPosts(function (err, blogPosts) {

                 if (err) return next(err);
          
                    res.render('k8saws', {
                        blogPosts: blogPosts
                        
                   });
                 
                });
            });

            router.get("/k8sazure", function (req, res, next) {
                blogPostsRepository.getBlogPosts(function (err, blogPosts) {
        
                         if (err) return next(err);
                  
                            res.render('k8sazure', {
                                blogPosts: blogPosts
                                
                                
                           });
                         
                        });
                    });
            
}