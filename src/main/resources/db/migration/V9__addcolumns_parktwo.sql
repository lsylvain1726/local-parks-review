ALTER TABLE park
    ADD COLUMN exception_end_date VARCHAR(255),
    ADD COLUMN exception_start_date VARCHAR(255),
    ADD COLUMN directions_url TEXT,
    ADD COLUMN hours_description TEXT;