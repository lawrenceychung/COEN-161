const fs = require('fs');

exports.handleTodoList = function(req, res, session) {
  
  switch(req.method) {
    case "GET":
      fs.readFile('./sessions/68bcd96055d6f3f89754f3b8b88b0476', function(err,data){
        JSON.parse(data);
        if (session.todoList == undefined){
          todoList = [];
        }
        else{
          todoList = [];
          for (let i = 0; i < session.todoList.length; i++){
            let task = {
              "id": i,
              "todo": session.todoList[i]
            } 
            todoList.push(task);
          }
        }
      })

      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(todoList));
      break;
    case "POST":
      if (session.todoList == undefined){
        session.todoList = [];
      }

      convertRequest(req,addData);
      function addData(data){
        session.todoList.push(data.todo);

        fs.writeFile('./sessions/68bcd96055d6f3f89754f3b8b88b0476', JSON.stringify(session), test);
        
        function test(err){
          if (err){
            res.writeHead(500, {'Content-Type': 'text/html'});
            res.end("500 Internal Server Error");
          }
          else{
            res.writeHead(200, 'OK');
            res.end();
          }
          
        res.writeHead(200, 'OK');
        res.end();
      } 
    }
      
      res.writeHead(200, 'OK');
      res.end();
      break;
    default:
      res.writeHead(405, {'Allow': 'GET, POST'});
      res.end("Not Allowed");
  }
  

  
  
};

/*
  converts the HTTP POST request body into a JSON object
*/
function convertRequest(req, callback) {
  let data = "";
  req.on('data', chunk => {
    data += chunk.toString();
  });
  req.on('end', () => {
    callback(JSON.parse(data));
  });
}