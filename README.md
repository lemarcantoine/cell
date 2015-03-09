# cell
## Little cells live in a little world

Cliquez pour créer une cellule. Elle vie un instant, bougeant aléatoirement, puis meurt. Une cellule est ajoutée a chaque clic. Deux cellules se reproduisent lorsqu'elles sont assez grandes et qu'elles se ciblent réciproquement. En haut a droite se situe un panneau de paramêtrage. Le but du jeu est d'arriver a touver des combinaisons de paramêtres avec lesquelles les cellules prolifères.

Voici les différentes variables que l'on peut modifier : 

#### Options générales : 
	template:	modifie plusieurs variables pour avoir un set préfabriqué
	fullscreen:	Met le monde ces celulles en plein écran. * F11 pour avoir la page en plein écran.
	sound:		Active le son.

#### Croissance :
	maxEntity:			Nombre d'entité maximum (empêche les cellules de se reproduire mais pas l'utilisateur de créer des cellules);
	activateSpawning: 	Créée automatiquement ces cellules au centre
	lifetime:			Nombre de generations qu'une cellule vie avant d'être stérile (une celulle peut vivre jusqu'à 3x cette periode);	
	generationTime:		Durée en tick d'une génération.
	
#### Comportement : 	
	minDistance:	Distance à partir de laquelle la cellule cherchera à s'éloigner de sa cible;
	deadZone:		Zone dans laquelle la cellule ne cherchera pas de cible (s'ajoute a minDistance);
	easing:			Emulation du frottement / inertie ;
	randomMove		Importance des  mouvements aléatoires;
	noOffScreen: 	Si cette option est activée, les cellules sont bloqués dans l'écran;

#### Affichage : 
	lineWidth:		Taille de la ligne reliant 2 cellules;
	showCircles:	Si désactivée, seul le centre est dessiné
	showText:		Si activée, affiche le numero de génération de chaque cellule

Les valeurs par défaut sont un exemple de cellules ayant une grande durée de vie (8 générations !)
Essayez de réduire le Lifetime à 4 (par exemple), et là commence le vrai défi !

### English version

Clic on the Canvas to add a new Cell. It lives a while, then die. If you put 2 Cells, they can reproduce itselfs when big enought. The game goal is to find the good parameters combo to help your cells to live as long as possible.
