const express = require("express");
const cors = require("cors");
const serverlessHttp = require("serverless-http");
const bodyParser = require("body-parser"); 
const mysql = require("mysql");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,   
  database: "to_do_list"
});



//GET 
app.get("/tasks", function (request, response) {
  
  connection.query(`SELECT * FROM List_of_tasks`, function (err, data) {
    if (err) {
      response.status(500).json({error: err});
    } else {
      response.status(200).json({"to_do_list": data});
    }
  });  
});



//POST 
app.post("/newTask", function (request, response) {

  const newTask = request.body;
 
  connection.query(`INSERT INTO List_of_tasks SET ?`, [newTask], function (err, data) {
    if (err) {
      response.status(500).json({error: err});
    } else {
      newTask.id = data.insertId;
      response.status(201).json(newTask);
    }
  }); 
}); 




//PUT 
app.put("/tasks/:id", function(request, response) {

  const updatedTasks = request.body;
  const id = request.params.id;
 
  connection.query(`UPDATE List_of_tasks SET ? WHERE id=?`, [updatedTasks, id], 
  function (err) {
    if (err) {
      response.status(500).json({error: err});
    } else {
      response.sendStatus(200);
    }
  });
});



//DELETE 
app.delete("/tasks/:id", function (request, response) {

  const id = request.params.taskId;
 
  connection.query(`DELETE FROM List_of_tasks WHERE taskId=?`, [id], function (err) {
    if (err) {
      response.status(500).json({error: err});
    } else {
      response.sendStatus(200);
    }
  }); 
}); 



module.exports.app = serverlessHttp(app);