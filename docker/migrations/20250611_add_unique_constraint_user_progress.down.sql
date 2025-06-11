-- needed if we want to roll back to prev version

ALTER TABLE user_progress 
DROP CONSTRAINT IF EXISTS user_word_unique;
