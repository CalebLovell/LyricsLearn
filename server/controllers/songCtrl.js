module.exports = {
  getSongInstance: async (req, res) => {
    const { id } = req.params
    try {
      const db = await req.app.get("db");
      const songInstance = await db.get_song_instance([id]);
      res.status(200).send({
        message: `Song instance sent.`,
        songInstance
      });
    } catch (err) {
      res
        .status(500)
        .send(`The getSongInstance function had a problem: ${err}`);
    }
  },
  getUserSongsList: async (req, res) => {
    const { id } = req.params;
    try {
      const db = await req.app.get("db");
      const userSongsList = await db.get_user_songs_list([id]);
      res.status(200).send({
        message: `User songs list sent.`,
        userSongsList
      });
    } catch (err) {
      res
        .status(500)
        .send(`The getUserSongsList function had a problem: ${err}`);
    }
  }
};
