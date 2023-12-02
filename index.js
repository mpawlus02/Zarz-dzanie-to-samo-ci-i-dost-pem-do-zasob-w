const express = require("express");
var path = require('path');
 
const app = express();
 
function authentication(req, res, next) {
	var authheader = req.headers.authorization;
	console.log(req.headers);
 
	if (!authheader) {
		var err = new Error('You are not authenticated!');
		res.setHeader('WWW-Authenticate', 'Basic');
		err.status = 401;
		return next(err)
	}
 
	var auth = new Buffer.from(authheader.split(' ')[1],
	'base64').toString().split(':');
	var user = auth[0];
	var pass = auth[1];
 // Sprawdzenie, czy użytkownik i hasło są poprawne
	if (user === 'admin' && pass === 'admin') {
 
		//Jeśli jest autoryzowany przechodzimy dalej
		next();
	} else {
        // Jeśli użytkownik nie jest autoryzowany, zwracamy błąd autoryzacji
		var err = new Error('You are not authenticated!');
		res.setHeader('WWW-Authenticate', 'Basic');
		err.status = 401;
		return next(err);
	}
 
}
 
//Użycie funkcji autoryzacji dla wszystkich scieżek
app.use(authentication)
//Obsługa plików z folderu public 
app.use(express.static(path.join(__dirname, 'public')));
 

app.listen((3000), () => {
	console.log("Server is Running");
})