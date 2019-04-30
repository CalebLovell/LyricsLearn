insert into
    artists
    (artist_name)
values($1);

select artist_id
from artists
where artist_name = $1;