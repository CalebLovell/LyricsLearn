insert into line_translations
    (line_translation_lyrics, song_instance_id, language_id, line_id)
values($1, $2, $3, $4);

select line_id
from line_translations
where line_id = $4;