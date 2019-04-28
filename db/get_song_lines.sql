select line_lyrics, li.line_id, language_flag_circular
from lines li
join song_instances si on si.song_instance_id = li.song_instance_id
join languages l on l.language_id = si.language_id
where si.song_instance_id = $1;
