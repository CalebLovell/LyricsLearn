select *
from song_instances si
join users u on u.user_id = si.user_id
where user_name = $1;