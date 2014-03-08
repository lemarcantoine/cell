#cell
====
###Little cells live in a little world

Cliquez dans le Canvas pour créer une cellule. Elle vie un instant, puis meurt. Si vous en mettez 2, elles se reproduisent lorsqu'elles sont assez grandes. Le but du jeu est d'arriver a touver des combinaisons de paramêtres avec lesquelles les cellules prolifères rapidement.
L'objet Javascript 'Param' permet d'interagir avec les cellules. (Une inferface plus user-friendly est en prévision)

Voici les différentes variables que l'on peut modifier : 

####Influences sur le comportement : 

	minDistance:		30		Distance à partir de laquelle la cellule cherchera à s'éloigner de sa cible;
	deadZone:			10		Zone dans laquelle la cellule ne cherchera pas de cible (s'ajoute a minDistance);
	easing:				0.9		Facteur avec lequel le precedant mouvement est ajouté au mouvement courant pour adoucir;
	generationTime: 	50		Durée en tick d'une génération (auquel s'ajoutent divers paramêtres);
	lifetime: 			8		Facteur appliqué à generation Time pour calculer la durée de vie d'une cellule;
	noOffScreen: 		true	Si true, les cellules sont bloqués dans l'écran;
	randomMove: 		1		Facteur appliqué aux mouvements aléatoires, provoqués à chaques ticks;
	maxEntity:			80		Nombre d'entité à partir duquel le monde ignorera les requêtes de reproductions;


####	Influences exclusivement graphiques

	showText:			false	Si true, affiche de combien de génération chaque cellule est issue
	showCircles:		true	Si true, les cellules sont des cercles (r=minDistance), sinon des points.	
	lineWidth:	 		3		Taille de la ligne reliant 2 cellules;
	activateSpawning:	false	Si true, ajoute des entitées au centre periodiquement;

Les valeurs par défaut sont un exemple de cellules ayant une grande durée de vie (8 générations !)
Essayez de réduire le Lifetime à 4 (par exemple), et là commence le vrai défi !