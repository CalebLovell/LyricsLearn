insert into users (
    user_name,
    user_email,
    user_hash,
    user_image
) values (
    $1,
    $2,
    $3,
    $4
)
returning user_id, user_name, user_image, user_email