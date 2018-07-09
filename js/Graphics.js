// Bibliotheque graphique pour le jeu
var Graphics= {
	nothing:$(""), // = Element graphique absent

	// Case de la grille de jeu
	case: function(tag){ 
		return $("<td></td>")
		.attr("class",tag); 
	},

	//ligne permettant de présenter horizontalement des cases de la grille du jeu
	line: function(){ return $("<tr></tr>") },

	// Element graphique identifiant un joueur (avatar)
	avatar: function(color,life){
		return $("<h4>"+life+"</h4>")
			.addClass("avatar")
			.css("background",color);
	},
	
	// Animation faisant fluctuer les couleurs 
	// #element est la reference au visuel qui subira l'animation
	fade: function(element,color,conserve){
		$(element).css("opacity","0.5") // Lancement de l'annimation
			.css("background",color)
			.fadeTo(400,0.1,function(){ // A la fin de l'effet animé Soit on conserve le visuel généré (#conserve = true) ou on l'efface selon (#conserve = false)
				if(!conserve) $(element).css("opacity","") 
					.css("background","white") 
					.fadeIn();
				});
	},

	// Armes du jeu #power représente la puissance que doit afficher l'arme
	gun: function(power){
		return $("<h6>"+""+power+"0</h6>")
		.attr("class","gun-"+power+" gun");
	},

	// Faire tourner un element par quart de cercle (90°), 
	// #quarter : le nombre de quart de cercle, si negatif le comptage se fait (sans opposé des aiguilles d'une montre) 
	// #element : visuel sur lequel appliquer la rotation
	// #ignore : visuel sur lequel ignorer la rotation
	rotate:function(quarter, element, ignore){
		if(element!=undefined){
			$(element).css({'transform' : 'rotate('+ 90*quarter +'deg)'});
			if(ignore!=undefined) $(element+" "+ignore).css({'transform' : 'rotate('+ -90*quarter +'deg)'});	
		}
	},
};
