CREATE TABLE Employee(
    id BIGSERIAL UNIQUE NOT NULL ,
    last_name VARCHAR(50),
    first_name VARCHAR(50),
    date_of_birth DATE,
    is_active BOOLEAN,
    user_id INT NOT NULL
);

ALTER TABLE Employee ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ;

CREATE TYPE verification as ENUM('active', 'pending');

CREATE TABLE Users(
    id SERIAL PRIMARY KEY UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR UNIQUE NOT NULL,
    email VARCHAR UNIQUE NOT NULL, 
    status verification default 'pending' NOT NULL,
    confirmationcode VARCHAR UNIQUE
);
