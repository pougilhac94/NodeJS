var rect = require('./rectangle');

function solveRect(l,b) {
    console.log("Calculer le rectangle avec l = "
                + l + " et b = " + b);
    rect(l,b, (err,rectangle) => {
        if (err) {
	        console.log("ERREUR: ", err.message);
	    }
        else {
            console.log("La surface du rectangle de  dimensions l = "
                + l + " et b = " + b + " est " + rectangle.area());
            console.log("Le périmètre du rectangle de dimensions l = "
                + l + " et b = " + b + " est " + rectangle.perimeter());
        }
    });
    console.log("Cette instruction d'affichage est exécutée immédiatement après l'appel de rect()");
};

solveRect(2,4);
solveRect(3,5);
solveRect(0,5);
solveRect(-3,5);