select song_instance_title, song_instance_art, user_name, language_name, artist_name, language_flag
from song_instances si
join users u on u.user_id = si.user_id
join languages l on l.language_id = si.language_id
join artists i on i.artist_id = si.artist_id
where song_instance_id = $1;