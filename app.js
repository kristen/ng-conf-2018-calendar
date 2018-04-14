const http = require('http');
const request = require('request');

const hostname = '127.0.0.1';
const port = 3000;

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

const server = http.createServer((req, res) => {
  console.log(req);
  res.writeHead(200, headers);
  request(options, function callback(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log(body);
      res.write(body);
      res.end();
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


