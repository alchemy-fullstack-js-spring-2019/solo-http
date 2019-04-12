const { app } = require('./lib/ricknmorty/ricknmortyApp');

app.listen(7896);

// use http.createServer to create a new http server
// respond to the following paths
// /character/:ID
// grab the id from the path
// make a request to the rick and morty api using superagent (get a character by ID)
// respond with the name, status, and species of the character as json
// HINT: set the content type
