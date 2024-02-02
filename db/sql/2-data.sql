SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

INSERT INTO `tasks` (`id`, `user_id`, `content`, `createdAt`, `completedAt`) VALUES
(1,	1,	'Acheter du pain',	'2023-11-08 22:03:51',	NULL),
(2,	1,	'Prendre rdv chez le médecin',	'2023-11-08 22:04:25',	NULL),
(3,	1,	'Faire du sport',	'2023-11-08 22:06:18',	'2023-11-08 22:06:18'),
(4,	1,	'Arroser les plantes',	'2023-11-08 22:09:21',	NULL),
(5,	1,	'Réserver hôtel',	'2023-11-08 22:09:48',	NULL);

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(18,	'John Doe',	'john@doe.com',	'$2b$10$SvjTiseNk2zaf2dLmoA46uzGaPyvyvr7almYYgB1PtqoPzm8qiZ3u');