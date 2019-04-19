module.exports = {
  getSongInstance: async (req, res) => {
    const { id } = req.params.match;
    try {
      const db = await req.app.get("db");
      const songInfo = await db.get_song_info([id]);
      const {
        song_instance_title,
        song_instance_art,
        user_name,
        language_name,
        artist_name
      } = songInfo[0];
      res.status(200).send({
        message: `Song info sent.`,
        songData: {
          songArt: song_instance_art,
          songTitle: song_instance_title,
          artistName: artist_name,
          userName: user_name,
          languageName: language_name
        }
      });
    } catch (err) {
      res.status(500).send(`The getSongInstance function had a problem: ${err}`);
    }
  },
  getUserSongsList: async (req, res) => {
    const { id } = req.params;
    try {
      const db = await req.app.get("db");
      const userSongsList = await db.get_user_song_instances([id]);
      res.status(200).send({
        message: `Song info sent.`,
        songsList: userSongsList
      });
    } catch (err) {
      res
        .status(500)
        .send(`The getUserSongsList function had a problem: ${err}`);
    }
  }
};
