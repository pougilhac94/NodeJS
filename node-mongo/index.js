const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/';
const dboper = require('./operations');

MongoClient.connect(url, (err,client) => {

    assert.equal(err,null);

    console.log('Connecté au serveur');

    var db = client.db('conFusion'); 

    dboper.insertDocument(  db, { name: "Vadonut", description: "Test"},
    "dishes", (result) => {
        console.log("Document inséré:\n", result.ops);

        dboper.findDocuments(db, "dishes", (docs) => {
            console.log("Documents trouvés :\n", docs);

            dboper.updateDocument(db, { name: "Vadonut" },
                { description: "Test de mise à jour " }, "dishes",
                (result) => {
                    console.log("Document mis à jour:\n", result.result);

                    dboper.findDocuments(db, "dishes", (docs) => {
                        console.log("Documents mis à jour trouvés :\n", docs);
                        
                        db.dropCollection("dishes", (result) => {
                            console.log("Collection supprimée : ", result);

                            client.close();
                        });
                    });
                });
        });
    });

});