CREATE TABLE Users (
	user_id serial NOT NULL UNIQUE,
	user_name varchar(50) NOT NULL,
	user_image TEXT,
	user_email varchar(100) NOT NULL UNIQUE,
	user_hash TEXT NOT NULL,
	CONSTRAINT Users_pk PRIMARY KEY (user_id)
);



CREATE TABLE Song_Instances (
	song_instance_id serial NOT NULL UNIQUE,
	user_id integer NOT NULL,
	song_instance_title varchar(300) NOT NULL,
	song_instance_art TEXT,
	artist_id integer NOT NULL,
	language_id integer NOT NULL,
	CONSTRAINT Song_Instances_pk PRIMARY KEY (song_instance_id)
);



CREATE TABLE Artists (
	artist_id serial NOT NULL UNIQUE,
	artist_name varchar(200) NOT NULL,
	CONSTRAINT Artists_pk PRIMARY KEY (artist_id)
);



CREATE TABLE Lines (
	line_id serial NOT NULL UNIQUE,
	line_lyrics varchar(300) NOT NULL,
	line_explanation TEXT,
	song_instance_id integer NOT NULL,
	language_id integer NOT NULL,
	line_index integer NOT NULL,
	CONSTRAINT Lines_pk PRIMARY KEY (line_id)
);



CREATE TABLE Artists_Song_Instances (
	artist_song_instance_id serial NOT NULL UNIQUE,
	artist_id integer NOT NULL,
	song_instance_id integer NOT NULL,
	CONSTRAINT Artists_Song_Instances_pk PRIMARY KEY (artist_song_instance_id)
);



CREATE TABLE Line_Translations (
	line_translation_id serial NOT NULL UNIQUE,
	line_translation_lyrics varchar(300),
	line_translation_explanation TEXT,
	song_instance_id integer NOT NULL,
	language_id integer NOT NULL,
	line_index integer NOT NULL,
	line_id integer NOT NULL,
	CONSTRAINT Line_Translations_pk PRIMARY KEY (line_translation_id)
);



CREATE TABLE Languages (
	language_id serial NOT NULL UNIQUE,
	language_name varchar(100) NOT NULL UNIQUE,
	language_flag TEXT NOT NULL UNIQUE,
	CONSTRAINT Languages_pk PRIMARY KEY (language_id)
);



CREATE TABLE Song_Instances_Languages (
	song_instance_language_id serial NOT NULL UNIQUE,
	song_instance_id integer NOT NULL,
	language_id integer NOT NULL,
	CONSTRAINT Song_Instances_Languages_pk PRIMARY KEY (song_instance_language_id)
);




ALTER TABLE Song_Instances ADD CONSTRAINT Song_Instances_fk0 FOREIGN KEY (user_id) REFERENCES Users(user_id);
ALTER TABLE Song_Instances ADD CONSTRAINT Song_Instances_fk1 FOREIGN KEY (artist_id) REFERENCES Artists(artist_id);
ALTER TABLE Song_Instances ADD CONSTRAINT Song_Instances_fk2 FOREIGN KEY (language_id) REFERENCES Languages(language_id);


ALTER TABLE Lines ADD CONSTRAINT Lines_fk0 FOREIGN KEY (song_instance_id) REFERENCES Song_Instances(song_instance_id);
ALTER TABLE Lines ADD CONSTRAINT Lines_fk1 FOREIGN KEY (language_id) REFERENCES Languages(language_id);

ALTER TABLE Artists_Song_Instances ADD CONSTRAINT Artists_Song_Instances_fk0 FOREIGN KEY (artist_id) REFERENCES Artists(artist_id);
ALTER TABLE Artists_Song_Instances ADD CONSTRAINT Artists_Song_Instances_fk1 FOREIGN KEY (song_instance_id) REFERENCES Song_Instances(song_instance_id);

ALTER TABLE Line_Translations ADD CONSTRAINT Line_Translations_fk0 FOREIGN KEY (song_instance_id) REFERENCES Song_Instances(song_instance_id);
ALTER TABLE Line_Translations ADD CONSTRAINT Line_Translations_fk1 FOREIGN KEY (language_id) REFERENCES Languages(language_id);
ALTER TABLE Line_Translations ADD CONSTRAINT Line_Translations_fk2 FOREIGN KEY (line_index) REFERENCES Lines(line_id);
ALTER TABLE Line_Translations ADD CONSTRAINT Line_Translations_fk3 FOREIGN KEY (line_id) REFERENCES Lines(line_id);


ALTER TABLE Song_Instances_Languages ADD CONSTRAINT Song_Instances_Languages_fk0 FOREIGN KEY (song_instance_id) REFERENCES Song_Instances(song_instance_id);
ALTER TABLE Song_Instances_Languages ADD CONSTRAINT Song_Instances_Languages_fk1 FOREIGN KEY (language_id) REFERENCES Languages(language_id);
