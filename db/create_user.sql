insert into users (
    user_first_name,
    user_last_name,
    user_email,
    user_hash,
    user_image
) values (
    $1,
    $2,
    $3,
    $4,
    $5
)
returning user_id, user_first_name, user_last_name, user_image, user_email