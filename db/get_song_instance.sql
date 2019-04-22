select song_instance_title, song_instance_art, user_name, language_name, artist_name, language_flag
from song_instances si
join users u on u.user_id = si.user_id
join languages l on l.language_id = si.language_id
join artists i on i.artist_id = si.artist_id
where si.song_instance_id = $1;

-- select song_instance_title, song_instance_art, user_name, language_name, artist_name, language_flag, line_lyrics, line_explanation, line_index
-- from song_instances si
-- join users u on u.user_id = si.user_id
-- join languages la on la.language_id = si.language_id
-- join artists i on i.artist_id = si.artist_id
-- join lines li on li.song_instance_id = si.song_instance_id
-- where si.song_instance_id = $1;