const { admin } = require('./admin');
const config = require("../util/config");


exports.imageUpload = (req, res, next) => {
   const BusBoy = require('busboy');
   const path = require('path');
   const os = require('os');
   const fs = require('fs');

   const busboy = new BusBoy({ headers: req.headers});
   let imageFileName;
   let imageToBeUploaded = {};

   busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
       const imageExetension = filename.split('.')[filename.split('.').length-1];
       imageFileName = `${Math.round(Math.random()*100000000000)}.${imageExetension}`;
       const filepath = path.join(os.tmpdir(), imageFileName);
       imageToBeUploaded = {filepath, mimetype};
       file.pipe(fs.createWriteStream(filepath));
   })
   busboy.on('finish', ()=>{
       admin.storage().bucket().upload(
           imageToBeUploaded.filepath,{
               resumable: false,
               metadata:{
                   metadata:{
                       contenttype:imageToBeUploaded.mimetype
                   }
               }
           }
       ).then(() =>{
           const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
          
          return res.json(imageUrl) ;
          
        })
        .catch((err) => {
          console.error('Error while verifying token ', err);
          return res.status(403).json(err);
        });

   })
  busboy.end(req.rawBody)
}
