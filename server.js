//Install express server
const express = require('express');
const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

// routes ======================================================================

// api -------------------------------------------------------------
const request = require('request');

app.get('/api/sessions', function getSessions(req, res) {
  console.log("get sessions api");

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Content-Type": "application/x-www-form-urlencoded",
  };
  const dataString = "action=get_schedule&data-location=0&data-is-schedule=true&data-page=1&data-max-items=-1";

  const options = {
    url: 'https://www.ng-conf.org/wp-admin/admin-ajax.php',
    method: 'POST',
    headers: headers,
    body: dataString,
  };

  console.log("sending request");
  request(options, function getSessionsCallback(error, response, body) {
    console.log("request back");
    if (!error && response.statusCode === 200) {
      res.send(body);
    }
  })
});

const path = require('path');

// application -------------------------------------------------------------
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

console.log("SERVER RUNNING");
