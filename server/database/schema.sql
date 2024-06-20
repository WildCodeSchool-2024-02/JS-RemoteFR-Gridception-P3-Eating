-- SQLBook: Code
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS ingredient;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS recipe;
DROP TABLE IF EXISTS favorite;
DROP TABLE IF EXISTS quantity;


-- Création de la table `role`
CREATE TABLE `role` (
    `id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `role` VARCHAR(20) NOT NULL
);

-- Création de la table `ingredient`
CREATE TABLE `ingredient` (
    `id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `calories` INT NOT NULL
);

-- Création de la table `category`
CREATE TABLE `category` (
    `id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `name` VARCHAR(100) NOT NULL
);

-- Création de la table `user`
CREATE TABLE `user` (
    `id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `firstname` VARCHAR(100),
    `lastname` VARCHAR(100),
    `username` VARCHAR(100) NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `role_id` INT UNSIGNED NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
);

-- Création de la table `recipe`
CREATE TABLE `recipe` (
    `id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `title` VARCHAR(100),
    `descriptionText` TEXT,
    `steps` TEXT NOT NULL,
    `time` INT NOT NULL,
    `category_id` INT UNSIGNED NOT NULL,
    FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
);

-- Création de la table `favorite`
CREATE TABLE `favorite` (
    `id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `recipe_id` INT UNSIGNED NOT NULL,
    `user_id` INT UNSIGNED NOT NULL,
    FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);

-- Création de la table `quantity`
CREATE TABLE `quantity` (
    `id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `recipe_id` INT UNSIGNED NOT NULL,
    `ingredient_id` INT UNSIGNED NOT NULL,
    `quantity` VARCHAR(100) NOT NULL,
    FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`),
    FOREIGN KEY (`ingredient_id`) REFERENCES `ingredient` (`id`)
);

-- Insertion des rôles
INSERT INTO `role` (`role`) VALUES 
('user'),
('visitor'),
('admin');

-- Insertion des utilisateurs
INSERT INTO `user` (`firstname`, `lastname`, `username`, `email`, `role_id`, `password`) VALUES
('Lauryn', 'MARTIN', 'LM', 'martin@martin.fr', 1, 'toto'),
('Amel', 'Bonnevie', 'AB', 'bonnevie@bonnevie.fr', 3, 'tata');

-- Insertion des ingrédients
INSERT INTO `ingredient` (`name`, `calories`) VALUES
('Pois', 50),
('Huile d\'olive', 884),
('Herbes de Provence', 10),
('Sel', 5),
('Poivre', 5),
('Huile de tournesol', 884),
('Salade', 15),
('Avocat', 30),
('Small Tomatoes', 29),
('Pourpier', 20),
('Choux rouge', 43),
('Mangue', 2),
('Patates douces', 86),
('Laitue', 6),
('Tomates', 4),
('Persil', 10),
('Gousses d\'ail', 149),
('Oignons', 40),
('Riz', 130),
('Champignons de Paris', 22),
('Blanc de poulet', 121),
('Paprika fumé en poudre', 31),
('Concentré de tomate', 99),
('Crème liquide', 319),
('Sauce Worcestershire', 78),
('Moutarde', 66),
('Epices mexicaines', 361),
('Concombre', 15),
('Citron', 29),
('Coriandre', 22),
('Poivrons grillés', 20),
('Yaourt à la grecque', 107),
('Fêta', 264),
('Menthe', 58),
('Falafels', 333),
('Sauce yaourt-menthe', 107),
('Graines de courge', 446),
('Vinaigre balsamique noir', 112);

-- Insertion des catégories
INSERT INTO `category` (`name`) VALUES
('Entrée'),
('Plat'),
('Boissons'),
('Desserts'),
('Végétalien'),
('Végétarien'),
('Allergie-arachides'),
('Allergie-lactose'),
('Allergie-gluten');

-- Insertion des recettes
INSERT INTO `recipe` (`title`, `descriptionText`, `steps`, `time`, `category_id`) VALUES
('Poulet au paprika fumé façon Stroganoff',
 'Savourez notre version au poulet du « Stroganoff, un plat traditionnel russe très crémeux à réaliser aujourd’hui avec un robot de cuisine ! Avec des champignons de Paris et une touche de sauce Worcestershire, le tout est servi sur une base de riz et est agrémenté de persil : un régal en toute simplicité ! Nombre de personnes: 4',
 'Couper le poulet.___Mettre du paprika.___Faire cuire le poulet',
 35,
 2),
('Salade de pois chiches rôtis, avocat & fromage',
 'Réalisez une salade simple et délicieuse de pois-chiches, poivrons marinés et d\'avocat. Pour plus de fraîcheur, vous réaliserez une vinaigrette à base d\'huile d\'olive et citron vert, et saupoudrerez votre plat de crème de fromage à la grecque et coriandre. À vos fourneaux, prêt, partez ! Votre avocat n’est pas tout à fait mûr ? Il mûrira plus vite à côté d’une banane ou d’une pomme, surtout si vous les emballez dans du papier. Le fromage utilisé dans ce plat contient de la présure animale , Nombre de personnes: 4',
 'Laver la salade.____Couper la salade.___Couper l\'avocat',
 25, 
 6),
('Bowl frais aux falafels saveur coriandre & patate douce',
 'La tendance du Bowl-Food vous tente ? Si oui, vous devriez définitivement tester cette recette de bowl aux falafels et sauce yaourt-menthe. Outre le côté tendance, c’est un plat unique, complet et pratique puisque tous les éléments du plat se dégustent ensemble directement dans un bol (ou une assiette creuse). Fins connaisseurs ou aventuriers du bowl, bienvenue ! Nombre de personnes: 4',
 'Eplucher les patates.___Couper les patates.___Mixer les pois chiches.',
 20, 
 5);

-- Insertion des favoris
INSERT INTO `favorite` (`recipe_id`, `user_id`) VALUES
  (1, 1), (2, 2);

-- Insertion des quantités pour la recette "Poulet au paprika fumé façon Stroganoff"
INSERT INTO `quantity` (`recipe_id`, `ingredient_id`, `quantity`) VALUES
(1, 17, '25g'),  -- Persil
(1, 18, '2 gousses'),  -- Gousses d'ail
(1, 19, '2'),  -- Oignons
(1, 20, '300g'),  -- Riz
(1, 21, '400g'),  -- Champignons de Paris
(1, 22, '400g'),  -- Blanc de poulet
(1, 23, '15g'),  -- Paprika fumé en poudre
(1, 24, '50g'),  -- Concentré de tomate
(1, 25, '200ml'),  -- Crème liquide
(1, 26, '50ml'),  -- Sauce Worcestershire
(1, 11, '4 cs'),  -- Huile d'olive
(1, 27, '2 cc'),  -- Moutarde
(1, 4, 'au goût'),  -- Sel
(1, 5, 'au goût');  -- Poivre

-- Insertion des quantités pour la recette "Salade de pois chiches rôtis, avocat & fromage"
INSERT INTO `quantity` (`recipe_id`, `ingredient_id`, `quantity`) VALUES
(2, 1, '300g'),  -- Pois chiches
(2, 29, '2'),  -- Poivrons grillés
(2, 7, '100g'),  -- Salade
(2, 8, '2'),  -- Avocat
(2, 30, '2 cs'),  -- Citron vert
(2, 31, '10g'),  -- Coriandre
(2, 32, '50g'),  -- Crème de fromage à la grecque
(2, 11, '2 cs');  -- Huile d'olive

-- Insertion des quantités pour la recette "Bowl frais aux falafels saveur coriandre & patate douce"
INSERT INTO `quantity` (`recipe_id`, `ingredient_id`, `quantity`) VALUES
(3, 13, '400g'),  -- Patates douces
(3, 8, '1'),  -- Avocat
(3, 35, '200g'),  -- Falafels
(3, 36, '50g'),  -- Sauce yaourt-menthe
(3, 9, '50g'),  -- Tomates cerises
(3, 37, '10g'),  -- Menthe
(3, 38, '20g');  -- Graines de courge

