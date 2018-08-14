const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const app = express();//create app
const session = require('express-session')
const exphbs = require('express-handlebars');
//handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars')
app.use(session({
    secret: 'FishSnaksSmileBacks',
    resave: false,
    saveUninitialized: true, 
    cookie: {maxAge: 60000 }
}))

//allow cross origin requests
app.use(function(req, res, next) { 
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static( __dirname + '/public/dist/public' ));

//routes
require("./server/config/routes.js")(app);


const taskController = {
    index: (request, response) => {
      Task.find({})
        .then(tasks => response.json(tasks))
        .catch(error => console.log(error));
  
    },
    create: (request, response) => {
      Task.create(request.body)
        .then(task => response.json(task))
        .catch(error => console.log(error));
  
    }
};
  app 
  .get('/tasks', taskController.index)
  .post('/tasks', taskController.create)
  .all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
  });
  app.listen(8000, function() {//set server to 8000
      console.log("listening on port 8000");
  })