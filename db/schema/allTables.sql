DROP TABLE IF EXISTS participants
CASCADE;

DROP TABLE IF EXISTS users
CASCADE;

DROP TABLE IF EXISTS events
CASCADE;


CREATE TABLE users
(
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  bio TEXT ,
  email VARCHAR(255) NOT NULL,
  pass VARCHAR(255) NOT NULL,
  avatar VARCHAR(255),
  background VARCHAR(255),
  joined_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE events
(
  id SERIAL PRIMARY KEY NOT NULL,
  creator_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  picture VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  location VARCHAR(255) NOT NULL,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  created_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE participants
(
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
  admin BOOLEAN NOT NULL,
  joined_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);