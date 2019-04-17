CREATE TABLE Users (
	user_id serial NOT NULL UNIQUE,
	user_name varchar(50) NOT NULL,
	user_email varchar(100) NOT NULL UNIQUE,
	user_image TEXT NOT NULL,
	user_hash TEXT NOT NULL UNIQUE,
	CONSTRAINT Users_pk PRIMARY KEY (user_id)
) WITH (
  OIDS=FALSE
);

CREATE TABLE Songs_Instances (
	song_instance_id serial NOT NULL UNIQUE,
	user_id integer NOT NULL UNIQUE,
	song_instance_title varchar(300) NOT NULL,
	song_instance_art TEXT NOT NULL,
	language_id integer NOT NULL,
	CONSTRAINT Songs_Instances_pk PRIMARY KEY (song_instance_id)
) WITH (
  OIDS=FALSE
);

CREATE TABLE Artists (
	artist_id serial NOT NULL UNIQUE,
	artist_name varchar(200) NOT NULL,
	CONSTRAINT Artists_pk PRIMARY KEY (artist_id)
) WITH (
  OIDS=FALSE
);

CREATE TABLE Lines (
	line_id serial NOT NULL UNIQUE,
	line_lyrics varchar(300) NOT NULL,
	song_instance_id integer NOT NULL,
	language_id integer NOT NULL,
	line_explanation TEXT NOT NULL,
	line_index integer NOT NULL,
	CONSTRAINT Lines_pk PRIMARY KEY (line_id)
) WITH (
  OIDS=FALSE
);

CREATE TABLE Artists_Songs (
	artist_song_id serial NOT NULL UNIQUE,
	artist_id integer NOT NULL,
	song_instance_id integer NOT NULL,
	CONSTRAINT Artists_Songs_pk PRIMARY KEY (artist_song_id)
) WITH (
  OIDS=FALSE
);

CREATE TABLE Lines_Translations (
	line_translation_id serial NOT NULL UNIQUE,
	line_translation_lyrics varchar(300) NOT NULL,
	line_id integer NOT NULL,
	language_id integer NOT NULL,
	line_translation_explanation TEXT NOT NULL,
	CONSTRAINT Lines_Translations_pk PRIMARY KEY (line_translation_id)
) WITH (
  OIDS=FALSE
);

CREATE TABLE Languages (
	language_id serial NOT NULL UNIQUE,
	language_name varchar(100) NOT NULL UNIQUE,
	language_flag TEXT NOT NULL,
	CONSTRAINT Languages_pk PRIMARY KEY (language_id)
) WITH (
  OIDS=FALSE
);

CREATE TABLE Songs_Instances_Languages (
	song_instance_language_id serial NOT NULL UNIQUE,
	language_id integer NOT NULL,
	song_instance_id integer NOT NULL,
	CONSTRAINT Songs_Instances_Languages_pk PRIMARY KEY (song_instance_language_id)
) WITH (
  OIDS=FALSE
);

ALTER TABLE Songs_Instances ADD CONSTRAINT Songs_Instances_fk0 FOREIGN KEY (user_id) REFERENCES Users(user_id);
ALTER TABLE Songs_Instances ADD CONSTRAINT Songs_Instances_fk1 FOREIGN KEY (language_id) REFERENCES Languages(language_id);

ALTER TABLE Lines ADD CONSTRAINT Lines_fk0 FOREIGN KEY (song_instance_id) REFERENCES Songs_Instances(song_instance_id);
ALTER TABLE Lines ADD CONSTRAINT Lines_fk1 FOREIGN KEY (language_id) REFERENCES Languages(language_id);

ALTER TABLE Artists_Songs ADD CONSTRAINT Artists_Songs_fk0 FOREIGN KEY (artist_id) REFERENCES Artists(artist_id);
ALTER TABLE Artists_Songs ADD CONSTRAINT Artists_Songs_fk1 FOREIGN KEY (song_instance_id) REFERENCES Songs_Instances(song_instance_id);

ALTER TABLE Lines_Translations ADD CONSTRAINT Lines_Translations_fk0 FOREIGN KEY (line_id) REFERENCES Lines(line_id);
ALTER TABLE Lines_Translations ADD CONSTRAINT Lines_Translations_fk1 FOREIGN KEY (language_id) REFERENCES Languages(language_id);

ALTER TABLE Songs_Instances_Languages ADD CONSTRAINT Songs_Instances_Languages_fk0 FOREIGN KEY (language_id) REFERENCES Languages(language_id);
ALTER TABLE Songs_Instances_Languages ADD CONSTRAINT Songs_Instances_Languages_fk1 FOREIGN KEY (song_instance_id) REFERENCES Songs_Instances(song_instance_id);