-- phpMyAdmin SQL Dump
-- version 4.6.6deb5ubuntu0.5
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:3306
-- Généré le :  Lun 25 Janvier 2021 à 12:31
-- Version du serveur :  5.7.32-0ubuntu0.18.04.1
-- Version de PHP :  7.2.24-0ubuntu0.18.04.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `freedbtech_groupomania_database`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

CREATE TABLE `comments` (
    `id` int(11) NOT NULL,
    `commentaire` varchar(255) CHARACTER SET utf8 NOT NULL,
    `postId` int(11) NOT NULL,
    `userId` int(11) NOT NULL,
    `date_creation` varchar(255) CHARACTER SET utf8 NOT NULL,
    `status` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Commentaires des utilisateurs sur les posts du réseau social';

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

CREATE TABLE `posts` (
    `id` int(11) NOT NULL,
    `post` varchar(255) CHARACTER SET utf8 NOT NULL,
    `userId` int(11) NOT NULL,
    `date_creation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Posts des utilisateurs du réseau social groupomania';

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
    `id` int(11) NOT NULL,
    `is_admin` tinyint(1) NOT NULL DEFAULT '0',
    `username` varchar(255) CHARACTER SET utf8 NOT NULL,
    `email` varchar(255) CHARACTER SET utf8 NOT NULL,
    `password` varchar(255) CHARACTER SET utf8 NOT NULL,
    `date_creation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Table des utilisateurs du réseau social groupomania';

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`id`, `is_admin`, `username`, `email`, `password`, `date_creation`) VALUES
(11, 0, 'test', 'test@test.com', '$2b$10$H9vVXEO8oSmmZvpaDrTt7u64q1qMBR6jXPpGpdyfAvPWajhJnKS36', '2021-01-16 08:59:27'),
(12, 0, 'test2', 'test2@test2.com', '$2b$10$Z2/87fZX2h5z8dsEV.Fx3u/ju4DGx.t2QSVTreSyQkBp9upZDzL3q', '2021-01-16 16:26:19'),
(13, 0, 'test4', 'test4@test4.com', '$2b$10$pSOx1VIfd8T0uBPywAkPEuJYnLxZlBZ8a5DjQpB0/bhRDzbB4E5PW', '2021-01-16 19:09:37'),
(16, 0, 'test5', 'test5@test5.com', '$2b$10$5akQFGxN9l7PWUUbeH1tfuyFTBV0UXEgN/i6VlV0czpINwmVyB21G', '2021-01-19 06:12:31'),
(17, 1, 'admin', 'admin@admin.com', '', '2021-01-25 11:11:40');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `comments`
--
ALTER TABLE `comments`
    ADD PRIMARY KEY (`id`),
    ADD KEY `fk_commentuser` (`userId`),
    ADD KEY `fk_commentpost` (`postId`);

--
-- Index pour la table `posts`
--
ALTER TABLE `posts`
    ADD PRIMARY KEY (`id`),
    ADD KEY `fk_user` (`userId`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
    ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `comments`
--
ALTER TABLE `comments`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `posts`
--
ALTER TABLE `posts`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
    ADD CONSTRAINT `fk_commentpost` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT `fk_commentuser` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
    ADD CONSTRAINT `fk_user` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
