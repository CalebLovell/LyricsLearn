insert into Languages(language_name, language_flag, language_flag_circular) values('English', 'https://cdn2.iconfinder.com/data/icons/flags_gosquared/64/United-States_flat.png', 'https://image.flaticon.com/icons/svg/197/197484.svg');
insert into Languages(language_name, language_flag, language_flag_circular) values('Spanish', 'https://cdn2.iconfinder.com/data/icons/flags_gosquared/64/Spain_flat.png', 'https://image.flaticon.com/icons/svg/197/197593.svg');
insert into Languages(language_name, language_flag, language_flag_circular) values('Portuguese', 'https://cdn2.iconfinder.com/data/icons/flags_gosquared/64/Brazil_flat.png', 'https://image.flaticon.com/icons/svg/197/197386.svg');
insert into Languages(language_name, language_flag, language_flag_circular) values('Italian', 'https://cdn2.iconfinder.com/data/icons/flags_gosquared/64/Italy_flat.png', 'https://image.flaticon.com/icons/svg/197/197626.svg');
insert into Languages(language_name, language_flag, language_flag_circular) values('French', 'https://cdn2.iconfinder.com/data/icons/flags_gosquared/64/France_flat.png', 'https://image.flaticon.com/icons/svg/197/197560.svg');
insert into Languages(language_name, language_flag, language_flag_circular) values('German', 'https://cdn2.iconfinder.com/data/icons/flags_gosquared/64/Germany_flat.png', 'https://image.flaticon.com/icons/svg/197/197571.svg');
insert into Languages(language_name, language_flag, language_flag_circular) values('Turkish', 'https://cdn2.iconfinder.com/data/icons/flags_gosquared/64/Turkey_flat.png', 'https://image.flaticon.com/icons/svg/197/197518.svg');
insert into Languages(language_name, language_flag, language_flag_circular) values('Russian', 'https://cdn2.iconfinder.com/data/icons/flags_gosquared/64/Russia_flat.png', 'https://image.flaticon.com/icons/svg/197/197408.svg');
insert into Languages(language_name, language_flag, language_flag_circular) values('Chinese', 'https://cdn2.iconfinder.com/data/icons/flags_gosquared/64/China_flat.png', 'https://image.flaticon.com/icons/svg/197/197375.svg');

insert into Artists (artist_name) values('Calle 13');
insert into Artists (artist_name) values('Mahmood');
insert into Artists (artist_name) values('Kenny Chesney');
insert into Artists (artist_name) values('Tiago Iorc');
insert into Artists (artist_name) values('Echosmith');

insert into song_instances(user_id, song_instance_title, song_instance_art, language_id, artist_id)
values(1, 'El Aguante', 'https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Multiviralcalle13.jpg/220px-Multiviralcalle13.jpg', 2, 1);


insert into song_instances(user_id, song_instance_title, song_instance_art, language_id, artist_id)
values(1, 'Soldi', 'https://s.mxmcdn.net/images-storage/albums4/3/4/9/4/7/6/42674943_350_350.jpg', 4, 2);


insert into song_instances(user_id, song_instance_title, song_instance_art, language_id, artist_id)
values(1, 'American Kids', 'https://s.mxmcdn.net/images-storage/albums/6/0/8/2/9/7/30792806_350_350.jpg', 1, 3);

insert into song_instances(user_id, song_instance_title, song_instance_art, language_id, artist_id)
values(1, 'Coisa Linda', 'https://s.mxmcdn.net/images-storage/albums/3/3/5/9/0/0/32009533_350_350.jpg', 3, 4);


insert into song_instances(user_id, song_instance_title, song_instance_art, language_id, artist_id)
values(1, 'Cool Kids', 'https://s.mxmcdn.net/images-storage/albums/5/6/8/1/7/1/32171865_350_350.jpg', 1, 5);