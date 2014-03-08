#cell
##Little cells live in a little world
====
###(Version Français)

Cliquez dans le Canvas pour créer une cellule. Elle vie un instant, puis meurt. Si vous en mettez 2, elles se reproduisent lorsqu'elles sont assez grandes. Le but du jeu est d'arriver a touver des combinaisons de paramêtres avec lesquelles les cellules prolifères rapidement.
L'objet Javascript 'Param' permet d'interagir avec les cellules. (Une inferface plus user-friendly est en prévision)

Voici les différentes variables que l'on peut modifier : 

####Influences sur le comportement : 

	minDistance:		30		Distance à partir de laquelle la cellule cherchera à s'éloigner de sa cible;
	deadZone:			10		Zone dans laquelle la cellule ne cherchera pas de cible (s'ajoute a minDistance);
	easing:				0.9		Facteur avec lequel le precedant mouvement est ajouté au mouvement courant pour adoucir;
	generationTime: 	50		Durée en tick d'une génération. A peu près.
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

###(English version)

Clic on the Canvas to add a new Cell. It lives a while, then die. If you put 2 Cells, they can reproduce itselfs when big enought. The game goal is to find the good parameters combo to help your cells to live as long as possible.
The Javascript object 'Param' let you interact with cell. (A more user-friendly design is scheduled)

There are the differents vars you can modify ingame : 

####Influence on the behaviour : 

	minDistance:		30		Distance from which the cell will seek to move away from its target; 
	deadZone:			10		Area in which the cell does not seek new target (added to minDistance); 
	easing:				0.9		Factor with which previous move is added to the current to soften movement; 
	generationTime: 	50		Duration in tick of one generation; 
	lifetime: 			8		Factor applied to generation Time to calculate the lifetime of a cell; 
	noOffScreen: 		true	If true, the cells are blocked in the screen; 
	randomMove: 		1		Factor applied to random movements caused on each ticks; 
	maxEntity:			80		Number of entities from which the world will ignore requests reproductions;


####Graphical options

	showText:			false	If true, shows how much generation each cell is derived 
	showCircles:		true	If true, the cells are circles (r = minDistance), else they are points. 
	lineWidth:	 		3		Size of the line connecting two cells; 
	activateSpawning:	false	If true, adds Cells periodically at the center;
ed 
	showCircles:		true	If true, the cells are circles (r = minDistance), else they are points. 
	lineWidth:	 		3		Size of the line connecting two cells; 
	activateSpawning:	false	If true, adds Cells periodically at the center;
<<<<<<< HEAD
=======


====
>>>>>>> 06b3c0d85adac606e2865a07a11d5ac410c3539a
