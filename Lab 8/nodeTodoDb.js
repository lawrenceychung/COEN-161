const mysql = require('mysql');

const config = require('./config').config;

exports.addTodo = function (sessionId, todo, callback) {
  const con = mysql.createConnection(config);
  con.connect(function(err){
    if (err) { 
      return callback(err);
    }
    let sql = "INSERT INTO Todos (description, sessionid) VALUES (\"" + todo + "\", \"" + sessionId + "\");";
    con.query(sql, function (err){
      if (err) { 
        return callback(err);
      }
      console.log("1 record inserted");
      con.end();
    });
  });
  
  
};

exports.getTodos = function (sessionId, callback) {
  const con = mysql.createConnection(config);
  con.connect(function(err){
    if (err) { 
      return callback(err);
    }
    let sql = "SELECT * FROM Todos WHERE sessionId =\"" + sessionId + "\";";
    con.query(sql, function (err, results){
      if (err) { 
        return callback(err);
      }
      callback(err, results);
      con.end();
    });
  });
  
    
};