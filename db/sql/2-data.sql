SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';
SET NAMES utf8mb4;
INSERT INTO `tasks` (
        `id`,
        `user_id`,
        `content`,
        `createdAt`
    )
VALUES (1, 1, 'Acheter du pain', NOW()),
    (
        2,
        1,
        'Prendre rdv chez le médecin',
        NOW()
    ),
    (3, 1, 'Faire du sport', NOW()),
    (4, 1, 'Arroser les plantes', NOW()),
    (5, 1, 'Réserver hôtel', NOW());
INSERT INTO `users` (`id`, `name`, `email`, `password`)
VALUES (
        1,
        'John Doe',
        'john@doe.com',
        '$2b$10$SvjTiseNk2zaf2dLmoA46uzGaPyvyvr7almYYgB1PtqoPzm8qiZ3u'
    );