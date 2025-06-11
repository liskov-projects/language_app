-- most migration tools require both

-- this runs, but if we want to undo the change we use .down -- 
ALTER TABLE user_progress
ADD CONSTRAINT user_word_unique UNIQUE (user_id, word);