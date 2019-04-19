module.exports = {
  getSongInstance: async (req, res) => {
    const { id } = req.params.match;
    try {
      const db = await req.app.get("db");
      const songInstanceData = await db.get_song_instance([id]);
      res.status(200).send({
        message: `Song info sent.`,
        songInstance: songInstanceData
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
      const userSongsListData = await db.get_user_songs_list([id]);
      res.status(200).send({
        message: `Song info sent.`,
        userSongsList: userSongsListData
      });
    } catch (err) {
      res
        .status(500)
        .send(`The getUserSongsList function had a problem: ${err}`);
    }
  }
};
