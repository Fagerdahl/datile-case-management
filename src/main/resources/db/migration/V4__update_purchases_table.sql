ALTER TABLE purchases
    CHANGE COLUMN purchase item_name VARCHAR(255) NOT NULL;

ALTER TABLE purchases
    CHANGE COLUMN price purchase_price DECIMAL(10,2) NOT NULL;

ALTER TABLE purchases
    CHANGE COLUMN shipping shipping_cost DECIMAL(10,2) NOT NULL DEFAULT 0.00;

ALTER TABLE purchases
    CHANGE COLUMN outgoing sale_price DECIMAL(10,2) NOT NULL DEFAULT 0.00;

ALTER TABLE purchases
    ADD COLUMN quantity INT NOT NULL DEFAULT 1;