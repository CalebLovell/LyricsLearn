select language_id
from languages
where language_name = $1 OR language_name = $2;