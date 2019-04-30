update line_translations
set line_translation_explanation = $1
where line_id = $2;