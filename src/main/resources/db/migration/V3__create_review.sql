CREATE TABLE review (
    id SERIAL PRIMARY KEY,
    comment TEXT,
    visitor_id integer REFERENCES visitor(id),
    park_id integer REFERENCES park(id)
);
