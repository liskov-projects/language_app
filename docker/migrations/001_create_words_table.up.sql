
CREATE TABLE IF NOT EXISTS words (
    id SERIAL PRIMARY KEY,
    word TEXT NOT NULL,
    translation TEXT NOT NULL,
    example TEXT,
    translation_example TEXT,
    category TEXT NOT NULL,
    pronunciation TEXT NOT NULL,
    picture TEXT
);
