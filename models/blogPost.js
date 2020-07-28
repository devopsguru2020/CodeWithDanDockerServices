'use strict'

const   mongoose    = require('mongoose'),
        Schema      = mongoose.Schema,
        ObjectId    = Schema.ObjectId;
        
const blogPostSchema = Schema ({
    title       : { type: String },
    linkTitle   : { type: String },
    postdate    : { type: Date   },
    author      : { type: String },
    subject     : { type: String },
    description : { type: String },
    srcmd       : { type: String }

}); 

const BlogTypeModel = mongoose.model('blogPost', blogPostSchema, 'blogPosts') ;

module.exports = BlogTypeModel;