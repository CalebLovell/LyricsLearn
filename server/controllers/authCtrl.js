const bcrypt = require("bcryptjs");

module.exports = {
  signup: async (req, res) => {
    const { first_name, last_name, email, password, image } = req.body;
    try {
      const db = await req.app.get("db");
      const existingEmailArray = await db.does_user_email_exist([email]);
      if (existingEmailArray[0]) {
        return res
          .status(401)
          .send({ message: `Email address already in use.` });
      }
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      let newUserArray = await db.create_user([
        first_name,
        last_name,
        email,
        hash,
        image
      ]);
      req.session.user = {
        id: newUserArray[0].user_id,
        first_name: newUserArray[0].user_first_name,
        last_name: newUserArray[0].user_last_name,
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
    try {
      const db = await req.app.get("db");
      const existingEmailArray = await db.does_user_email_exist([email]);
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
        first_name: existingEmailArray[0].user_first_name,
        last_name: existingEmailArray[0].user_last_name,
        image: existingEmailArray[0].user_image,
        email: existingEmailArray[0].user_email
      };
      res.status(201).send({
        message: `Login successful.`,
        userData: req.session.user,
        loggedIn: true
      });
      console.log(req)
    } catch (err) {
      res.status(500).send(err);
    }
  }
};
