const { db } = require('../util/admin');

exports.allComments = (req, res) =>{
  db.collection('comments')
  .orderBy('createdAt', 'desc')
  .get()
  .then((data) => {
    let comments = [];
    data.forEach((doc) => {
        comments.push({
        commentId: doc.id,
        name: doc.data().name,
        email: doc.data().email,
        comment: doc.data().comment,
        postId: doc.data().postId,
        createdAt: doc.data().createdAt
      });
    });
    return res.json(comments);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).json({ error: err.code });
  });
}


exports.getComments = (req, res) => {
    db.collection('comments')
      .where('postId', '==', req.params.postId)
      .get()
      .then((data) => {
        let comments = [];
        data.forEach((doc) => {
            comments.push({
            commentId: doc.id,
            name: doc.data().name,
            email: doc.data().email,
            comment: doc.data().comment,
            postId: doc.data().postId,
            createdAt: doc.data().createdAt
          });
        });
        return res.json(comments);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: err.code });
      });
};
  

exports.postComment = (req, res) => {
  const comment = {
    name: req.body.name,
    createdAt: Date.now(),
    comment: req.body.comment,
    postId: req.params.postId,
    email: req.body.email
  };
  db.collection('comments').add(comment)
  .then((doc) => {
    res.json(comment);
  })
  .catch((err) => {
    res.status(500).json({ error: 'something went wrong' });
    console.error(err);
  });
}

exports.deleteComment = (req,res) =>{
  const document = db.doc(`/comments/${req.params.commentId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Post not found' });
      }
      
        return document.delete();
      
    })
    .then(() => {
      res.json({ message: 'Comment deleted successfully' });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
}