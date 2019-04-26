module.exports = {
  createNewEverything: async (req, res) => {
    const {
      id,
      songInstanceTitle,
      artistName,
      languageName,
      songInstanceArt,
      lineLyrics
    } = req.body;
    try {
      const db = await req.app.get("db");
      const languageID = await db.get_language_id([languageName]);
      const arrayOfLines = lineLyrics.split("\n");
      // Break lineLyrics text into lines
      for (let i = arrayOfLines.length - 1; i > 0; i--) {
        if (arrayOfLines[i] === "") {
          arrayOfLines.splice(i, 1);
        }
      }
      if (!languageID[0]) {
        return res.status(403).send({
          message: `We do not currently support that language. Please contact the site creator and he will add it asap.`
        });
      }
      const artistID = await db.get_artist_id([artistName]);
      if (artistID[0]) {
        const newSongInstanceID = await db.create_new_song_instance([
          id,
          songInstanceTitle,
          songInstanceArt,
          artistID[0].artist_id,
          languageID[0].language_id
        ]);
        if (newSongInstanceID[0]) {
          for (let i = 0; i < arrayOfLines.length; i++) {
            await db.create_new_lines([
              arrayOfLines[i],
              newSongInstanceID[0].song_instance_id,
              languageID[0].language_id
            ]);
          }
        }
        res.status(200).send({
          message: `Song instance created.`,
          submitted: true,
          newSongInstanceID: newSongInstanceID[0].song_instance_id
        });
      } else {
        const newArtistID = await db.create_artist([artistName]);
        const newSongInstanceID = await db.create_new_song_instance([
          id,
          songInstanceTitle,
          songInstanceArt,
          newArtistID[0].artist_id,
          languageID[0].language_id
        ]);
        if (newSongInstanceID[0]) {
          for (let i = 0; i < arrayOfLines.length; i++) {
            await db.create_new_lines([
              arrayOfLines[i],
              newSongInstanceID[0].song_instance_id,
              languageID[0].language_id
            ]);
          }
        }
        res.status(200).send({
          message: `Song instance created.`,
          submitted: true,
          newSongInstanceID: newSongInstanceID[0].song_instance_id
        });
      }
    } catch (err) {
      res
        .status(500)
        .send(`The createSongInstance function had a problem: ${err}`);
    }
  }
};
