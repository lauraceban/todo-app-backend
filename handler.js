const express = require("express");
const cors = require("cors");
const serverlessHttp = require("serverless-http");
const bodyParser = require("body-parser"); 

const app = express();
app.use(cors());
app.use(bodyParser.json());

//GET 
app.get("/tasks", function (request, response) {
  
  response.status(200).json({
    tasks: [
      {
        name: "Do the Christmas shopping",
        date: "2019-01-12",
        isCompleted: false,
        isDeleted: false,
        id: 1
      }, 
      {
        name: "Attend medical appointment",
        date: "2019-01-12",
        isCompleted: false,
        isDeleted: false,
        id: 2
      }, 
      {
        name: "Apply for travelling Visa",
        date: "2019-01-12",
        isCompleted: false,
        isDeleted: false,
        id: 3
      }, 
      {
        name: "Attend the opera performance",
        date: "2019-01-12",
        isCompleted: false,
        isDeleted: false,
        id: 4
      }, 
      {
        name: "Choose activities for each honeymoon destination",
        date: "2019-01-12",
        isCompleted: false,
        isDeleted: false,
        id: 5
      }, 
      {
        name: "Submit honeymoon requests to travel concierge",
        date: "2019-01-12",
        isCompleted: false,
        isDeleted: false,
        id: 6
      }, 
      {
        name: "Study",
        date: "2019-01-12",
        isCompleted: true,
        isDeleted: false,
        id: 7
      }, 
      {
        name: "Complete homework",
        date: "2019-01-12",
        isCompleted: true,
        isDeleted: false,
        id: 8
      }, 
      {
        name: "Submit homework",
        date: "2019-01-12",
        isCompleted: true,
        isDeleted: false,
        id: 9
      }
    ]
  });
});

//POST 
app.post("/newTask", function (request, response) {

  const newTask = request.body;
 
  response.status(200).json({
      message: `Received a request to add ${newTask.name} with date ${newTask.date}.`
  }); 
}); 


//PUT 
app.put("/tasks/:id", function(request, response) {

  const updatedTasks = request.body;
  const id = request.params.id;
 
  response.status(200).json({ 
    message: `Successfully update task ID ${id} with name: ${updatedTasks.name}, date ${updatedTasks.date}, isCompleted: ${updatedTasks.isCompleted}, isDeleted: ${updatedTasks.isDeleted}`
  });
});


//DELETE 
app.delete("/tasks/:id", function (request, response) {

  const id = request.params.id;
 
  response.status(200).json({
    message: `You issued a delete request for ID: ${id}.`
  }); 
}); 


module.exports.app = serverlessHttp(app);

