select line_lyrics, line_explanation, line_index
from lines li
join song_instances si on si.song_instance_id = li.song_instance_id
where si.song_instance_id = $1;
