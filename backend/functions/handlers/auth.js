

const config = require("../util/config");
const firebase = require("firebase");
firebase.initializeApp(config);

exports.login = (req, res) => {
    const user = {
      email: req.body.email,
      password: req.body.password,
    };
  
   // const { valid, errors } = validateLoginData(user);
  
    //if (!valid) return res.status(400).json(errors);
  
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        return data.user.getIdToken();
      })
      .then((token) => {
        return res.json({ token });
      })
      .catch((err) => {
        console.error(err);
        // auth/wrong-password
        // auth/user-not-user
        return res
          .status(403)
          .json({ general: "Wrong credentials, please try again" });
      });
  };