module.exports = {
  createNewEverything: async (req, res) => {
    let {
      id,
      songInstanceTitle,
      artistName,
      originalLanguageName,
      newLanguageName,
      songInstanceArt,
      lineLyrics,
      lineTranslationLyrics,
      lineTranslationExplanations
    } = req.body;
    try {
      const db = await req.app.get("db");
      // Check if entered language entered exists; if not send an error.
      const languageID = await db.get_language_id([
        originalLanguageName,
        newLanguageName
      ]);
      if (!languageID[0] || !languageID[1]) {
        return res.status(403).send({
          message: `We do not currently support that language. Please contact the site creator and he will add it asap.`
        });
      }
      // Set default title if empty
      if (songInstanceTitle === "") {
        songInstanceTitle = "Title Unknown";
      }
      // Set default artist if empty
      if (artistName === "") {
        artistName = "Unknown Artist";
      }
      // Set default album art image if empty
      if (songInstanceArt === "") {
        songInstanceArt =
          "https://musicpartners.sonos.com/sites/default/files/Sonos_Default_AlbumArt.png";
      }
      // Break lineLyrics from text-area element into a line array
      const arrayOfLines = lineLyrics.split("\n");
      for (let i = arrayOfLines.length - 1; i > 0; i--) {
        if (arrayOfLines[i] === "") {
          arrayOfLines.splice(i, 1);
        }
      }
      // Break lineTranslationLyrics from text-area element into a lineTranslations array
      const arrayOfLineTranslations = lineTranslationLyrics.split("\n");
      for (let i = arrayOfLineTranslations.length - 1; i > 0; i--) {
        if (arrayOfLineTranslations[i] === "") {
          arrayOfLineTranslations.splice(i, 1);
        }
      }
      // Break lineTranslationExplanations from text-area element into a lineTranslationExplanations array
      const arrayOfLineTranslationExplanations = lineTranslationExplanations.split(
        "\n"
      );
      for (let i = arrayOfLineTranslationExplanations.length - 1; i > 0; i--) {
        if (arrayOfLineTranslationExplanations[i] === "") {
          arrayOfLineTranslationExplanations.splice(i, 1);
        }
      }
      // Check if artist exists; get the ID if it does, create a new artist and get that new ID if it doesn't
      const artistID = await db.get_artist_id([artistName]);
      if (artistID[0]) {
        const newSongInstanceID = await db.create_new_song_instance([
          id,
          songInstanceTitle,
          songInstanceArt,
          artistID[0].artist_id,
          languageID[0].language_id
        ]);
        // Use newly create songInstanceID to enter every line of lyrics into db column lines
        if (newSongInstanceID[0]) {
          arrayOfLines.map(async line => {
            const newLineID = await db.create_new_lines([
              line,
              newSongInstanceID[0].song_instance_id,
              languageID[0].language_id
            ]);
            if (newLineID) {
              arrayOfLineTranslations.map(async lineTranslation => {
                const newLineTranslationID = await db.create_new_line_translations(
                  [
                    lineTranslation,
                    newSongInstanceID[0].song_instance_id,
                    languageID[1].language_id,
                    newLineID[0].line_id
                  ]
                );
                if (newLineTranslationID) {
                  arrayOfLineTranslationExplanations.map(
                    async lineTranslationExplanation => {
                      await db.create_new_line_translation_explanation([
                        lineTranslationExplanation,
                        newLineTranslationID[0].line_id
                      ]);
                    }
                  );
                  return;
                }
                return lineTranslation;
              });
            }
            return line;
          });
        }
        // Sent success message and new songInstanceID so user can be pushed to new song view
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
        // Use newly create songInstanceID to enter every line of lyrics into db column lines
        if (newSongInstanceID[0]) {
          arrayOfLines.map(async line => {
            const newLineID = await db.create_new_lines([
              line,
              newSongInstanceID[0].song_instance_id,
              languageID[0].language_id
            ]);
            if (newLineID) {
              arrayOfLineTranslations.map(async lineTranslation => {
                const newLineTranslationID = await db.create_new_line_translations(
                  [
                    lineTranslation,
                    newSongInstanceID[0].song_instance_id,
                    languageID[1].language_id,
                    newLineID[0].line_id
                  ]
                );
                if (newLineTranslationID) {
                  arrayOfLineTranslationExplanations.map(
                    async lineTranslationExplanation => {
                      await db.create_new_line_translation_explanation([
                        lineTranslationExplanation,
                        newLineTranslationID[0].line_id
                      ]);
                    }
                  );
                  return;
                }
                return lineTranslation;
              });
            }
            return line;
          });
        }
        // Sent success message and new songInstanceID so user can be pushed to new song view
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
