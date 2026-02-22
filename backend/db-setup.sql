-- Run this only if you want to manually set up the database.
-- The server creates everything automatically on startup,
-- but you can run this to reset or inspect.

CREATE DATABASE IF NOT EXISTS clicker_game;
USE clicker_game;

DROP TABLE IF EXISTS leaderboard;
CREATE TABLE leaderboard (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player VARCHAR(100) NOT NULL,
    score INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO leaderboard (player, score) VALUES
    ('Evelyn', 7823), ('Vi', 5421), ('Kiran', 9234),
    ('Spencer', 3456), ('Raf', 8765), ('Cris', 4321),
    ('Julian2', 9876), ('Dylan', 2145), ('Vini', 6789),
    ('Nick', 5432), ('Diana', 7654), ('Yeison', 3987),
    ('Julian1', 8234), ('Tobias', 4765), ('Ken', 6543),
    ('Felipe', 5678), ('Tyler', 7432);

SELECT * FROM leaderboard ORDER BY score DESC;
