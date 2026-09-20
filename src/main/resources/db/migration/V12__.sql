ALTER TABLE customer_product
DROP FOREIGN KEY FK_CUSTOMERPRODUCT_ON_PRODUCT;

ALTER TABLE customer_product
DROP INDEX uc_fd07958374c393282b89132fd;

ALTER TABLE customer_product
    ADD CONSTRAINT uc_customer_product
        UNIQUE (customer_id, product_id);

ALTER TABLE customer_product
    ADD CONSTRAINT FK_CUSTOMERPRODUCT_ON_PRODUCT
        FOREIGN KEY (product_id)
            REFERENCES product(id);