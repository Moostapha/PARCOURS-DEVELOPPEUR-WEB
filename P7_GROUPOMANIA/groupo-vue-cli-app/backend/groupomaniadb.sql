-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3307
-- Généré le : dim. 08 août 2021 à 22:27
-- Version du serveur : 10.4.20-MariaDB
-- Version de PHP : 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

CREATE TABLE `comments` (
    `commentID` int(11) NOT NULL COMMENT 'Clé primaire id du commentaire fait par userIDauteur',
    `id_post_commented` int(11) NOT NULL COMMENT 'clé fk id du post commenté',
    `id_user_auteur_comment` int(11) NOT NULL COMMENT 'clé fk auteur du commentaire userID',
    `username` varchar(255) NOT NULL COMMENT 'nom auteur user du commentaire',
    `contentComment` varchar(255) NOT NULL COMMENT 'Contenu du commentaire',
    `date_creation` varchar(255) NOT NULL,
    `status` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Commentaires des utilisateurs sur les posts du réseau social';

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

CREATE TABLE `posts` (
    `postID` int(11) NOT NULL COMMENT 'id clé primaire des posts postID',
    `id_user_auteur_post` int(11) NOT NULL COMMENT 'id de l''auteur du post userID clé fk',
    `username` varchar(255) NOT NULL,
    `contentPost` varchar(255) NOT NULL COMMENT 'Corps du post',
    `date_creation` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`postID`, `id_user_auteur_post`, `username`, `contentPost`, `date_creation`) VALUES
(1, 1, 'admin', 'Bonjour et bienvenue sur votre espace GROUPOMANIA.\nJe suis l\'administrateur et je vous remercies de bien vouloir rester courtois.\nJe me réserve le droit de supprimer tout post et commentaire désobligeant.\nBien cordialement', '2021-07-22 12:40:14'),
(2, 2, 'moos', 'Bonjour à tous je suis ravi d\'être sur cette application', '2021-07-23 00:48:55'),
(3, 3, 'lika', 'Ce réseau social est une bonne idée !!!', '2021-07-23 01:05:28'),
(4, 4, 'Cindy', 'J\'espère pouvoir trouver de nouveaux collaborateurs de travail', '2021-07-23 01:07:26'),
(5, 6, 'Michelle', 'Salut serait il possible de m\'aider sur un projet de développement d\'un app avec vue.js ?', '2021-07-23 01:09:55'),
(6, 6, 'Michelle', 'Je republies par rapport à mon précédent post. Il me faudrait quelqu\'un en vue3 de préférence.', '2021-07-23 01:16:14'),
(7, 5, 'brian', 'Bonjour à tous Moos et Lika je vous rappelle la réunion que l\'on doit avoir dans 1 semaine. Cordialement', '2021-07-23 01:38:22'),
(8, 5, 'brian', 'Je trouve cette app réussie !!!', '2021-07-23 01:41:33'),
(9, 1, 'admin', 'GROUPOMANIA vous invite à donner vos remarques sur les améliorations possibles de notre réseau social', '2021-07-23 01:48:52');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
    `userID` int(11) NOT NULL COMMENT 'clé primaire userID users du réseau',
    `username` varchar(255) NOT NULL COMMENT 'form signup frontend',
    `email` varchar(255) NOT NULL COMMENT 'form signup frontend',
    `password` varchar(255) NOT NULL COMMENT 'form signup frontend sécurisé',
    `is_admin` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'statut administrateur 1 | statut user standard 0',
    `date_creation` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`userID`, `username`, `email`, `password`, `is_admin`, `date_creation`) VALUES
(1, 'admin', 'admin@gmail.com', '$2b$10$oUfY2xNS.r6h.FbI6iWbm.GhvAQW1PB/MbWJ7kHlmi9du1LWqSQq6', 1, '2021-07-22 11:57:02'),
(2, 'moos', 'moos@gmail.com', '$2b$10$dv9bHESSXUn/N/JgFgKl5euszusQ7.Bh2BWmy77BdUvkB7qOU7E6i', 0, '2021-07-22 12:10:14'),
(3, 'lika', 'lika@gmail.com', '$2b$10$DUHRQzA8M8.s/.UWgKiNnOvXEgWWEATSOubH00OS0juWuB3yEzFUK', 0, '2021-07-22 12:10:55'),
(4, 'Cindy', 'cindy@gmail.com', '$2b$10$hHH96yaryMaRsqBs/ziZVu/Bb72KMwdgOjh0TNzLg3PnRRg2w9T/K', 0, '2021-07-22 12:11:25'),
(5, 'brian', 'brian@gmail.com', '$2b$10$EjuYEBSFz3SD.QTttiEBnOi9Rr0kWIdzISJ/TzFlGIncX2/thXMeW', 0, '2021-07-22 12:12:31'),
(6, 'Michelle', 'michelle@gmail.com', '$2b$10$Lzw/Bs3gROco5WsA6VvRPeGpUScmHUCJnZUhkM7LEfgiqqnl2Chaq', 0, '2021-07-22 12:13:08');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `comments`
--
ALTER TABLE `comments`
    ADD PRIMARY KEY (`commentID`),
    ADD KEY `fk_postID_du_post_commented` (`id_post_commented`),
    ADD KEY `fk_userID_auteur_du_commentaire` (`id_user_auteur_comment`);

--
-- Index pour la table `posts`
--
ALTER TABLE `posts`
    ADD PRIMARY KEY (`postID`),
    ADD KEY `fk_userID_auteur_du_post` (`id_user_auteur_post`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
    ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `comments`
--
ALTER TABLE `comments`
    MODIFY `commentID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Clé primaire id du commentaire fait par userIDauteur';

--
-- AUTO_INCREMENT pour la table `posts`
--
ALTER TABLE `posts`
    MODIFY `postID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id clé primaire des posts postID', AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
    MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'clé primaire userID users du réseau', AUTO_INCREMENT=7;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
    ADD CONSTRAINT `fk_postID_du_post_commented` FOREIGN KEY (`id_post_commented`) REFERENCES `posts` (`postID`),
    ADD CONSTRAINT `fk_userID_auteur_du_commentaire` FOREIGN KEY (`id_user_auteur_comment`) REFERENCES `users` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
    ADD CONSTRAINT `fk_userID_auteur_du_post` FOREIGN KEY (`id_user_auteur_post`) REFERENCES `users` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
