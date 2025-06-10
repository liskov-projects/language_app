
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

insert into users (id, username, password, last_logged_in) values ('92f9b51f-c523-4ea3-a1f9-ee133c5b4a14', 'admin', '$2a$10$tkjq7M7cTzr00o3qPgQf4uFy3GrEsAAis5XUhuOxOuWEn9ceuahxu', NOW());
insert into users (id, username, password, last_logged_in) values (gen_random_uuid(), 'Natal', 'Laba', NOW());
insert into users (id, username, password, last_logged_in) values (gen_random_uuid(), 'Arv', 'Conen', NOW());
insert into users (id, username, password, last_logged_in) values (gen_random_uuid(), 'Kip', 'Patten', NOW());
insert into users (id, username, password, last_logged_in) values (gen_random_uuid(), 'Hy', 'Levine', NOW());
insert into users (id, username, password, last_logged_in) values (gen_random_uuid(), 'Dur', 'Ricardo', NOW());
insert into users (id, username, password, last_logged_in) values (gen_random_uuid(), 'Oberon', 'Houlson', NOW());
insert into users (id, username, password, last_logged_in) values (gen_random_uuid(), 'Randie', 'Deaconson', NOW());
insert into users (id, username, password, last_logged_in) values (gen_random_uuid(), 'Germayne', 'Grieswood', NOW());
insert into users (id, username, password, last_logged_in) values (gen_random_uuid(), 'Dorie', 'Oxbe', NOW());

