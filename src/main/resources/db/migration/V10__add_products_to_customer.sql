CREATE TABLE customer_product
(
    id                   BIGINT AUTO_INCREMENT NOT NULL,
    customer_customer_id BIGINT NOT NULL,
    product_id           BIGINT NOT NULL,
    amount               INT    NOT NULL,
    CONSTRAINT pk_customerproduct PRIMARY KEY (id)
);

CREATE TABLE product
(
    id             BIGINT AUTO_INCREMENT NOT NULL,
    article_number VARCHAR(255) NOT NULL,
    title          VARCHAR(255) NOT NULL,
    CONSTRAINT pk_product PRIMARY KEY (id)
);

ALTER TABLE customer_product
    ADD CONSTRAINT uc_fd07958374c393282b89132fd UNIQUE (product_id);

ALTER TABLE product
    ADD CONSTRAINT uc_product_articlenumber UNIQUE (article_number);

ALTER TABLE customer_product
    ADD CONSTRAINT FK_CUSTOMERPRODUCT_ON_CUSTOMER_CUSTOMER FOREIGN KEY (customer_customer_id) REFERENCES customers (customer_id);

ALTER TABLE customer_product
    ADD CONSTRAINT FK_CUSTOMERPRODUCT_ON_PRODUCT FOREIGN KEY (product_id) REFERENCES product (id);