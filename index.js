const firebase = require('firebase');
const express = require('express')
const http = require('http')

const app = express()

const port = 3000

var config = {
    apiKey: "AIzaSyBwOkfKWSHF26TK8FkwJVfzrXfyGAsZfkw",
    authDomain: "renesas-vivace.firebaseapp.com",
    databaseURL: "https://renesas-vivace.firebaseio.com",
    projectId: "renesas-vivace",
    storageBucket: "renesas-vivace.appspot.com",
    messagingSenderId: "739636645010"
  };
firebase.initializeApp(config);

var ref = firebase.app().database().ref('/data/temperatura');

const sendTemp = (temperatura) => {
    var obj = {
        "timestamp": firebase.database.ServerValue.TIMESTAMP,
        "temperatura": temperatura
    }
    ref.push(obj);
}



// for (var index = 0; index < 10; index++) {
//     var obj = {
//         "timestamp": firebase.database.ServerValue.TIMESTAMP,
//         "temperatura": Math.floor(Math.random() * 90 + 10)
//     }
//     ref.push(obj);
// }


ref.once('value')
 .then(function (snap) {
 console.log('snap.val()', snap.val());
});

app.get('/temperatura', function (req, res) {
    const temperatura = req.query.valor != null ? req.query.valor : 0
    res.send('temperatura recebida ' + temperatura)
    sendTemp(temperatura)

})

app.listen(port, () => console.log('Server running on ' + port))

