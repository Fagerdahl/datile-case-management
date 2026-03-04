DROP TABLE IF EXISTS errands;
DROP TABLE IF EXISTS statuses;

CREATE TABLE statuses
(
    status_id BIGINT PRIMARY KEY,
    name      VARCHAR(100) NOT NULL
);

CREATE TABLE errands
(
    errand_id  BIGINT PRIMARY KEY AUTO_INCREMENT,
    created_at TIMESTAMP    NOT NULL,
    title      VARCHAR(255) NOT NULL,
    status_id  BIGINT       NOT NULL,
    CONSTRAINT fk_errands_status FOREIGN KEY (status_id) REFERENCES statuses (status_id)
);

INSERT INTO statuses(status_id, name)
VALUES (1, 'New');
INSERT INTO statuses(status_id, name)
VALUES (2, 'In Progress');

INSERT INTO errands(created_at, title, status_id)
VALUES (UTC_TIMESTAMP(), 'Server installation', 1);
INSERT INTO errands(created_at, title, status_id)
VALUES (UTC_TIMESTAMP(), 'Update firewall rules', 2);