-- This is the structure of the old JeuxAmateurs database.
-- Please excuse our mistakes, we were 14 or 15 at that time. :P

CREATE TABLE `apercus` (
  `ID` smallint(6) NOT NULL AUTO_INCREMENT,
  `ID_jeu` smallint(6) NOT NULL,
  `intro` mediumtext NOT NULL,
  `developpement` mediumtext NOT NULL,
  `conclu` mediumtext NOT NULL,
  `appreciation` tinyint(4) NOT NULL,
  `auteur` smallint(6) NOT NULL,
  `statut` set('online','offline') NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`ID`)
) DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;

CREATE TABLE `commentaires` (
  `ID` smallint(6) NOT NULL AUTO_INCREMENT,
  `ID_membre` smallint(6) NOT NULL,
  `sujet` enum('news','tests') NOT NULL,
  `ID_sujet` smallint(6) NOT NULL,
  `message` text NOT NULL,
  `signature` enum('oui','non') NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`ID`)
) DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;

CREATE TABLE `jeux` (
  `ID` smallint(6) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `logo` set('oui','non') NOT NULL,
  `type` mediumtext NOT NULL,
  `descriptif` mediumtext NOT NULL,
  `infos` mediumtext NOT NULL,
  `telechargement` varchar(255) NOT NULL,
  `support` varchar(255) NOT NULL,
  `date_sortie` date NOT NULL,
  `screens` smallint(6) NOT NULL,
  `videos` mediumtext NOT NULL,
  PRIMARY KEY (`ID`)
) DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;

CREATE TABLE `livre_or` (
  `ID` smallint(6) NOT NULL AUTO_INCREMENT,
  `auteur` varchar(255) NOT NULL,
  `contenu` text NOT NULL,
  `date` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;

CREATE TABLE `membres` (
  `ID` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(255) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `identifier` varchar(255) NOT NULL,
  `statut` varchar(255) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `infos_privees` set('oui','non') NOT NULL,
  `avatar` set('oui','non') NOT NULL,
  `date_de_naissance` int(11) NOT NULL DEFAULT '0',
  `signature` text NOT NULL,
  `recevoir_newsletter` set('oui','non') NOT NULL,
  `sexe` set('masculin','feminin','inconnu') NOT NULL,
  `date_inscription` datetime NOT NULL,
  `IP` varchar(15) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;

CREATE TABLE `news` (
  `ID` smallint(6) NOT NULL AUTO_INCREMENT,
  `titre` varchar(255) NOT NULL,
  `img` enum('oui','non') NOT NULL,
  `contenu` text NOT NULL,
  `jeux_associes` varchar(255) NOT NULL,
  `categorie` enum('Jeux','Site','Autres') NOT NULL,
  `auteur` smallint(6) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`ID`)
) DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;

CREATE TABLE `sondages` (
  `ID` smallint(6) NOT NULL AUTO_INCREMENT,
  `question` varchar(255) NOT NULL,
  `choix_multiples` set('oui','non') NOT NULL,
  `propositions` text NOT NULL,
  `resultats` text NOT NULL,
  `auteur` smallint(11) unsigned NOT NULL,
  `date_de_post` date NOT NULL,
  `date_de_fin` date NOT NULL,
  PRIMARY KEY (`ID`)
) DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;

CREATE TABLE `tests` (
  `ID` smallint(6) NOT NULL AUTO_INCREMENT,
  `ID_jeu` smallint(6) NOT NULL,
  `statut` set('online','offline') NOT NULL,
  `auteur` smallint(6) NOT NULL,
  `note_graph` tinyint(4) NOT NULL,
  `desc_graph` text NOT NULL,
  `note_gameplay` tinyint(4) NOT NULL,
  `desc_gameplay` text NOT NULL,
  `note_vie` tinyint(4) NOT NULL,
  `desc_vie` text NOT NULL,
  `note_son` tinyint(4) NOT NULL,
  `desc_son` text NOT NULL,
  `note_scenario` tinyint(4) NOT NULL,
  `desc_scenario` text NOT NULL,
  `note_finale` tinyint(4) NOT NULL,
  `intro` text NOT NULL,
  `developpement` text NOT NULL,
  `conclu` text NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`ID`)
) DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;

CREATE TABLE `videos` (
  `ID` smallint(6) NOT NULL AUTO_INCREMENT,
  `titre` varchar(255) NOT NULL,
  `type` set('video_test','ajva') NOT NULL,
  `lien_flash` varchar(255) NOT NULL,
  `lien_daily` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `auteur` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;
