select song_instance_title, song_instance_art, artist_name, user_name, song_instance_id, u.user_id
from song_instances si
join users u on u.user_id = si.user_id
join artists i on i.artist_id = si.artist_id
where u.user_id = $1;