select line_translation_lyrics, line_translation_explanation, li.song_instance_id, lt.language_id, lt.line_id
from line_translations lt
join lines li on li.line_id = lt.line_id
where lt.song_instance_id = $1 AND lt.language_id = $2;