var isDefaultPlayer=true; // le joueur par defaut , 'true' pour le dernier joueur affiché, 'false' pour un autre joueur affiché
var playerA ,playerB; // Les joueurs
play(); // lance le jeu

// Permet de lancer le jeu ou de relancer un nouveau jeu
function play(){
	enterPressed = false; // Reinitialisation des informations lié aux mouvements clavier

	// Création de la grille de jeu
	Grid.create(20,8,function(position){
		return (Math.random()*10<7)?Grid.nothing:Grid.wall; // Etat d'une case de la grille (tag) générée aléatoirement ici
	});

	for(var i=2;i<5;i++) Grid.setPosition(Grid.newPosition(),Graphics.gun(i),"-"+i); // Ajout des armes

	// Ajout des joueurs
	playerB = new Player("Mark Zuckerberg","green");
	playerA = new Player("Bill Gates","red");
}

// Joueur actuel
function player(){
	if(isDefaultPlayer)return playerA;
	else return playerB;
}

// Ennemi à tuer
function enemy(){
	if(isDefaultPlayer)return playerB;
	else return playerA;
}

// Passage au joueur suivant
function nextPlayer(){
	isDefaultPlayer=!isDefaultPlayer; //  Deactivation de celui du joueur actuel et Activation du tour de l'autre joueur
	roundMoves=0; // Reinitialisation des mouvements comptés pour le tour
	player().show(); // Indications visuelles du joueur auxquel c'est le tour de jouer
}

// Finalisation du tour d'un joueur
function submitRound(){
  if(enemy().life<=0) { // La partie est terminé #player() est le gagnant
    alert(enemy().name+" est mort. \n"+player().name+" a gagné.");
    play();
  } else nextPlayer(); // La partie continue vers le joueur adverse
}