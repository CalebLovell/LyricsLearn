select * from song_instances si join artists a on a.artist_id = si.artist_id order by song_instance_id desc limit 4;