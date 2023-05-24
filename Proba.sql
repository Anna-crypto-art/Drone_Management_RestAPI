sudo - u postgres psql \ conninfo CREATE DATABASE task_2;

\ c task_2 CREATE TABLE brand_of_drones (
    brand_drone_name VARCHAR PRIMARY KEY,
    owner_name VARCHAR
);

CREATE TABLE flight_of_the_drone (
    flight_id INT PRIMARY KEY,
    date_of_flight DATE,
    duration_of_flight TIME,
    location_GPS VARCHAR,
    note_field VARCHAR
);

CREATE TABLE drone (
    model_of_drone VARCHAR PRIMARY KEY,
    brand_drone_name VARCHAR,
    FOREIGN KEY(brand_drone_name) REFERENCES brand_of_drones(brand_drone_name),
    serial_number VARCHAR,
    diagonal_length REAL,
    max_flight_distance REAL,
    sensor VARCHAR,
    flight_id INT,
    FOREIGN KEY(flight_id) REFERENCES flight_of_the_drone(flight_id)
);

INSERT INTO
    brand_of_drones (brand_drone_name, owner_name)
VALUES
    ('AgroDrone', 'Skydio');

INSERT INTO
    flight_of_the_drone (
        flight_id,
        date_of_flight,
        duration_of_flight,
        location_GPS,
        note_field
    ) VALUE S (1, '2023-05-22', '04:05', 'PST', 'It is done');

INSERT INTO
    drone (
        model_of_drone,
        brand_drone_name,
        serial_number,
        diagonal_length,
        max_flight_distance,
        sensor,
        flight_id
    )
VALUES
    (
        'Fluggerat',
        'AgroDrone',
        '123',
        380,
        32,
        'DJI Mavic 3E',
        1
    );

SELECT
    *
FROM
    brand_of_drones;