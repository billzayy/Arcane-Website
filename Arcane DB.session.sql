-- Use Arcane_DB;

-- CREATE TABLE Login(
--     Id_Login    INT             PRIMARY KEY     AUTO_INCREMENT   NOT NULL,
--     UserName    VARCHAR(255)        NOT NULL,
--     Password    VARCHAR(255)        NOT NULL,
--     FullName    VARCHAR(255)        NULL,
--     Picture     VARCHAR  (255)      NULL
-- );

-- CREATE TABLE Contact(
--     Work_hour   Nvarchar(255)   NOT NULL,
--     Address     NVARCHAR(255)   NOT NULL,
--     Email       Nvarchar(255)   NOT NULL,
--     Phone       NvARCHAR(11)    NOT NULL
-- );

-- CREATE TABLE Product(
--     Id_Product      INT             PRIMARY KEY      AUTO_INCREMENT  NOT NULL,
--     P_Name          NVARCHAR(255)   NOT NULL,
--     P_Title         NVARCHAR(255)   NOT NULL,
--     P_Picture       NVARCHAR(255)   NOT NULL,
--     P_Describe      NVARCHAR(255)   NOT NULL,
--     P_Price         INT             NOT NULL,
--     P_Page          NVARCHAR(255)   NOT NULL,
--     P_Category      NVARCHAR(255)   NOT NULL,
--     P_Gender        NVARCHAR(255)   NOT NULL,
--     P_Sales         NVARCHAR(255)   NULL,
--     P_Material      NVARCHAR(255)   NOT NULL,
--     P_Manufacture   NVARCHAR(255)   NOT NULL,
--     P_Color         NVARCHAR(255)   NOT NULL,
--     P_Size          NVARCHAR(255)   NULL,
--     Content_1       NVARCHAR(255)   NOT NULL,
--     Content_2       NVARCHAR(255)   NOT NULL
-- );

-- CREATE TABLE Bills(
--     Id_Bill         INT     PRIMARY KEY      AUTO_INCREMENT NOT NULL,
--     Id_Product      INT     NOT NULL,
--     Id_Client       INT     NOT NULL,
--     B_BuyDate       Nvarchar(255)   NOT NUll,
--     FOREIGN KEY(Id_Product) REFERENCES Product(Id_Product),
--     FOREIGN KEY(Id_Client) REFERENCES Login(Id_Login)
-- );

-- CREATE TABLE Bills_Info(
--     Id_Bill         INT         NOT NULL,
--     Id_Product      INT         NOT NULL,
--     P_SumPrice      INT         NOT NULL,
--     B_Quantity      INT         NOT NULL,
--     B_Discount      INT         NOT NULL,
--     B_Delivery      NVARCHAR(55) NOT NULL,
--     FOREIGN KEY (Id_Bill) REFERENCES Bills(Id_Bill),
--     FOREIGN KEY (Id_Product) REFERENCES Product(Id_Product)
-- );

-- CREATE TABLE ShoppingCart(
--     Id_Client   INT,
--     Id_Product INT,
--     FOREIGN KEY (Id_Client) REFERENCES Login (Id_Login),
--     FOREIGN KEY (Id_Product) REFERENCES Product (Id_Product)
-- );

-- INSERT INTO Product (P_Name, P_Picture, P_Describe, P_Price, P_Page, P_Category, P_Gender, P_Sales, P_Material, P_Manufacture, P_Color, P_Size, Content_1, Content_2)VALUES

-- -- CLOTHES
-- ('Zaun','./img/Main/Clothes/Zaun.png','Round neckline, length to the hip line',13,'Main','T-shirt','women', 'Sale','100% microfiber','Arcane. E-commerce','3D print',NULL,'The jersey of the T-shirt is made of polyester yarn, which allows the skin to breathe and makes the fabric pleasant to the body. ','The material dries very quickly and does not wrinkle, which makes the T-shirt universal for everyday wear and sports.'),

-- ('Jinx and her drawing', './img/Main/Clothes/Jinx-drawing.png','Round neckline, length to the hip line',160,'Main','Winter jacket','women', '','100% microfiber','Arcane. E-commerce','3D print',NULL,'The lightweight model of the sweatshirt is made of two-layer knitwear: the inner layer is pleasant and comfortable for the body, the outer layer is for a durable and bright image. ','Sweatshirt with bright and saturated colors withstands an unlimited number of washes, thanks to a special application technology. '),

-- ('Arcane','./img/Main/Clothes/Jinx-Crying.png','Round neckline, length to the hip line',15,'Main','T-shirt','man', '','100% microfiber','Arcane. E-commerce','3D print',NULL,'The jersey of the T-shirt is made of polyester yarn, which allows the skin to breathe and makes the fabric pleasant to the body. ','The material dries very quickly and does not wrinkle, which makes the T-shirt universal for everyday wear and sports.'),

-- ("Arcane, Jinx's crying inside the fire", './img/Main/Clothes/Arcane.png','Round neckline, length to the hip line',10,'Main','Longsleeve','man', 'Top','100% microfiber','Arcane. E-commerce','3D print',NULL,'The jersey of the T-shirt is made of polyester yarn, which allows the skin to breathe and makes the fabric pleasant to the body. ','The material dries very quickly and does not wrinkle, which makes the T-shirt universal for everyday wear and sports.'),

-- ('League of Legends', './img/Main/Clothes/LOL.png','Round neckline, length to the hip line',42,'Main','Zip sweatshirt','man', '','100% microfiber','Arcane. E-commerce','3D print',NULL,'Longsleeve is a long-sleeved T-shirt, a versatile option for everyday wear.','Breathable fabric allows you to wear it in the heat with shorts, and in cool weather under a bomber jacket or jeans.' ),

-- -- Catalogue
-- ('Powder', './img/Catalogue/Powder-tracksuit.png','Round neckline, length to the hip line',13,'Catalogue','Tracksuit','women', 'Sale New','100% microfiber','Arcane. E-commerce','3D print',NULL,'A tracksuit is an article of clothing consisting of two parts: trousers and a jacket usually with front zipper.','It was originally intended for use in sports, mainly for athletes to wear over competition clothing and to take off before competition.' ),

-- ('Jinx', './img/Catalogue/jinx-hoodie.png','Round neckline, length to the hip line',21,'Catalogue','Hoodie','women', '','100% microfiber','Arcane. E-commerce','3D print',NULL,'A hoodie is a sweatshirt with a hood. It covers most of the head and neck and sometimes the face.','Hoodies may be worn for protection against the environment' ),

-- ("Jinx's drawings", './img/Catalogue/jinx-drawings.png','Round neckline, length to the hip line',40,'Catalogue','3D jacket','women', '','100% microfiber','Arcane. E-commerce','3D print',NULL,'A jacket is a garment for the upper body, usually extending below the hips.','A jacket is generally lighter, tighter-fitting, and less insulating than a coat, which is outerwear. Some jackets are fashionable, while others serve as protective clothing.' ),

-- ("Jinx with a lollipop", './img/Catalogue/jinx-lollipop.png','Round neckline, length to the hip line',40,'Catalogue','Pajamas','women', 'Top','100% microfiber','Arcane. E-commerce','3D print',NULL,'A jacket is a garment for the upper body, usually extending below the hips.','A jacket is generally lighter, tighter-fitting, and less insulating than a coat, which is outerwear. Some jackets are fashionable, while others serve as protective clothing.' ),

-- ("Sister", './img/Catalogue/Sisters.png','Round neckline, length to the hip line',16,'Catalogue','3D Sweatshirt','women', 'Top','100% microfiber','Arcane. E-commerce','3D print',NULL,'A jacket is a garment for the upper body, usually extending below the hips.','A jacket is generally lighter, tighter-fitting, and less insulating than a coat, which is outerwear. Some jackets are fashionable, while others serve as protective clothing.' ),

-- ("Arcane, Jinx's inside the fire", './img/Catalogue/Arcane-fire.png','Round neckline, length to the hip line',14,'Catalogue','Longsleeve','women', '','100% microfiber','Arcane. E-commerce','3D print',NULL,'Longsleeve is a long-sleeved T-shirt, a versatile option for everyday wear.','Breathable fabric allows you to wear it in the heat with shorts, and in cool weather under a bomber jacket or jeans.' ) ,

-- ('Jinx in love', './img/Catalogue/jinx-love.png','Round neckline, length to the hip line',130,'Catalogue','Winter jacket','women', 'Top sale new','100% microfiber','Arcane. E-commerce','3D print',NULL,'Longsleeve is a long-sleeved T-shirt, a versatile option for everyday wear.','Breathable fabric allows you to wear it in the heat with shorts, and in cool weather under a bomber jacket or jeans.' ) ,

-- ('My enemy', './img/Catalogue/my-enemy.png','Round neckline, length to the hip line',13,'Catalogue','3D jacket','women', 'Top new','100% microfiber','Arcane. E-commerce','3D print',NULL,'Longsleeve is a long-sleeved T-shirt, a versatile option for everyday wear.','Breathable fabric allows you to wear it in the heat with shorts, and in cool weather under a bomber jacket or jeans.' ) ,


-- ('Growing up', './img/Catalogue/growing-up.png','Round neckline, length to the hip line',24,'Catalogue','Pajamas','women', '','100% microfiber','Arcane. E-commerce','3D print',NULL,'A jacket is a garment for the upper body, usually extending below the hips.','A jacket is generally lighter, tighter-fitting, and less insulating than a coat, which is outerwear. Some jackets are fashionable, while others serve as protective clothing.' ) ,

-- ('Powder', './img/Catalogue/Powder.png','Round neckline, length to the hip line',15,'Catalogue','T-shirt','women', '','100% microfiber','Arcane. E-commerce','3D print',NULL,'The jersey of the T-shirt is made of polyester yarn, which allows the skin to breathe and makes the fabric pleasant to the body. ','The material dries very quickly and does not wrinkle, which makes the T-shirt universal for everyday wear and sports.'),

-- ('Arcane, two sisters on the roof', './img/Catalogue/two-sisters.png','Round neckline, length to the hip line',14,'Catalogue','T-shirt','men', '','100% microfiber','Arcane. E-commerce','3D print',NULL,'The jersey of the T-shirt is made of polyester yarn, which allows the skin to breathe and makes the fabric pleasant to the body. ','The material dries very quickly and does not wrinkle, which makes the T-shirt universal for everyday wear and sports.'),

-- ('Jinx', './img/Catalogue/jinx-hoodie-men.png','Round neckline, length to the hip line',21,'Catalogue','Hoodie','men', '','100% microfiber','Arcane. E-commerce','3D print',NULL,'A hoodie is a sweatshirt with a hood. It covers most of the head and neck and sometimes the face.','Hoodies may be worn for protection against the environment'),

-- ('Falling', './img/Catalogue/falling.png','Round neckline, length to the hip line',14,'Catalogue','T-shirt','men', '','100% microfiber','Arcane. E-commerce','3D print',NULL,'The jersey of the T-shirt is made of polyester yarn, which allows the skin to breathe and makes the fabric pleasant to the body. ','The material dries very quickly and does not wrinkle, which makes the T-shirt universal for everyday wear and sports.'),

-- ('Jinx with the gun', './img/Catalogue/jinxgun-men.png','Round neckline, length to the hip line',14,'Catalogue','Longsleeve','men', 'New','100% microfiber','Arcane. E-commerce','3D print',NULL,'Longsleeve is a long-sleeved T-shirt, a versatile option for everyday wear.','Breathable fabric allows you to wear it in the heat with shorts, and in cool weather under a bomber jacket or jeans.'),

-- ('Silco and jinx', './img/Catalogue/Vest.png','Round neckline, length to the hip line',8,'Catalogue','Vest','men', '','100% microfiber','Arcane. E-commerce','3D print',NULL,'A sleeveless garment, often having buttons down the front, worn usually over a shirt or blouse and sometimes as part of a three-piece suit.','Suitable for work or party')

-- -- Deco
-- ('Jayce', './img/Main/Deco/Jayce.png','Plastic Poster',2,'Main','Poster','Object', '','plastic','Arcane. E-commerce','3D print','320x4550 mm','Poster from Arcane Film','Present from Netflix' ),
-- ('Sisters', './img/Main/Deco/Poster-1.png','Plastic Poster',3,'Main','Poster','Object', '','plastic','Arcane. E-commerce','3D print','520x650 mm','Poster from Arcane Film','Present from Netflix' ),
-- ('Sisters', './img/Main/Deco/Poster-2.png','Plastic Poster',3,'Main','Poster','Object', '','plastic','Arcane. E-commerce','3D print','520x650 mm','Poster from Arcane Film','Present from Netflix' ),
-- ('Caitlyn', './img/Main/Deco/Caitlyn.png','Plastic Poster',2,'Main','Poster','Object', '','plastic','Arcane. E-commerce','3D print','320x4550 mm','Poster from Arcane Film','Present from Netflix' )

-- -- Other
-- ('Jinx under the rain','./img/Main/Other/Backpack.png','Backpack',35,'Main','Other','Object', 'New','plastic','Arcane. E-commerce','3D print',NULL,'Present from Arcane Film','Present from Netflix' ),
-- ('Vi and Jinx', './img/Main/Other/Canvas.png','Canvas',17,'Main','Other','Object', '','plastic','Arcane. E-commerce','3D print',NULL,'Present from Arcane Film','Present from Netflix' ),
-- ('Arcane', './img/Main/Other/Case.png','Case for iphone 13',8,'Main','Other','Object', '','plastic','Arcane. E-commerce','3D print',NULL,'Present from Arcane Film','Present from Netflix' ),
-- ('Jinx', './img/Main/Other/Pillow.png','Pillow, 3D print',9,'Main','Other','Object', 'Sale','plastic','Arcane. E-commerce','3D print',NULL,'Present from Arcane Film','Present from Netflix' ),
-- ('Sisters','./img/Main/Other/Note.png','Sketchbook',4,'Main','Other','Object', '','plastic','Arcane. E-commerce','3D print',NULL,'Present from Arcane Film','Present from Netflix' ),
-- ('Characters', './img/Main/Other/Cup.png','Cup',8,'Main','Other','Object', '','plastic','Arcane. E-commerce','3D print',NULL,'Present from Arcane Film','Present from Netflix' ),
-- ('Jinx and lightning around her', './img/Main/Other/KeyChain.png','Key ring',1,'Main','Other','Object', 'New','plastic','Arcane. E-commerce','3D print',NULL,'Present from Arcane Film','Present from Netflix' ),
-- ('Jinx in dark', './img/Main/Other/Bag.png','Shoulder Bag',17,'Main','Other','Object', '','plastic','Arcane. E-commerce','3D print',NULL,'Present from Arcane Film','Present from Netflix' )

-- INSERT INTO Login VALUES
-- ('admin','admin',NULL, NULL),
-- ('bill','2010','Phan Le Tuan','./src/img/User/Bill .jpeg');