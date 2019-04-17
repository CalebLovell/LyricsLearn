update users
set user_name = $2, user_email = $3, user_image = $4,
where user_id = $1;