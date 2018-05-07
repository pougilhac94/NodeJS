// Il est préférable d'insérer une valeur variable dans la clé secrète
// Même avec une clé fixe, la valeur du token change car elle intégre l'horodatage de début et de fin
var maCle = '310161-94100-75012-481' + Date.now();
module.exports = {
    //'secretKey': maCle,
    'secretKey': '310161-94100-75012-481',
    'mongoUrl' : 'mongodb://localhost:27017/conFusion'
}