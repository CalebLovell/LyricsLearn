select line_translation_lyrics, line_translation_explanation, lt.line_id, lt.language_id
from line_translations lt
join lines li on li.line_id = lt.line_id
where li.language_id = $1;
