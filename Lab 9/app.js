const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const crypto = require('crypto');
const express = require('express');
const mysql = require('mysql');

const app = express();
const con = mysql.createConnection({
  database: 'coen161',
  password: 'Quoka0909',
  user: 'root',
});
const port = 3000;

// We only need to connect to the DB once.
// This allows us to query the DB in any 
// route. Don't close the connection in a
// route otherwise the queries will error.
con.connect(err => {
  if (err) throw err;

  console.log('Connected to the DB!');
});

app.use(bodyParser.json());

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
}));

// create unique id on session, if it doesn't exist
app.use((req, res, next) => {
  if (!req.session.id) {
    req.session.id = crypto.randomBytes(16).toString("hex");
  }
  
  next();
});

// serve React client app assets
app.use(express.static('client/build'));

// Enter your solution below
app.get('/todos', function(req, res) {
  let sql = "SELECT * FROM Todos WHERE sessionId = \"" + req.sessionId + "\";";
  con.query(sql, function (err, results){
    if (err) {
      return next(err);
    }
    let obj = [];
    for (let i = 0; i < results.length; i++)
    {
      obj.push({"completed": results[i].completed, "description": results[i].description, "id": results[i].id});
    }
    res.writeHead(200, {'Content-Type':'application/json'});
    res.end(JSON.stringify(obj));
  });

});

app.post('/todo', function(req,res){
  let sql = "INSERT INTO Todos (description) VALUES (" + req.body.todo + ");";
  con.query(sql, function (err, results){
    if (err) {
      return next(err);
    }
    let obj = [];
    for (let i = 0; i < results.length; i++)
    {
      obj.push({"description": req.body.todo, "id": result.insertId});
    }
    res.send(JSON.stringify(obj));
});

app.put('/todo/:id', function(req,res){
  let sql = "UPDATE coen161 SET completed = \"" + req.body.completed.property +  "\"WHERE id = \"" + req.params.id + "\";";
  con.query(sql, function (err){
    if (err) {
      return next(err);
    }
   res.end();
});

app.delete('/todo/:id', function(req,res){
  let sql = "DELET FROM Todos WHERE id = \"" + req.params.id + "\";";
  con.query(sql, function (err){
    if (err) {
      return next(err);
    }
   res.end();
});


app.listen(port, () => {
  console.log('To-Do app started on port ' + port);
});

