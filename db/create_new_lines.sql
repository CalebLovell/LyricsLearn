insert into lines
    (line_lyrics, song_instance_id, language_id)
values($1, $2, $3);

select line_id
from lines
where line_lyrics = $1 AND song_instance_id = $2 AND language_id = $3;