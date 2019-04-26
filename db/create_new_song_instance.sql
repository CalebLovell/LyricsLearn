insert into Song_Instances (
    user_id,
    song_instance_title,
    song_instance_art,
    artist_id,
    language_id
) values (
    $1,
    $2,
    $3,
    $4,
    $5
)

returning song_instance_id