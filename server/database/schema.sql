CREATE TABLE `role` (
    `id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `role` VARCHAR(20) NOT NULL
);

CREATE TABLE `ingredient` (
    `id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `calories` INT NOT NULL
);

CREATE TABLE `category` (
    `id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `name` VARCHAR(100) NOT NULL
);

CREATE TABLE user (
    `id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `firstname` VARCHAR(100) NOT NULL,
    `lastname` VARCHAR(100) NOT NULL,
    `username` VARCHAR(100) NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `role_id` INT UNSIGNED NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    FOREIGN KEY (`role_id`) REFERENCES `role` (id)
);

CREATE TABLE `recipe` (
    `id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `title` VARCHAR(100),
    `descriptionText` VARCHAR(500),
    `time` INT NOT NULL,
    `category_id` INT UNSIGNED NOT NULL,
    FOREIGN KEY (`category_id`) REFERENCES `category` (id)
);

CREATE TABLE `favorite` (
    `id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `recipe_id` INT UNSIGNED NOT NULL,
    `user_id` INT UNSIGNED NOT NULL,
    FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (id),
    FOREIGN KEY (`user_id`) REFERENCES `user` (id)
);

CREATE TABLE `quantity` (
    `id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `recipe_id` INT UNSIGNED NOT NULL,
    `ingredient_id` INT UNSIGNED NOT NULL,
    `quantity` INT NOT NULL,
    FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (id),
    FOREIGN KEY (`ingredient_id`) REFERENCES `ingredient` (id)
);