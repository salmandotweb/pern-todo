CREATE DATABASE perntodo;

CREATE TABLE todo(
   todo_id INT GENERATED ALWAYS AS IDENTITY,
   description VARCHAR(255) NOT NULL,
   PRIMARY KEY(todo_id)
);

CREATE TABLE image_files(
    image_id INT GENERATED ALWAYS AS IDENTITY,
	todo_id INT,
    filename TEXT UNIQUE NOT NULL,
    filepath TEXT NOT NULL,
    mimetype TEXT NOT NULL,
    size BIGINT NOT NULL,
	PRIMARY KEY(image_id),
	CONSTRAINT fk_todo
      FOREIGN KEY(todo_id) 
	  REFERENCES todo(todo_id)
);