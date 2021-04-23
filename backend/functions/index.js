const functions = require('firebase-functions');
const app = require('express')();
const cors = require('cors');
app.use(cors());

const { getAllPost, getPost, getCategoriesCount } = require('./handlers/posts');
const { deletePost, updateBlog, postBlog} = require('./handlers/posts')
const { getComments, postComment, allComments,deleteComment } = require('./handlers/comments');
const { login } = require('./handlers/auth');


// Post routes
app.get('/posts', getAllPost);
app.get('/post/:postId', getPost);
app.get('/categoriesCount', getCategoriesCount);
app.post('/post', postBlog);
app.post('/post/:postId', updateBlog)
app.delete('/post/:postId', deletePost);


// Comment routes
app.get('/comments/:postId', getComments);
app.get('/comments', allComments);
app.post('/comments/:postId', postComment)
app.delete('/comments/:commentId', deleteComment )
//Auth Route
app.post('/login', login);

exports.api = functions.https.onRequest(app);