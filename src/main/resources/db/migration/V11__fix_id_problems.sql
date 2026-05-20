ALTER TABLE customer_product
DROP
FOREIGN KEY FK_CUSTOMERPRODUCT_ON_CUSTOMER_CUSTOMER;

ALTER TABLE customer_product
    ADD customer_id BIGINT NULL;

ALTER TABLE customer_product
    MODIFY customer_id BIGINT NOT NULL;

ALTER TABLE customer_product
    ADD CONSTRAINT uc_21c7a33fad6980cda04ca367e UNIQUE (customer_id, product_id);

ALTER TABLE customer_product
    ADD CONSTRAINT FK_CUSTOMERPRODUCT_ON_CUSTOMER FOREIGN KEY (customer_id) REFERENCES customers (customer_id);

ALTER TABLE customer_product
DROP
COLUMN customer_customer_id;