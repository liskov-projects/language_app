
CREATE TABLE user_progress (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    word TEXT NOT NULL,
    box INT NOT NULL,
    last_reviewed TIMESTAMP NOT NULL,
    next_review TIMESTAMP NOT NULL
);