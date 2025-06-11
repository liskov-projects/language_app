ALTER TABLE user_progress
ADD CONSTRAINT user_word_unique UNIQUE (user_id, word);