ALTER TABLE user_progress
ADD CONSTRAINT IF NOT EXISTS unique_key
UNIQUE (user_id, word);

INSERT INTO user_progress (user_id, word, box, last_reviewed, next_review) VALUES

('92f9b51f-c523-4ea3-a1f9-ee133c5b4a14', 'exe', 1, '2025-05-01 10:00:00', '2025-05-08 10:00:00'),
('92f9b51f-c523-4ea3-a1f9-ee133c5b4a14', 'esege', 2, '2025-05-03 15:30:00', '2025-05-10 15:30:00'),
('92f9b51f-c523-4ea3-a1f9-ee133c5b4a14', 'avtobusoi', 3, '2025-04-28 09:00:00', '2025-05-12 09:00:00'),
('92f9b51f-c523-4ea3-a1f9-ee133c5b4a14', 'morin', 1, '2025-05-06 08:45:00', '2025-05-13 08:45:00');
