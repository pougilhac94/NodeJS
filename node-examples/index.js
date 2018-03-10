var rect = {
	perimeter: (x, y) => (2*(x+y)),
	area: (x, y) => (x*y)
};

function solveRect(l,b) {
    console.log("Calculer le rectangle avec l = " + l + " and b = " + b);

    if (l <= 0 || b <= 0) {
        console.log("Les dimensions du rectangle doivent être supérieures à zéro:  l = "
               + l + ",  and b = " + b);
    }
    else {
	    console.log("La surface du rectangle est de " + rect.area(l,b));
	    console.log("Le périmètre du rectangle est de " + rect.perimeter(l,b));
    }
}

solveRect(2,4);
solveRect(3,5);
solveRect(0,5);
solveRect(-3,5);