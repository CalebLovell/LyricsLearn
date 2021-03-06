module.exports = {
  getUserSongsList: async (req, res) => {
    const { userID } = req.params;
    try {
      const db = await req.app.get("db");
      const userSongsList = await db.get_user_songs_list([userID]);
      res.status(200).send({
        message: `User songs list sent.`,
        userSongsList
      });
    } catch (err) {
      res
        .status(500)
        .send(`The getUserSongsList function had a problem: ${err}`);
    }
  },
  getSongInstance: async (req, res) => {
    const { songID } = req.params;
    try {
      const db = await req.app.get("db");
      const songInfo = await db.get_song_info([songID]);
      const songLines = await db.get_song_lines([songID]);
      const songTranslationLanguages = await db.get_song_translation_languages([
        songID
      ]);
      res.status(200).send({
        message: `Song info, languages and lines sent.`,
        songInfo,
        songLines,
        songTranslationLanguages
      });
    } catch (err) {
      res
        .status(500)
        .send(`The getSongInstance function had a problem: ${err}`);
    }
  },
  getSongTranslation: async (req, res) => {
    const { songID, languageID } = req.params;
    try {
      const db = await req.app.get("db");
      const songTranslation = await db.get_song_lines_translation([
        songID,
        languageID
      ]);
      res.status(200).send({
        message: `Song translation sent.`,
        songTranslation
      });
    } catch (err) {
      res
        .status(500)
        .send(`The getSongTranslation function had a problem: ${err}`);
    }
  },
  getSongs: async (req, res) => {
    try {
      const db = await req.app.get("db");
      const recentSongs = await db.get_recent_songs();
      const englishSongs = await db.get_english_songs();
      res.status(200).send({
        message: `Songs sent.`,
        recentSongs,
        englishSongs
      });
    } catch (err) {
      res.status(500).send(`The getSongs function had a problem: ${err}`);
    }
  },
  deleteSongInstance: async (req, res) => {
    try {
      const { songID } = req.params;
      const db = await req.app.get("db");
      await db.delete_song_instance([songID]);
      res.status(200).send({
        message: `Song deleted.`
      });
    } catch (err) {
      res
        .status(500)
        .send(`The deleteSongInstance function had a problem: ${err}`);
    }
  }
};
