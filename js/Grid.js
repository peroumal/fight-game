// Grille du jeu
var Grid = {
	
	nothing:"",
	wall:"wall",
	gun:"gun",

	// Create an grid with all necesary cases (GridCase)
	create:function(width, height, TagCallback){
		
		// Initialisation par défaut des caractéristique de la grille de jeu : cases, largeur, hauteur, vue (utilisée)
		this.cases = []; // base de toutes les cases de la grille
		this.width = width; // largeur de grille
		this.height = height; // hauteur de grille
		$("#grid").html(this.nothing);

		// Creation des differentes cases du jeu
		for(var y=0;y<height;y++){
			var line = Graphics.line().appendTo($("#grid")); // Ajout d'une ligne
			for(var x=0;x<width;x++) {
				var position = this.cases.push(TagCallback())-1; // Ajout de la case en base
				line.append(Graphics.case(this.cases[position])); // Ajout de la case graphiquement
			}
		}
	}, 

	// Obtenir le tag corresondant à une position
	getTag:function(position){
		if(this.isPosition(position)) return this.cases[position];
	},

	// Verifie si le parametre donné #position est une position dans la base des cases de la grille
	isPosition: function(position){ 
		return (position!=undefined && position>=0 && position<(this.width*this.height)); 
	}, 

	// Defini le contenu à une position #position de la grille
	setPosition:function(position, node, tag){
		if(this.isPosition(position)){
			this.cases[position] = (tag)?tag:this.nothing;
			if(node!=undefined) $(this.place(position)).html("").attr("class",this.cases[position]).html(node);
		} 
	},

	// Recuperer le parametre jquery (place) localisant le noeud HTML d'une case depuis une position #position
	place:function(position){
		if(this.isPosition(position)){
			var y = Math.floor(position/this.width); // position sur axe vertical
			var x = position-y*this.width; // position sur axe horizontal
			return "tr:nth-child("+(y+1)+") > td:nth-child("+(x+1)+")";
		}
	},

	// Nouvelle case aléatoire libre et prete à etre attribuée
	newPosition:function(){
		var positions =[]; // cases libre trouvées

		// Récupération des cases libres
		for (var i = 0; i<this.cases.length; i++) 
			if(this.cases[i]==this.nothing)positions.push(i);

		return positions[Math.floor(Math.random()*positions.length)]; // Obtention aléatoire d'une position disponible
	}
};
