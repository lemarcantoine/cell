#cell
====

###Little cells live in a little world


L'objet Param permet d'interagir avec les cellules : 

###var param = 
	lineWidth : 		3		Taille de la ligne reliant 2 cellules;
	minDistance :		30		Distance à partir de laquelle la cellule cherchera à s'éloigner de sa cible;
	deadZone :			10		Zone dans laquelle la cellule ne cherchera pas de cible (s'ajoute a minDistance);
	activateSpawning:	false	Si true, ajoute des entitées au centre periodiquement;
	easing:				0.9		Facteur avec lequel le precedant mouvement est ajouté au mouvement courant pour adoucir;
	generationTime: 	50		Durée en tick d'une génération (auquel s'ajoutent divers paramêtres);
	lifetime: 			8		Facteur appliqué à generation Time pour calculer la durée de vie d'une cellule;
	noOffScreen: 		true	Si true, les cellules sont bloqués dans l'écran;
	randomMove: 		1		Facteur appliqué aux mouvements aléatoires, provoqués à chaques ticks;
	maxEntity:			80		Nombre d'entité à partir duquel le monde ignorera les requêtes de reproductions;
	
