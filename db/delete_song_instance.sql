delete from line_translations where song_instance_id = $1;
delete from lines where song_instance_id = $1;
delete from song_instances where song_instance_id = $1;