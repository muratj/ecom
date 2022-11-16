-- Active: 1668114214247@@127.0.0.1@5432@ecom@public

-- function and trigger for updated_at column

DROP TRIGGER IF EXISTS SET_TIMESTAMP ON products;

DROP FUNCTION TRIGGER_SET_TIMESTAMP;

CREATE FUNCTION TRIGGER_SET_TIMESTAMP() RETURNS TRIGGER 
AS $$ 
	BEGIN NEW.updated_at = NOW();
	return NEW;
	END;
	$$ LANGUAGE 
PLPGSQL; 

CREATE TRIGGER SET_TIMESTAMP 
	BEFORE
	UPDATE ON products FOR EACH ROW
	EXECUTE
	    PROCEDURE trigger_set_timestamp()
; 

-- Create Tables

CREATE TABLE
    IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        brand VARCHAR(50) NOT NULL,
        model VARCHAR(50) NOT NULL,
        image VARCHAR(255),
        description VARCHAR(255),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    );
