const { db } = require('../util/admin');

exports.getAllPost = (req, res) => {
  db.collection('posts')
    .orderBy('createdAt', 'desc')
    .get()
    .then((data) => {
      let posts = [];
      data.forEach((doc) => {
        posts.push({
          postId: doc.id,
          content: doc.data().content,
          title: doc.data().title,
          createdAt: doc.data().createdAt,
          media: doc.data().media
        });
      });
      return res.json(posts);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};


exports.getPost = (req, res)=>{
  let postData = {};
  db.doc(`/posts/${req.params.postId}`).get().then(doc =>{
    if(!doc.exists){
      return res.status(404).json({error: 'Post Id invalid'})
    }
    postData = doc.data();
    postData.postId = doc.id;
    console.log(postData);
    return res.json(postData);
  }).catch(e =>{
    console.error(e);
    res.status(500).json(postData)
  })
}

exports.postBlog = (req,res) =>{
  
  if (req.body.title.trim() === '' || req.body.content.trim() === '') {
    return res.status(400).json({ error: 'Fields cannot be empty' });
  }
  const blog = {
    title: req.body.title,
    createdAt: Date.now(),
    content: req.body.content,
    media:req.body.media
  };
  db.collection('posts')
  .add(blog)
  .then((doc) => {
  const resBlog = blog;
  resBlog.postId = doc.id;
  res.json(resBlog);
  })
  .catch((err) => {
  res.status(500).json({ error: 'something went wrong' });
  console.error(err);
  });
 }

exports.deletePost = (req,res) =>{
  const document = db.doc(`/posts/${req.params.postId}`);
  
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Post not found' });
      }
      
        return document.delete();
      
    })
    .then(() => {
      res.json({ message: 'Post deleted successfully' });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
}

exports.getCategoriesCount = (req,res) =>{
 
  db.collection('categories')
  .get()
  .then((data) => {
    let categoriesCount = [];
    data.forEach((doc) => {
      categoriesCount.push({
        name: doc.id,
        count: doc.data().count,
      });
    });
    return res.json(categoriesCount);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).json({ error: err.code });
  });
}

exports.updateBlog = (req, res) =>{
  const blog = {
    title: req.body.title,
    createdAt: Date.now(),
    content: req.body.content,
    postId: req.params.postId,
    media: req.body.media
  };
  db.doc(`/posts/${req.params.postId}`).update(blog)
  .then((doc) => {
    res.json(blog);
    })
    .catch((err) => {
    res.status(500).json({ error: 'something went wrong' });
    console.error(err);
  });
}