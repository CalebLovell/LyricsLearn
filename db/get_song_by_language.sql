select *
from song_instances si
join languages l on l.language_id = si.language_id
where language_name = $1;