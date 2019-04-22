module.exports = {
  getSongInstance: async (req, res) => {
    const { id } = req.params
    try {
      const db = await req.app.get("db");
      const songInfo = await db.get_song_info([id]);
      const songLines = await db.get_song_lines([id])
      res.status(200).send({
        message: `Song instance and lines sent.`,
        songInfo,
        songLines
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
