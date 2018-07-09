// An actor of this game who have possibility to make interactions 
function Player(name,color){
	this.life=100; // Niveau de vie d'un joueur (à 0 le joueur est mort)
	this.gun=1; // Arme courante
	this.gun2 =0; // Arme temporaire ou absente 
	this.name =name; // Nom du joueur
	this.color=color; // Couleur de l'avatar
	this.setPosition(Grid.newPosition()); // Positionner aléatoirement le nouvel utilisateur
};

// Definir la position du joueur sur la grille
Player.prototype.setPosition = function(newPosition){
	Grid.setPosition(newPosition,$(Grid.place(this.position)).html(),this.color);// Passage du joueur à la case suivante

	// Suppression du joueur de sa case précedente par affectation de nouvelles propriétés et du rendu visuel adéquat
	if(this.gun2>0)Grid.setPosition(this.position,Graphics.gun(this.gun2),"-"+this.gun2);
	else Grid.setPosition(this.position,Graphics.nothing,Grid.nothing);
	$(Grid.place(this.position)).removeAttr("style"); 

	this.position = newPosition; // Enregistrement effective de la nouvelle position du joueur
	this.gun2=0;	// Deactivation de la 2e arme (Arme à déposer lors de la récupération de l'arme actuelle)
	this.stopDefend(); // Ne plus defendre car pas possible de se déplacer en meme temps
},

// Activation du bouclier de protection (50% de dégats perçus)
Player.prototype.startDefend = function(){
	this.defense=2;
	Graphics.fade(Grid.place(this.position)+" .avatar","black",true);
},

// Déactiver le bouclier protecteur (100% des dégats perçus)
Player.prototype.stopDefend = function(){
	this.defense=1;
	this.show();
},

// Display visual information of the player like his avatar icon, his gun, level of life
Player.prototype.show = function(){
	$("#avatar").css("background",this.color); // icone de l'avatar
	$("#name").html(this.name); // nom
	var playerCase = $(Grid.place(this.position)).css("transform","").html(""); // Reinitialisation de la case actuelle
		playerCase.append(Graphics.avatar(this.color,this.life)); // ajout de l'avatar
		playerCase.append(Graphics.gun(this.gun)); // Ajout de l'arme
}

// Retrieve a gun on the grid map
Player.prototype.takeGun = function(position,tag){
	var tempGun = this.gun; // Enregistrement temporaire de l'arme précedente
	this.gun = parseInt(tag); // Nouvelle arme
	this.setPosition(position); // S'afficher avec la nouvelle arme 
	this.gun2 =tempGun; // Enregistrement de l'arme précedente
}

// Action on shot event
Player.prototype.shot = function(position){

	// Effets visuel lors d'un tir sur cible
	Graphics.fade(Grid.place(position),this.color);
	var tag = Grid.getTag(position);

	// C'est juste un mur on l'explose
	if(tag==undefined || tag.substr(0,1)==="-" || tag==="wall") 
	Grid.setPosition(position,Graphics.nothing,Grid.nothing);

	else enemy().life -= (this.gun*10)/enemy().defense; // C'est un ennemi, on l'attaque
	this.stopDefend(); // Défense déactivé car non cumulable avec le mode tir
}