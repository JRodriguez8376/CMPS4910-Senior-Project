INSERT INTO users(email, passwrd) values('alonso@justalonso.net', 'igotatesla');
INSERT INTO users(email, passwrd) values( 'joshua@cminusminus.com', 'dunnowhattoputhere');
INSERT INTO users(email) values('iOS');
INSERT INTO users(email) values('Android');
INSERT INTO users(email) values('iOS');
INSERT INTO users(email) values('Android');
INSERT INTO users(email) values('Android');
INSERT INTO users(email) values('iOS');
--Valid login users
-- passwords are "user" + device_id
-- "user9" for user9@pathogentest.edu for example

INSERT INTO users(email, passwrd) values( 'user9@pathogentest.edu', '$2b$10$Vij8.IiKN/V8Pchy5b.zN.X4PFheBB.u.W2rD4JYYawYUXF6inEmm');
INSERT INTO users(email, passwrd) values('user10@pathogentest.edu', '$2b$10$LGLZgNN6zEcvZRuc6XjDzORQkfZijxSBzbpvhcUuwDh8DHdxHSW32');
INSERT INTO users(email, passwrd) values('user11@pathogentest.edu', '$2b$10$ZtC2aMGcNHbOerWDvhIVPu6t41A4.Ixqfw.T/bjBxoj/CfV8UY7pC');
INSERT INTO users(email, passwrd) values( 'user12@pathogentest.edu', '$2b$10$2pmMi038wlG9ZXsoslDds.sDQY7dZc96QplvFMAbOqEPwkJ/Jb1JC');
INSERT INTO users(email) values( 'user13@pathogentest.edu');

-- Custom login users

INSERT INTO users(device_id, email, passwrd, fb_token) values(571,  'josh@suffering.com', '$2b$10$BWRUB6V4uR/oXNYo8IZYt.5Ku06H0CHLrq2tEb108pMMsZyks5GG.', 'f9WBONosSvqE6_0uSGZ4Bw:APA91bGxKWABsBhpRlulOGXqvo5V50dJ63JGMOUTHha987QXM46g6owbOtUAJqutLSDbSZFasCfzInb8BJaG4Nv7vkg5BigD2BzsZ8n3QZ67oT-zbakFCN3r0GGWBviMIBnr27qGBa_Q');
INSERT INTO users(device_id, email, passwrd) values(1001, 'alonso@teamPATHOGEN.edu', '$2b$10$WvyZ.nEH2w0ydPgyLi.UieI7y2Jji.Wu9zPX21dC23dqnGu6qMAGS');
INSERT INTO users(device_id, email, passwrd) values(1002,  'drew@teamPATHOGEN.edu', '$2b$10$8R3F5nPocbzTljmkuHpOMORQPT5mjefilPk00PIg8pTJfAtYEGrqS');
INSERT INTO users(device_id, email, passwrd) values(1003, 'adolfo@teamPATHOGEN.edu', '$2b$10$JFZVZw/gMfABNZcJvuplJueYuJXojRINKEnMrYVD0ZwxABmZ9HU.m');
