const express = require('express'),
  http = require('http'),
  path = require('path'),
  bodyParser = require('body-parser');
var fs = require('fs')
var arrayOfObjects;

const app = express();

app.use(bodyParser.json());

// use port 8080 for production

let port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/dist/ustwo-app'));

app.get('*', (req, res) => res.sendFile(path.join(__dirname)));

const server = http.createServer(app);

server.listen(port, () => console.log('app runing on port ', port));

app.route('/api/login/:id').get((req, res) => {
  const id = +req.params['id'];
  fs.readFile('./user-db-mock.json', 'utf-8', function (err, data) {
    if (err) throw err
    arrayOfObjects = JSON.parse(data);
    const employeeExists = arrayOfObjects.find(o => o.employeeId === id);
    if (employeeExists) {
      res.send({ user: employeeExists })
    } else {
      res.status(404).send({
        message: 'No user found!'
      });
    };
  });
});

app.route('/api/shifts/:id').get((req, res) => {
  const id = +req.params['id'];
  fs.readFile('./db-mock.json', 'utf-8', function (err, data) {
    if (err) throw err
    arrayOfObjects = JSON.parse(data);
    const employeeExists = arrayOfObjects.filter(o => o.employeeId === id);
    if (employeeExists) {
      res.send({ shifts: employeeExists })
    } else {
      res.status(404).send({
        message: 'No user found!'
      });
    };
  });

});

app.route('/api/add/shift/:id').post((req, res) => {
  fs.readFile('./db-mock.json', 'utf-8', function (err, data) {
    if (err) throw err
    arrayOfObjects = JSON.parse(data);
    req.body.id = arrayOfObjects.length + 1;
    arrayOfObjects.push(req.body);
    fs.writeFile('./db-mock.json', JSON.stringify(arrayOfObjects), 'utf-8', function (err) {
      if (err) throw err
      res.send({ success: 'add successful' });
    })
  });
})