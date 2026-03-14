CREATE TABLE user
(
    id       BIGINT       NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    username VARCHAR(255) NULL,
    password VARCHAR(255) NULL,
    role     VARCHAR(255) NULL
);

INSERT INTO user(username, password, role)
VALUES ('jimmy@gmail.com', '$2a$10$OWtxLEAOiGedqi0n7sFBq.oKTr3LWPlDcrCgnTrEuWWZGuWpocYKW', 'ADMIN'),
       ('niklas@gmail.com', '$2a$10$OWtxLEAOiGedqi0n7sFBq.oKTr3LWPlDcrCgnTrEuWWZGuWpocYKW', 'ADMIN'),
       ('leo@gmail.com', '$2a$10$OWtxLEAOiGedqi0n7sFBq.oKTr3LWPlDcrCgnTrEuWWZGuWpocYKW', 'ADMIN'),
       ('ronja@gmail.com', '$2a$10$OWtxLEAOiGedqi0n7sFBq.oKTr3LWPlDcrCgnTrEuWWZGuWpocYKW', 'USER'),
       ('viktor@gmail.com', '$2a$10$OWtxLEAOiGedqi0n7sFBq.oKTr3LWPlDcrCgnTrEuWWZGuWpocYKW', 'USER');