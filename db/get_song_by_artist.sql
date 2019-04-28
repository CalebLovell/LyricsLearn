select *
from song_instances si
join artists a on a.artist_id = si.artist_id
where artist_name = $1;