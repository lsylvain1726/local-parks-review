    CREATE TABLE park (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        description TEXT,
        location_id INTEGER REFERENCES states(id)
    );