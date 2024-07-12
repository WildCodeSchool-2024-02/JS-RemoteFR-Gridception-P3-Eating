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

CREATE TABLE `recipe` (
    `id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `title` VARCHAR(100),
    `descriptionText` TEXT,
    `steps` TEXT NOT NULL,
    `time` INT NOT NULL,
    `category_id` INT UNSIGNED NOT NULL,
    `image` VARCHAR(250) nOT NULL DEFAULT "JPG",
    FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
);

CREATE TABLE `favorite` (
    `id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `recipe_id` INT UNSIGNED NOT NULL,
    `user_id` INT UNSIGNED NOT NULL,
    FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
);

CREATE TABLE `quantity` (
    `id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `recipe_id` INT UNSIGNED NOT NULL,
    `ingredient_id` INT UNSIGNED NOT NULL,
    `quantity` VARCHAR(100) NOT NULL,
    FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`),
    FOREIGN KEY (`ingredient_id`) REFERENCES `ingredient` (`id`)
);

INSERT INTO role (role) VALUES ('user'), ('visitor'), ('admin');

INSERT INTO
    user (
        firstname,
        lastname,
        username,
        email,
        role_id,
        password
    )
VALUES (
        'Lauryn',
        'MARTIN',
        'LM',
        'martin@martin.fr',
        1,
        "$argon2id$v=19$m=65536,t=5,p=1$FkjcCc0+F15P0N5TLh3ndQ$FkttWmV6YpXwaqtjrKfALtaYkwyHv2ongXDP/C6bvY4"
    ),
    (
        'Amel',
        'Bonnevie',
        'AB',
        'bonnevie@bonnevie.fr',
        3,
        "$argon2id$v=19$m=65536,t=5,p=1$FkjcCc0+F15P0N5TLh3ndQ$FkttWmV6YpXwaqtjrKfALtaYkwyHv2ongXDP/C6bvY4"
    );

INSERT INTO
    ingredient (name, calories)
VALUES ('Pois', 50),
    ("Huile d'olive", 15),
    ("Herbes de Provence", 10),
    ("Sel", 5),
    ("Poivre", 5),
    ("Huile de tournesol", 10),
    ("Salade", 15),
    ("Avocat", 30),
    ("Small Tomatoes", 29),
    ("Pourpier", 20),
    ("Choux rouge", 43),
    ("Mangue", 2),
    ("Patates douces", 10),
    ("Laitue", 6),
    ("Tomates", 4),
    ("Persil", 10),
    ("Gousses d'ail", 149),
    ("Oignons", 40),
    ("Riz", 130),
    ("Champignons de Paris", 22),
    ("Blanc de poulet", 121),
    ("Paprika fumé en poudre", 31),
    ("Concentré de tomate", 99),
    ("Crème liquide", 319),
    ("Sauce Worcestershire", 78),
    ("Huile d'olive", 884),
    ("Moutarde", 66),
    ("Épices mexicaines", 361),
    ("Concombre", 15),
    ("Citron", 29),
    ("Coriandre", 22),
    ("Poivrons grillés", 20),
    ("Yaourt à la grecque", 107),
    ("Fêta", 264),
    ("Patate douce", 86),
    ("Menthe", 58),
    ("Falafels", 333),
    ("Sauce yaourt-menthe", 107),
    ("Graines de courge", 446),
    (
        "Vinaigre balsamique noir",
        112
    );

INSERT INTO
    category (name)
VALUES ("Entrée"),
    ("Plat"),
    ("Boissons"),
    ("Desserts"),
    ("Végétalien"),
    ("Végétarien"),
    ("Allergie-arachides"),
    ("Allergie-lactose"),
    ("Allergie-gluten");

INSERT INTO
    recipe (
        title,
        descriptionText,
        steps,
        time,
        category_id,
        image
    )
VALUES (
        "Poulet au paprika fumé façon Stroganoff",
        "Savourez notre version au poulet du « Stroganoff, un plat traditionnel russe très crémeux à réaliser aujourd’hui avec un robot de cuisine ! Avec des champignons de Paris et une touche de sauce Worcestershire, le tout est servi sur une base de riz et est agrémenté de persil : un régal en toute simplicité ! Nombre de personnes: 4",
        "Couper le poulet.___Mettre du paprika.___Faire cuire le poulet",
        35,
        2,
        "https://img.hellofresh.com/c_fit,f_auto,fl_lossy,h_1100,q_50,w_2600/hellofresh_s3/image/HF_Y24_R221_W04_FR_TFR18787-2_Main_high-12ee8118.jpg"
    ),
    (
        "Salade de pois chiches rôtis, avocat & fromage",
        "Réalisez une salade simple et délicieuse de pois-chiches, poivrons marinés et d'avocat. Pour plus de fraîcheur, vous réaliserez une vinaigrette à base d'huile d'olive et citron vert, et saupoudrerez votre plat de crème de fromage à la grecque et coriandre. À vos fourneaux, prêt, partez ! Votre avocat n’est pas tout à fait mûr ? Il mûrira plus vite à côté d’une banane ou d’une pomme, surtout si vous les emballez dans du papier. Le fromage utilisé dans ce plat contient de la présure animale , Nombre de personnes: 4",
        "Laver la salade.____Couper la salade.___Couper l'avocat",
        25,
        6,
        "https://img.hellofresh.com/c_fit,f_auto,fl_lossy,h_1100,q_50,w_2600/hellofresh_s3/image/HF_Y24_R209_W16_FR_RFR29804491-8_MAIN_high-925b1cfc.jpg"
    ),
    (
        "Bowl frais aux falafels saveur coriandre & patate douce",
        "La tendance du Bowl-Food vous tente ? Si oui, vous devriez définitivement tester cette recette de bowl aux falafels et sauce yaourt-menthe. Outre le côté tendance, c’est un plat unique, complet et pratique puisque tous les éléments du plat se dégustent ensemble directement dans un bol (ou une assiette creuse). Fins connaisseurs ou aventuriers du bowl, bienvenue ! Nombre de personnes: 4",
        "Eplucher les patates.___Couper les patates.___Mixer les pois chiches.",
        20,
        5,
        "https://img.hellofresh.com/c_fit,f_auto,fl_lossy,h_1100,q_50,w_2600/hellofresh_s3/image/HF_Y24_R206_W24_FR_RFR15893-3_Main_high-5eee67f9.jpg"
    ),
    (
        "Poulet à la crème de poireau & muscade",
        "Les choses les plus simples sont souvent les meilleures, et ce plat de poulet à la crème accompagné de riz et de poireau ne va pas faire mentir le proverbe ! Prête en une petite demi-heure, cette recette se déguste aussi bien en solo, en duo ou en famille.",
        "Portez une casserole d'eau salée à ébullition pour le riz.
         Coupez le poireau en deux dans l'épaisseur, lavez-le bien, puis coupez-le en fines demi-lunes.  
         Faites cuire le riz 12-14 min dans la casserole, ou jusqu'à ce qu'il soit tendre. Égouttez-le et réservez-le à couvert.
         Coupez le poulet en dés de 2 cm.
         Faites chauffer un filet d’huile d’olive dans un wok ou une sauteuse à feu moyen-vif.
         Faites-y dorer le poulet 3-4 min sur tous les côtés : il ne doit pas encore être totalement cuit à ce stade. Salez et poivrez.
         Réservez-le hors de la sauteuse et conservez celle-ci pour l'étape suivante.
         Remettez la sauteuse à feu moyen-vif et faites-y fondre une noix de beurre. Ajoutez-y le poireau, salez et poivrez. Baissez le feu sur moyen, couvrez et faites cuire 8-10 min de plus, ou jusqu'à ce qu'il soit fondant.
         Pendant ce temps, ciselez l’ail et le persil séparément.
         Une fois le poireau cuit et fondant, retirez le couvercle.
         Ajoutez le poulet, l’ail, la crème et la moitié du gouda.
         Râpez un peu de noix de muscade par-dessus (selon votre goût). Mélangez et laissez réduire 5 min à feu doux.
         Servez le riz dans les assiettes et versez le poulet et sa crème de poireau par-dessus.
         Saupoudrez de persil et du reste de gouda râpé.",
        20,
        2,
        "https://img.hellofresh.com/c_fit,f_auto,fl_lossy,h_1100,q_50,w_2600/hellofresh_s3/image/HF211008_R217_W47_FR_QFR20161847-1_MB_Main_high-a08664d2.jpg"
    ),
    (
        "Courgette grillée, labneh & beurre au curcuma",
        "Imaginez des courgettes fraîches parfaitement rôties pour obtenir une belle texture tendre et fondante. Elles sont agrémentées d’un mélange onctueux de labneh, un yaourt à la consistance crémeuse, relevé d’une touche de coriandre pour une note herbacée et fraîche en bouche. Le tout est couronné d’un beurre au curcuma fondant. Ça y est, vous voyagez vers de nouveaux horizons !",
        "Préchauffez le four à 210°C sur grill.
        Coupez la courgette en deux dans l’épaisseur, puis en 8. Coupez l’échalote en 4 et les tomates cerises en 2 (Vous pouvez les garder entières pour gagner du temps).
        Disposez les légumes sur une plaque recouverte de papier sulfurisé. Arrosez-les d’un filet d’huile d’olive et de ½ sachet de coriandre moulue par personne. Salez, poivrez et mélangez.
        Enfournez-les 15-20 min, ou jusqu’à ce que les légumes soient fondants et dorés. 
        Pendant ce temps, préparez le bouillon avec de l’eau chaude.
        Placez le beurre et le curcuma dans une petite casserole et faites-les fondre à feu moyen.
        Réservez la sauce dans un petit bol et laissez-la infuser.
        Ciselez l’ail. Épépinez et émincez finement le piment (ça pique ! Dosez-le selon votre goût).
        Faites chauffer un filet d’huile d’olive dans la casserole utilisée pour le beurre au curcuma. Ajoutez le couscous perlé, l’ail et le piment, puis remuez 1 min à feu moyen-vif.
        Versez le bouillon, puis, à couvert, laissez cuire le couscous perlé 12 min à feu doux (voir CONSEIL).
        Retirez le couvercle et égrainez le couscous perlé avec une fourchette.
        CONSEIL : Ajoutez un petit filet d'eau et prolongez la cuisson de 1-2 min si le couscous perlé n'est pas encore cuit au bout des 12 min.
        Effeuillez la menthe et la coriandre, puis ciselez-les séparément (voir CONSEIL). 
        Pressez le jus de la moitié du citron et coupez le reste en quartiers.
        Concassez grossièrement les pistaches.
        CONSEIL: Pour ciseler la menthe comme un(e) pro, empilez les feuilles et enroulez-les sur elles-mêmes pour former un rouleau, puis taillez-les finement au couteau.
        Dans un bol, mélangez le labneh avec la coriandre ciselée, un filet d’huile d’olive et quelques gouttes de jus de citron (selon votre goût).
        Salez, poivrez et mélangez.
        Servez le couscous perlé dans les assiettes et garnissez avec la courgette, les tomates cerises et l'échalote rôtie.
        Ajoutez la sauce citronnée au labneh, puis arrosez de beurre au curcuma.
        Saupoudrez de pistaches et de menthe.
        Présentez les quartiers de citron restants à côté. Salez et poivrez si besoin.",
        25,
        6,
        "https://img.hellofresh.com/c_fit,f_auto,fl_lossy,h_1100,q_50,w_2600/hellofresh_s3/image/HF_Y24_R209_W18_FR_RFR20161913-9_Main_high-20f47e70.jpg"
    );

INSERT INTO favorite (recipe_id, user_id) VALUES (1, 1), (2, 2);

INSERT INTO
    `quantity` (
        `recipe_id`,
        `ingredient_id`,
        `quantity`
    )
VALUES (1, 17, '25g'), -- Persil
    (1, 18, '2 gousses'), -- Gousses d'ail
    (1, 19, '2'), -- Oignons
    (1, 20, '300g'), -- Riz
    (1, 21, '400g'), -- Champignons de Paris
    (1, 22, '400g'), -- Blanc de poulet
    (1, 23, '15g'), -- Paprika fumé en poudre
    (1, 24, '50g'), -- Concentré de tomate
    (1, 25, '200ml'), -- Crème liquide
    (1, 26, '50ml'), -- Sauce Worcestershire
    (1, 11, '4 cs'), -- Huile d'olive
    (1, 27, '2 cc'), -- Moutarde
    (1, 4, 'au goût'), -- Sel
    (1, 5, 'au goût');
-- Poivre
INSERT INTO
    `quantity` (
        `recipe_id`,
        `ingredient_id`,
        `quantity`
    )
VALUES (2, 1, '300g'), -- Pois chiches
    (2, 29, '2'), -- Poivrons grillés
    (2, 7, '100g'), -- Salade
    (2, 8, '2'), -- Avocat
    (2, 30, '2 cs'), -- Citron vert
    (2, 31, '10g'), -- Coriandre
    (2, 32, '50g'), -- Crème de fromage à la grecque
    (2, 11, '2 cs');
-- Huile d'olive
INSERT INTO
    `quantity` (
        `recipe_id`,
        `ingredient_id`,
        `quantity`
    )
VALUES (3, 13, '400g'), -- Patates douces
    (3, 8, '1'), -- Avocat
    (3, 35, '200g'), -- Falafels
    (3, 36, '50g'), -- Sauce yaourt-menthe
    (3, 9, '50g'), -- Tomates cerises
    (3, 37, '10g'), -- Menthe
    (3, 38, '20g');
-- Graines de courge