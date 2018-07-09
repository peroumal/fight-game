var enterPressed = false; // Touche ENTREE enfoncé
var roundMoves = 0;

// Deplacement dans une direction
function to(position,key) {
	switch(key){
		case 37: // Deplacement vers la gauche si l'on est pas tout à gauche
			if((position/Grid.width-Math.floor(position/Grid.width))>0) 
				return position-1;
			break;

		case 39: // Deplacement vers la droite si l'on est pas tout à droite
			if((++position/Grid.width-Math.floor(position/Grid.width))>0) 
				return position;
			break;

		case 38: // Deplacement vers le haut à condition de ne pas s'élever au dessus du début de la grille
			if((position-Grid.width)>=0) 
				return position-1*Grid.width;
			break;

		case 40: // Déplacement vers le bas tant que l'on ne depasse pas la limite de fin de grille
			if((position+Grid.width)<Grid.cases.length) 
				return position+1*Grid.width;
			break;
	}
}

// Appui maintenu sur une touche
$(document).keypress(function(e){
	if(e.which==13) enterPressed=true;
});

// Appui sur une touche
$(document).keydown(function(e){
	 if(enterPressed && e.which!=13){ // Activation du mode d'action (tir ou defense) au clic maintenu sur ENTREE
	 	
	 	// Recherche d'une case de la grille à tirer 
	 	var position= player().position;
		do position = to(position,e.which);
		while(position!=undefined && Grid.getTag(position)==Grid.nothing);

		// Si il est possible de tirer on le fait
	 	if (position!=undefined){
	 		player().shot(position); // Tirer dans la direction choisie
	 		Graphics.rotate((e.which-38),Grid.place(player().position),".avatar"); // Tourner l'avatar dans le sens du tir
	 	}

	 	// Sinon on passe en mode défense au clic sur la touche D
	 	else if(e.which===68) player().startDefend();
		
		submitRound(); // Passez ensuite à l'autre joueur car on ne peux tirer ou se défendre en conservant son tour
	}
});

// Relachement des touches
$(document).keyup(function(e){
	 
	if(e.which==13) enterPressed=false; // Deactivation du mode d'action (tir ou defense) au relachement de la touche ENTREE

	if(e.which!=13 && !enterPressed){ 	// Passage en mode deplacement

		// Informations sur le prochain déplacement
		var position = to(player().position,e.which);
		var tag = Grid.getTag(position); 

 		// Mettre à jour la position actuelle si la case n'est pas occupée (mur ou autre joueur)
		if(tag===Grid.nothing){
			player().setPosition(position);
			roundMoves++; // Nouveau mouvement
		} 
		else if (tag!=undefined && tag[0]=="-"){
			player().takeGun(position,tag[1]); // Recuperer l'arme si l'on est sur une arme
			roundMoves++; // Nouveau mouvement
		} 
		if(roundMoves>=3) submitRound(); // Passez ensuite à l'autre joueur car c'est 3 mouvement max
	}
});
