-- SQLBook: Code
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS ingredient;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS recipe;
DROP TABLE IF EXISTS favorite;
DROP TABLE IF EXISTS quantity;


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
    `firstname` VARCHAR(100) ,
    `lastname` VARCHAR(100) ,
    `username` VARCHAR(100) NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `role_id` INT UNSIGNED NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    FOREIGN KEY (`role_id`) REFERENCES `role` (id)
);

CREATE TABLE `recipe` (
    `id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `title` VARCHAR(100),
    `descriptionText` VARCHAR(10000),
    `steps` TEXT NOT NULL,
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

INSERT INTO role (role) VALUES 
('user'),
('visitor'),
('admin');

INSERT INTO user (firstname, lastname, username, email,role_id, password) VALUES
('Lauryn', 'MARTIN', 'LM', 'martin@martin.fr', 1, 'toto'),
('Amel', 'Bonnevie', 'AB', 'bonnevie@bonneviefr', 3, 'tata');


INSERT INTO ingredient (name,calories) VALUES
('Pois',50),
("Huile d'olive",15),
("Herbes de Provence",10),
("Sel",5),
("Poivre", 5),
("Huile de tournesol",10),
("Salade",15),
("Avocat",30),
("Small Tomatoes",29),
("Pourpier",20),
("Choux rouge",43),
("Mangue",2),
("Patates douces",10),
("Laitue",6),
("Tomates",4),
("Persil",10),
("Gousses d'ail",149),
("Oignons",40),
("Riz",130),
("Champignons de Paris",22),
("Blanc de poulet",121),
("Paprika fumé en poudre",31),
("Concentré de tomate",99),
("Crème liquide",319),
("Sauce Worcestershire",78),
("Huile d'olive",884),
("Moutarde",66),
("Epices mexicaines",361),
("Concombre",15),
("Citron",29),
("Coriandre",22),
("Poivrons grillés",20),
("Yaourt à la grecque",107),
("Fêta",264),
("Patate douce",86),
("Menthe", 58),
("Falafels",333),
("Sauce yaourt-menthe",107),
("graines de courge",446),
("Vinaigre balsamique noir",112);

INSERT INTO category (name) VALUES
("Entrée"),
("Plat"),
("Boissons"),
("Desserts"),
("Végétalien"),
("Végétarien"),
("Allergie-arachides"),
("Allergie-lactose"),
("Allergie-gluten");

INSERT INTO recipe (title ,descriptionText,steps, time, category_id) VALUES
("Poulet au paprika fumé façon Stroganoff",
 "Savourez notre version au poulet du « Stroganoff, un plat traditionnel russe très crémeux à réaliser aujourd’hui avec un robot de cuisine ! Avec des champignons de Paris et une touche de sauce Worcestershire, le tout est servi sur une base de riz et est agrémenté de persil : un régal en toute simplicité ! Nombre de personnes: 4",
 "Couper le poulet.___Mettre du paprika.___Faire cuire le poulet",
 35,
 2),
("Salade de pois chiches rôtis, avocat & fromage",
  "Réalisez une salade simple et délicieuse de pois-chiches, poivrons marinés et d'avocat. Pour plus de fraîcheur, vous réaliserez une vinaigrette à base d'huile d'olive et citron vert, et saupoudrerez votre plat de crème de fromage à la grecque et coriandre. À vos fourneaux, prêt, partez ! Votre avocat n’est pas tout à fait mûr ? Il mûrira plus vite à côté d’une banane ou d’une pomme, surtout si vous les emballez dans du papier. Le fromage utilisé dans ce plat contient de la présure animale , Nombre de personnes: 4", "Laver la salade.____Couper la salade.___Couper l'avocat",
 25, 
 6),
("Bowl frais aux falafels saveur coriandre & patate douce",
"La tendance du Bowl-Food vous tente ? Si oui, vous devriez définitivement tester cette recette de bowl aux falafels et sauce yaourt-menthe. Outre le côté tendance, c’est un plat unique, complet et pratique puisque tous les éléments du plat se dégustent ensemble directement dans un bol (ou une assiette creuse). Fins connaisseurs ou aventuriers du bowl, bienvenue ! Nombre de personnes: 4", 
"Eplucher les patates.___Couper les patates.___Mixer les pois chiches.",
20, 
5);

INSERT INTO favorite (recipe_id, user_id) VALUES
  (1,1), (2,2);

INSERT INTO quantity (recipe_id, ingredient_id, quantity) VALUES
  (1,1,3),(1,4,6), (2,5,4),(2,3,10);