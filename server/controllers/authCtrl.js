const bcrypt = require("bcryptjs");

module.exports = {
  signup: async (req, res) => {
    const { name, email, password, image } = req.body;
    try {
      const db = await req.app.get("db");
      const existingEmailArray = await db.get_user_emails([email]);
      if (existingEmailArray[0]) {
        return res
          .status(401)
          .send({ message: `Email address already in use.` });
      }
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      let newUserArray = await db.create_user([
        name,
        email,
        hash,
        image
      ]);
      req.session.user = {
        id: newUserArray[0].user_id,
        name: newUserArray[0].user_name,
        image: newUserArray[0].user_image,
        email: newUserArray[0].user_email
      };
      res.status(201).send({
        message: `Sign up successful.`,
        userData: req.session.user,
        loggedIn: true
      });
    } catch (err) {
      res.status(500).send(err);
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    // try {
      const db = await req.app.get("db");
      const existingEmailArray = await db.get_user_emails([email]);
      if (!existingEmailArray[0]) {
        return res.status(401).send({ message: `No email address found.` });
      }
      const result = bcrypt.compareSync(
        password,
        existingEmailArray[0].user_hash
      );
      if (!result) {
        return res.status(401).send({ message: `Incorrect password.` });
      }
      req.session.user = {
        id: existingEmailArray[0].user_id,
        name: existingEmailArray[0].user_name,
        image: existingEmailArray[0].user_image,
        email: existingEmailArray[0].user_email
      };
      res.status(201).send({
        message: `Login successful.`,
        userData: req.session.user,
        loggedIn: true
      });
    // } catch (err) {
    //   res.status(500).send(err);
    // }
  },
  editInfo: async (req, res) => {
    const { id } = req.params;
    const { name, email, image } = req.body;
    try {
      const db = await req.app.get("db");
      const editedUserArray = await db.update_user([id, name, email, image]);
      req.session.user = {
        id: editedUserArray[0].user_id,
        name: editedUserArray[0].user_name,
        image: editedUserArray[0].user_image,
        email: editedUserArray[0].user_email
      };
      res.status(201).send({
        message: `User updated.`,
        userData: req.session.user,
        loggedIn: true
      });
    } catch (err) {
      res.status(500).send(err);
    }
  },
  userInfo: (req, res) => {
    if (req.session.user) res.status(200).send(req.session.user);
    else res.status(401).send(`Please log in.`);
  }
};
