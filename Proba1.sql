CREATE DATABASE task_2;

CREATE TABLE drone_brand (
    brand_id SERIAL PRIMARY KEY,
    brand_name VARCHAR,
    owner_name VARCHAR NOT NULL
);

CREATE TABLE drone_flight (
    flight_id SERIAL PRIMARY KEY,
    flight_date DATE NOT NULL,
    flight_duration TIME NOT NULL,
    GPS_longitute FLOAT NOT NULL,
    GPS_latitute FLOAT NOT NULL,
    GPS_altidude FLOAT NOT NULL,
    note_field VARCHAR NOT NULL
);

CREATE TABLE drone (
    drone_id SERIAL PRIMARY KEY, 
    model VARCHAR NOT NULL,
    brand_id INT NOT NULL,
    FOREIGN KEY(brand_id) REFERENCES drone_brand(brand_id),
    serial_number VARCHAR NOT NULL,
    diagonal_length REAL NOT NULL,
    max_flight_distance REAL NOT NULL,
    sensor VARCHAR NOT NULL,
    flight_id INT NOT NULL,
    FOREIGN KEY(flight_id) REFERENCES drone_flight(flight_id)
);

INSERT INTO
    drone_brand (brand_name, owner_name)
VALUES
    ('AgroDrone', 'Skydio');

INSERT INTO
    drone_flight (
        flight_date,
        flight_duration,
        GPS_longitute,
        GPS_latitute,
        GPS_altidude,
        note_field
    ) VALUES ('2023-05-22', '04:05', 26.5, 12.2, 71.6, 'It is done');

INSERT INTO
    drone (
        model,
        brand_id,
        serial_number,
        diagonal_length,
        max_flight_distance,
        sensor,
        flight_id
    )
VALUES
    (
        'Fluggerat',
        1,
        '123',
        380,
        32,
        'DJI Mavic 3E',
        1
    );

SELECT
    *
FROM
    drone_brand;

SELECT
    *
FROM
    drone_flight;

SELECT
    *
FROM
    drone;