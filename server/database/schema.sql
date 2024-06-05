-- create table role (
--     id int unsigned primary key auto_increment not null,
--     role varchar(20) not null
-- );

-- create table ingredient (
--     id int unsigned primary key auto_increment not null,
--     name varchar(100) not null,
--     calories int not null
-- );

-- create table user (
--     id int unsigned primary key auto_increment not null,
--     firstname varchar(100) not null,
--     lastname varchar(100) not null,
--     username varchar(100) not null,
--     email varchar(255) not null unique,
--     role_id int not null,
--     password varchar(255) not null,
--     FOREIGN KEY (role_id) REFERENCES role (id)
-- );

-- create table favorite (
--     id int unsigned primary key auto_increment not null,
--     recipe_id int not null,
--     user_id int not null,
--     FOREIGN KEY (recipe_id) REFERENCES recipe (id),
--     FOREIGN KEY (user_id) REFERENCES user (id)
-- );

-- create table recipe (
--     id int unsigned primary key auto_increment not null,
--     title varchar(100),
--     descriptionText VARCHAR(500),
--     time int not null,
--     category_id int not null,
--     FOREIGN KEY (category_id) REFERENCES category (id)
-- );

-- create table quantity (
--     id int unsigned primary key auto_increment not null,
--     recipe_id int not null,
--     ingredient_id int not null,
--     quantity int not NULL FOREIGN KEY (recipe_id) REFERENCES recipe (id),
--     FOREIGN KEY (ingredient_id) REFERENCES ingredient (id)
-- );

-- Créer la table role en premier
-- Créer la table role en premier
CREATE TABLE role (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    role VARCHAR(20) NOT NULL
);

-- Créer la table ingredient
CREATE TABLE ingredient (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(100) NOT NULL,
    calories INT NOT NULL
);

CREATE TABLE category (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(100) NOT NULL
);

-- Créer la table user
CREATE TABLE user (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role_id INT UNSIGNED NOT NULL, -- Assurez-vous que cette colonne est UNSIGNED
    password VARCHAR(255) NOT NULL,
    FOREIGN KEY (role_id) REFERENCES role (id)
);

-- Créer la table recipe
CREATE TABLE recipe (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    title VARCHAR(100),
    descriptionText VARCHAR(500),
    time INT NOT NULL,
    category_id INT UNSIGNED NOT NULL, -- Assurez-vous que cette colonne est UNSIGNED
    FOREIGN KEY (category_id) REFERENCES category (id)
);

-- Créer la table favorite
CREATE TABLE favorite (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    recipe_id INT UNSIGNED NOT NULL, -- Assurez-vous que cette colonne est UNSIGNED
    user_id INT UNSIGNED NOT NULL, -- Assurez-vous que cette colonne est UNSIGNED
    FOREIGN KEY (recipe_id) REFERENCES recipe (id),
    FOREIGN KEY (user_id) REFERENCES user (id)
);

-- Créer la table quantity
CREATE TABLE quantity (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    recipe_id INT UNSIGNED NOT NULL, -- Assurez-vous que cette colonne est UNSIGNED
    ingredient_id INT UNSIGNED NOT NULL, -- Assurez-vous que cette colonne est UNSIGNED
    quantity INT NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES recipe (id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredient (id)
);

-- Créer la table category