select DISTINCT l.language_id, language_name, language_flag
from languages l
join line_translations lt on lt.language_id = l.language_id
where song_instance_id = $1