use gamehub;


#Criar Avatares
insert into avatar (id, link) values (1, 'https://cdn.discordapp.com/attachments/948569323633541130/986268312914771988/ezgif.com-gif-maker.gif');

################
# Criar Gamers
insert into gamer (id, classificacao, data_nascimento, estado, nome, numero_classificacoes, avatar_id, grupo_id) values (1, 5, '1997-06-14 04:45:03', 'Offline', 'GameHub', 1, 1, NULL);

###########
# Criar Utilizador
insert into utilizador (id, email, password, gamer_id) values (1, 'gamehub@gmail.com', 'gamehub', 1);

#########################
# Criar Reconpensa
insert into recompensa (id, descricao, image_link, nome) values (1, 'Conseguiu atingir os 100 likes nas suas publicações!', 'https://media.discordapp.net/attachments/945776038129070140/985927805437095956/100likes.png','100 likes');
insert into recompensa (id, descricao, image_link, nome) values (3, 'Obteve o prémio player of the week na semana 19 de 2022!', 'https://media.discordapp.net/attachments/945776038129070140/985925398359580682/playerofweek1.png','POTW 19 - 2022');
insert into recompensa (id, descricao, image_link, nome) values (2, 'Obteve o prémio player of the week na semana 29 de 2022!', 'https://media.discordapp.net/attachments/945776038129070140/985925398586077204/playerofweek2.png','POTW 29 - 2022');
insert into recompensa (id, descricao, image_link, nome) values (4, 'Eu sou um administrador... tem respeito!!!', 'https://cdn.discordapp.com/attachments/945776038129070140/985927805634220032/admin_reward.png','Admin');

##################
# Criar recompensas
insert into recompensas (gamer, recompensa) values (1, 4);
insert into recompensas (gamer, recompensa) values (1, 1);

###################
# Criar plataformas
insert into plataforma values (1,'Microsoft Windows','PC');
insert into plataforma values (2,'','PlayStation 5');
insert into plataforma values (3,'','PlayStation 4');
insert into plataforma values (4,'','PlayStation 3');
insert into plataforma values (5,'','Xbox Series X/S');
insert into plataforma values (6,'','Xbox One');
insert into plataforma values (7,'','Xbox 360');
insert into plataforma values (8,'','Nintendo Switch');
insert into plataforma values (9,'','Mobile');

###################
# Criar Jogo e plataformas
insert into jogo (id, ano_lancamento, desenvolvedora, faixa_etaria, nome, banner_link) values (1, 2018, 'InnerSloth', 10, 'Among Us','https://i.imgur.com/4s7AxMo.png');
insert into jogo_plataformas (jogo_id, plataformas_id) values (1, 1);
insert into jogo_plataformas (jogo_id, plataformas_id) values (1, 2);
insert into jogo_plataformas (jogo_id, plataformas_id) values (1, 3);
insert into jogo_plataformas (jogo_id, plataformas_id) values (1, 5);
insert into jogo_plataformas (jogo_id, plataformas_id) values (1, 6);
insert into jogo_plataformas (jogo_id, plataformas_id) values (1, 8);
insert into jogo_plataformas (jogo_id, plataformas_id) values (1, 9);

insert into jogo (id, ano_lancamento, desenvolvedora, faixa_etaria, nome, banner_link) values (2, 2019, 'Eletronic Arts', 16, 'Apex Legends','https://i.imgur.com/LbtqOg7.png');
insert into jogo_plataformas (jogo_id, plataformas_id) values (2, 1);
insert into jogo_plataformas (jogo_id, plataformas_id) values (2, 2);
insert into jogo_plataformas (jogo_id, plataformas_id) values (2, 3);
insert into jogo_plataformas (jogo_id, plataformas_id) values (2, 5);
insert into jogo_plataformas (jogo_id, plataformas_id) values (2, 6);
insert into jogo_plataformas (jogo_id, plataformas_id) values (2, 8);
insert into jogo_plataformas (jogo_id, plataformas_id) values (2, 9);

insert into jogo (id, ano_lancamento, desenvolvedora, faixa_etaria, nome, banner_link) values (3, 2018, 'Treyarch', 18, 'Call of Duty Black Ops IV','https://i.imgur.com/bGwI9FD.png');
insert into jogo_plataformas (jogo_id, plataformas_id) values (3, 1);
insert into jogo_plataformas (jogo_id, plataformas_id) values (3, 3);
insert into jogo_plataformas (jogo_id, plataformas_id) values (3, 6);

insert into jogo (id, ano_lancamento, desenvolvedora, faixa_etaria, nome, banner_link) values (4, 2012, 'Valve Corporation', 18, 'Counter-Strike: Global Offensive','https://i.imgur.com/luGWFuD.png');
insert into jogo_plataformas (jogo_id, plataformas_id) values (4, 1);
insert into jogo_plataformas (jogo_id, plataformas_id) values (4, 4);
insert into jogo_plataformas (jogo_id, plataformas_id) values (4, 7);

insert into jogo (id, ano_lancamento, desenvolvedora, faixa_etaria, nome, banner_link) values (5, 2012, 'Blizzard Entertainment', 16, 'Diablo III','https://i.imgur.com/9Ttw7rs.png');
insert into jogo_plataformas (jogo_id, plataformas_id) values (5, 1);
insert into jogo_plataformas (jogo_id, plataformas_id) values (5, 3);
insert into jogo_plataformas (jogo_id, plataformas_id) values (5, 4);
insert into jogo_plataformas (jogo_id, plataformas_id) values (5, 6);
insert into jogo_plataformas (jogo_id, plataformas_id) values (5, 7);
insert into jogo_plataformas (jogo_id, plataformas_id) values (5, 8);

insert into jogo (id, ano_lancamento, desenvolvedora, faixa_etaria, nome, banner_link) values (6, 2013, 'Valve Corporation', 12, 'Dota 2','https://i.imgur.com/WSoqYkB.png');
insert into jogo_plataformas (jogo_id, plataformas_id) values (6, 1);

insert into jogo (id, ano_lancamento, desenvolvedora, faixa_etaria, nome, banner_link) values (7, 2021, 'Electronic Arts', 3, 'FIFA', 'https://cdn.discordapp.com/attachments/948569323633541130/983036503129219092/Fifa.png');
insert into jogo_plataformas (jogo_id, plataformas_id) values (7, 1);
insert into jogo_plataformas (jogo_id, plataformas_id) values (7, 2);
insert into jogo_plataformas (jogo_id, plataformas_id) values (7, 3);
insert into jogo_plataformas (jogo_id, plataformas_id) values (7, 4);
insert into jogo_plataformas (jogo_id, plataformas_id) values (7, 5);
insert into jogo_plataformas (jogo_id, plataformas_id) values (7, 6);
insert into jogo_plataformas (jogo_id, plataformas_id) values (7, 7);
insert into jogo_plataformas (jogo_id, plataformas_id) values (7, 8);
insert into jogo_plataformas (jogo_id, plataformas_id) values (7, 9);

insert into jogo (id, ano_lancamento, desenvolvedora, faixa_etaria, nome, banner_link) values (8, 2017, 'Epic Games', 12, 'Fortnite','https://i.imgur.com/D8LftMo.png');
insert into jogo_plataformas (jogo_id, plataformas_id) values (8, 1);
insert into jogo_plataformas (jogo_id, plataformas_id) values (8, 2);
insert into jogo_plataformas (jogo_id, plataformas_id) values (8, 3);
insert into jogo_plataformas (jogo_id, plataformas_id) values (8, 5);
insert into jogo_plataformas (jogo_id, plataformas_id) values (8, 6);
insert into jogo_plataformas (jogo_id, plataformas_id) values (8, 8);
insert into jogo_plataformas (jogo_id, plataformas_id) values (8, 9);

insert into jogo (id, ano_lancamento, desenvolvedora, faixa_etaria, nome, banner_link) values (9, 2006, 'Facepunch Studios', 18, 'Garrys Mod','https://i.imgur.com/C4ZseSP.png');
insert into jogo_plataformas (jogo_id, plataformas_id) values (9, 1);

insert into jogo (id, ano_lancamento, desenvolvedora, faixa_etaria, nome, banner_link) values (10, 2014, 'Blizzard Entertainment', 7, 'Hearthstone','https://i.imgur.com/Xs7rWIm.png');
insert into jogo_plataformas (jogo_id, plataformas_id) values (10, 1);
insert into jogo_plataformas (jogo_id, plataformas_id) values (10, 9);

insert into jogo (id, ano_lancamento, desenvolvedora, faixa_etaria, nome, banner_link) values (11, 2009, 'Riot Games', 12, 'League of Legends','https://i.imgur.com/GypZ6C0.png');
insert into jogo_plataformas (jogo_id, plataformas_id) values (11, 1);
insert into jogo_plataformas (jogo_id, plataformas_id) values (11, 9);

insert into jogo (id, ano_lancamento, desenvolvedora, faixa_etaria, nome, banner_link) values (12, 2011, 'Mojang Studios', 7, 'Minecraft','https://i.imgur.com/Rd52p2k.png');
insert into jogo_plataformas (jogo_id, plataformas_id) values (12, 1);
insert into jogo_plataformas (jogo_id, plataformas_id) values (12, 2);
insert into jogo_plataformas (jogo_id, plataformas_id) values (12, 3);
insert into jogo_plataformas (jogo_id, plataformas_id) values (12, 4);
insert into jogo_plataformas (jogo_id, plataformas_id) values (12, 5);
insert into jogo_plataformas (jogo_id, plataformas_id) values (12, 6);
insert into jogo_plataformas (jogo_id, plataformas_id) values (12, 7);
insert into jogo_plataformas (jogo_id, plataformas_id) values (12, 8);
insert into jogo_plataformas (jogo_id, plataformas_id) values (12, 9);

insert into jogo (id, ano_lancamento, desenvolvedora, faixa_etaria, nome, banner_link) values (13, 2016, 'Blizzard Entertainment', 12, 'Overwatch','https://i.imgur.com/ArWXyYz.png');
insert into jogo_plataformas (jogo_id, plataformas_id) values (13, 1);
insert into jogo_plataformas (jogo_id, plataformas_id) values (13, 3);
insert into jogo_plataformas (jogo_id, plataformas_id) values (13, 6);
insert into jogo_plataformas (jogo_id, plataformas_id) values (13, 8);

insert into jogo (id, ano_lancamento, desenvolvedora, faixa_etaria, nome, banner_link) values (14, 2017, 'PUBG Corporation', 16, 'PlayerUnknown Battlegrounds','https://i.imgur.com/xpdq2Rj.png');
insert into jogo_plataformas (jogo_id, plataformas_id) values (14, 1);
insert into jogo_plataformas (jogo_id, plataformas_id) values (14, 2);
insert into jogo_plataformas (jogo_id, plataformas_id) values (14, 3);
insert into jogo_plataformas (jogo_id, plataformas_id) values (14, 5);
insert into jogo_plataformas (jogo_id, plataformas_id) values (14, 6);
insert into jogo_plataformas (jogo_id, plataformas_id) values (14, 9);

insert into jogo (id, ano_lancamento, desenvolvedora, faixa_etaria, nome, banner_link) values (15, 2015, 'Ubisoft', 18, 'Tom Clancy Rainbow Six Siege', 'https://i.imgur.com/z6l13XF.png');
insert into jogo_plataformas (jogo_id, plataformas_id) values (15, 1);
insert into jogo_plataformas (jogo_id, plataformas_id) values (15, 2);
insert into jogo_plataformas (jogo_id, plataformas_id) values (15, 3);
insert into jogo_plataformas (jogo_id, plataformas_id) values (15, 5);
insert into jogo_plataformas (jogo_id, plataformas_id) values (15, 6);

insert into jogo (id, ano_lancamento, desenvolvedora, faixa_etaria, nome, banner_link) values (16, 2015, 'Psyonix', 3, 'Rocket League','https://i.imgur.com/HiDkN5w.png');
insert into jogo_plataformas (jogo_id, plataformas_id) values (16, 1);
insert into jogo_plataformas (jogo_id, plataformas_id) values (16, 3);
insert into jogo_plataformas (jogo_id, plataformas_id) values (16, 6);
insert into jogo_plataformas (jogo_id, plataformas_id) values (16, 8);

insert into jogo (id, ano_lancamento, desenvolvedora, faixa_etaria, nome, banner_link) values (17, 2013, 'Facepunch Studios', 16, 'Rust','https://i.imgur.com/gWmNOr1.png');
insert into jogo_plataformas (jogo_id, plataformas_id) values (17, 1);
insert into jogo_plataformas (jogo_id, plataformas_id) values (17, 3);
insert into jogo_plataformas (jogo_id, plataformas_id) values (17, 6);

insert into jogo (id, ano_lancamento, desenvolvedora, faixa_etaria, nome, banner_link) values (18, 2016, 'Chucklefish', 12, 'Starbound','https://i.imgur.com/m7ZbPLG.png');
insert into jogo_plataformas (jogo_id, plataformas_id) values (18, 1);
insert into jogo_plataformas (jogo_id, plataformas_id) values (18, 3);
insert into jogo_plataformas (jogo_id, plataformas_id) values (18, 6);

insert into jogo (id, ano_lancamento, desenvolvedora, faixa_etaria, nome, banner_link) values (19, 2010, 'Blizzard Entertainment', 16, 'StarCraft II: Wings of Liberty','https://i.imgur.com/619ge9e.png');
insert into jogo_plataformas (jogo_id, plataformas_id) values (19, 1);

insert into jogo (id, ano_lancamento, desenvolvedora, faixa_etaria, nome, banner_link) values (20, 2013, 'Digital Extremes', 18, 'Warframe','https://i.imgur.com/GpvV3uD.png');
insert into jogo_plataformas (jogo_id, plataformas_id) values (20, 1);
insert into jogo_plataformas (jogo_id, plataformas_id) values (20, 2);
insert into jogo_plataformas (jogo_id, plataformas_id) values (20, 3);
insert into jogo_plataformas (jogo_id, plataformas_id) values (20, 5);
insert into jogo_plataformas (jogo_id, plataformas_id) values (20, 6);
insert into jogo_plataformas (jogo_id, plataformas_id) values (20, 8);

insert into jogo (id, ano_lancamento, desenvolvedora, faixa_etaria, nome, banner_link) values (21, 2004, 'Blizzard Entertainment', 12, 'World of Warcraft','https://i.imgur.com/BMwGht8.png');
insert into jogo_plataformas (jogo_id, plataformas_id) values (21, 1);

insert into jogo (id, ano_lancamento, desenvolvedora, faixa_etaria, nome, banner_link) values (22, 2013, 'Rockstar Games', 18, 'Grand Theft Auto V', 'https://i.imgur.com/SarRED2.png');
insert into jogo_plataformas (jogo_id, plataformas_id) values (22, 1);
insert into jogo_plataformas (jogo_id, plataformas_id) values (22, 2);
insert into jogo_plataformas (jogo_id, plataformas_id) values (22, 3);
insert into jogo_plataformas (jogo_id, plataformas_id) values (22, 4);
insert into jogo_plataformas (jogo_id, plataformas_id) values (22, 5);
insert into jogo_plataformas (jogo_id, plataformas_id) values (22, 6);
insert into jogo_plataformas (jogo_id, plataformas_id) values (22, 7);

insert into jogo (id, ano_lancamento, desenvolvedora, faixa_etaria, nome, banner_link) values (23, 2020, 'Riot Games', 16, 'Valorant', 'https://i.imgur.com/RAOTgrs.png');
insert into jogo_plataformas (jogo_id, plataformas_id) values (23, 1);

#################
# Criar Tag
insert into tag (id, descricao, fim_torneio, tag, recompensa_id) values (2, 'Player of the week 29', '2022-06-24 23:59:43', 'POTW 29 - 2022', 2);

insert into tag (id, descricao, fim_torneio, tag, recompensa_id) values (6, 'Tag do jogo Multiplayer', NULL, 'Multiplayer', NULL);
insert into tag (id, descricao, fim_torneio, tag, recompensa_id) values (1, 'NEWS', NULL, 'NEWS', NULL);


##################
# Criar Tags Jogo
insert into jogo_tags values (1,6);
insert into jogo_tags values (2,6);
insert into jogo_tags values (3,6);
insert into jogo_tags values (4,6);
insert into jogo_tags values (5,6);
insert into jogo_tags values (6,6);
insert into jogo_tags values (7,6);
insert into jogo_tags values (8,6);
insert into jogo_tags values (9,6);
insert into jogo_tags values (10,6);
insert into jogo_tags values (11,6);
insert into jogo_tags values (12,6);
insert into jogo_tags values (13,6);
insert into jogo_tags values (14,6);
insert into jogo_tags values (15,6);
insert into jogo_tags values (16,6);
insert into jogo_tags values (17,6);
insert into jogo_tags values (18,6);
insert into jogo_tags values (19,6);
insert into jogo_tags values (20,6);
insert into jogo_tags values (21,6);
insert into jogo_tags values (22,6);
insert into jogo_tags values (23,6);